import React, { useState } from 'react'; 
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const QUIZ_DATA = [ 
  { id: 1,
    image: require('./img/Lewis_Hamilton.jpg'), 
    correctAnswer: "Lewis Hamilton", 
    options: ["Lewis Hamilton", "Sebastian Vettel", "Fernando Alonso", "Max Verstappen"] 
  }, 
  { id: 2,
    image: require('./img/Max_Verstappen.jpg'), 
    correctAnswer: "Max Verstappen", 
    options: ["Max Verstappen", "Charles Leclerc", "Jenson Button", "Pierre Gasly"] 
  }, 
  { id: 3, 
    image: require('./img/Pierre_Gasly.jpg'), 
    correctAnswer: "Pierre Gasly", 
    options: ["Pierre Gasly", "Nico Rosberg", "Carlos Sainz", "Kimi Antonelli"] 
  }, 
  { id: 4, 
    image: require('./img/Kimi_Antonelli.jpg'), 
    correctAnswer: "Kimi Antonelli", 
    options: ["Kimi Antonelli", "Michael Schumacher", "George Russell", "Lewis Hamilton"] 
  }, 
  { id: 5, 
    image: require('./img/Nico_Rosberg.jpg'), 
    correctAnswer: "Nico Rosberg", 
    options: ["Nico Rosberg", "Valtteri Bottas", "Max Verstappen", "Pierre Gasly"] 
  }, 
]; 

const QuestionItem = ({ questionData, selectedValue, onAnswerChange }) => {
  return (
    <View style={styles.questionBlock}>
      <Image
        source={questionData.image}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.promptText}>Which F1 driver is this?</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onAnswerChange}
        style={styles.picker}
      >
        <Picker.Item label="Select a driver..." value="" />
        {questionData.options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};

const QuizApp = () => {
  const [answers, setAnswers] = useState(Array(QUIZ_DATA.length).fill(''));

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    for (let i = 0; i < QUIZ_DATA.length; i++) {
      if (answers[i] === QUIZ_DATA[i].correctAnswer) {
        score++;
      }
    }
    let feedbackMessage = '';
    if (score === QUIZ_DATA.length) {
      feedbackMessage = "Perfect lap! You nailed every driver!";
    } else if (score >= 3) {
      feedbackMessage = `Solid drive! You scored ${score} out of ${QUIZ_DATA.length}.`;
    } else {
      feedbackMessage = `Time for a pit stop! You scored ${score} out of ${QUIZ_DATA.length}.`;
    }
    Alert.alert("Quiz Results", feedbackMessage);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <FontAwesome6 name="flag-checkered" size={26} color="#000000ff" style={styles.icon} />
          <Text style={styles.title}>F1 Driver Identification Quiz</Text>
        </View>

        {QUIZ_DATA.map((data, index) => (
          <QuestionItem
            key={data.id}
            questionData={data}
            selectedValue={answers[index]}
            onAnswerChange={(value) => handleAnswerChange(index, value)}
          />
        ))}

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit Answers</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  questionBlock: {
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 0,
  },
  promptText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#FF1E00',
    padding: 15,
    borderRadius: 0,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
});

export default QuizApp; 