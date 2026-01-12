import React, { useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SectionList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

// Quiz Data: 2 sections (Freshwater & Saltwater), each with at least 2 fish
const QUIZ_DATA = [
  {
    title: 'Freshwater Fish',
    data: [
      {
        id: 1,
        image: require('./img/goldfish.jpg'),
        correctAnswer: "Goldfish",
        options: ["Goldfish", "Betta", "Clownfish", "Blue Tang"],
        question: "Which freshwater fish is commonly kept in bowls and aquariums?"
      },
      {
        id: 2,
        image: require('./img/betta.jpg'),
        correctAnswer: "Betta",
        options: ["Goldfish", "Betta", "Clownfish", "Blue Tang"],
        question: "Which freshwater fish is known for its bright colors and aggressive nature (Hint: it is also known as the fighting fish)?"
      }
    ]
  },
  {
    title: 'Saltwater Fish',
    data: [
      {
        id: 3,
        image: require('./img/clownfish.jpg'),
        correctAnswer: "Clownfish",
        options: ["Goldfish", "Betta", "Clownfish", "Blue Tang"],
        question: "Which saltwater fish became famous from the movie Finding Nemo?"
      },
      {
        id: 4,
        image: require('./img/bluetang.jpg'),
        correctAnswer: "Blue Tang",
        options: ["Goldfish", "Betta", "Clownfish", "Blue Tang"],
        question: "Which saltwater fish is known for its vibrant blue color and was featured as 'Dory' in Finding Nemo?"
      }
    ]
  }
];

const QuestionItem = ({ questionData, selectedValue, onAnswerChange }) => {
  return (
    <View style={styles.questionBlock}>
      <Image
        source={questionData.image}
        style={styles.image}
        resizeMode="cover"
      />
      {/* Render unique question here */}
      <Text style={styles.promptText}>{questionData.question}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onAnswerChange}
        style={styles.picker}
      >
        <Picker.Item label="Select a fish..." value="" />
        {questionData.options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};

const FishQuizApp = () => {
  const totalItems = QUIZ_DATA.reduce((sum, section) => sum + section.data.length, 0);
  const [answers, setAnswers] = useState(Array(totalItems).fill(''));

  const handleAnswerChange = (id, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[id - 1] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    QUIZ_DATA.forEach(section => {
      section.data.forEach(item => {
        if (answers[item.id - 1] === item.correctAnswer) {
          score++;
        }
      });
    });

    let feedbackMessage = '';
    if (score === totalItems) {
      feedbackMessage = "Perfect catch! You identified every fish!";
    } else if (score >= 3) {
      feedbackMessage = `So close to perfection! You scored ${score} out of ${totalItems}.`;
    } else {
      feedbackMessage = `The Line Snapped! You scored ${score} out of ${totalItems}.`;
    }
    Alert.alert("Quiz Results", feedbackMessage);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <SectionList
        sections={QUIZ_DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <QuestionItem
            questionData={item}
            selectedValue={answers[item.id - 1]}
            onAnswerChange={(value) => handleAnswerChange(item.id, value)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View style={styles.titleContainer}>
            <FontAwesome6 name="fish" size={26} color="#004080" style={styles.icon} />
            <Text style={styles.title}>Fish Identification Quiz</Text>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit Answers</Text>
          </TouchableOpacity>
        }
      />
    </KeyboardAvoidingView>
  );
};

export default FishQuizApp;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  scrollContent: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#004080',
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: '#e0f7fa',
    padding: 5,
    borderRadius: 5,
  },
  questionBlock: {
    marginBottom: 25,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  promptText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  picker: {
    height: 60,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#008080',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
