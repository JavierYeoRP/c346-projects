import React, { useState } from 'react';
import {View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const QUIZ_DATA = [
  {
    id: 1,
    image: require('./img/elephant.jpg'),
    correctAnswer: 'Elephant',
    options: ['Rhinoceros', 'Elephant', 'Hippo'],
  },
  {
    id: 2,
    image: require('./img/lion.jpg'),
    correctAnswer: 'Lion',
    options: ['Tiger', 'Leopard', 'Lion'],
  },
  {
    id: 3,
    image: require('./img/giraffe.jpg'),
    correctAnswer: 'Giraffe',
    options: ['Giraffe', 'Moose', 'Ostrich'],
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
      <Text style={styles.promptText}>What animal is this?</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onAnswerChange}
        style={styles.picker}
      >
        <Picker.Item label="Select an animal..." value="" />
        {questionData.options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};

const QuizApp = () => {
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const userAnswers = [answer1, answer2, answer3];
  const setAnswers = [setAnswer1, setAnswer2, setAnswer3];

  const handleSubmit = () => {
    let score = 0;
    for (let i = 0; i < QUIZ_DATA.length; i++) {
      if (userAnswers[i] === QUIZ_DATA[i].correctAnswer) {
        score++;
      }
    }

    let feedbackMessage = '';
    if (score === QUIZ_DATA.length) {
      feedbackMessage = 'Well done! You scored perfectly!';
    } else if (score >= 1) {
      feedbackMessage = `Not bad! You scored ${score} out of ${QUIZ_DATA.length} correct answers.`;
    } else {
      feedbackMessage = `You can do better next time. You scored ${score} out of ${QUIZ_DATA.length}.`;
    }

    Alert.alert('Quiz Results', feedbackMessage);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <FontAwesome6
            name="magnifying-glass"
            size={26}
            color="#505051ff"
            style={styles.icon}
          />
          <Text style={styles.title}>Animal Identification Quiz</Text>
        </View>

        {QUIZ_DATA.map((data, index) => (
          <QuestionItem
            key={data.id}
            questionData={data}
            selectedValue={userAnswers[index]}
            onAnswerChange={setAnswers[index]}
          />
        ))}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    backgroundColor: '#007AFF',
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
});

export default QuizApp;
