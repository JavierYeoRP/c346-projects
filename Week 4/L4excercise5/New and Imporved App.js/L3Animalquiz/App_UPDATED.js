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
    <View style={styles.card}>
      <Image source={questionData.image} style={styles.image} />
      <Text style={styles.prompt}>What animal is this?</Text>
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <FontAwesome6 name="magnifying-glass" size={28} color="#333" />
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Answers</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  prompt: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
    color: '#444',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default QuizApp;
