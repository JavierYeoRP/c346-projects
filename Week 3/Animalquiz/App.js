import React, { useState } from 'react'; 
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 

const QUIZ_DATA = [ 
  { id: 1, question: "Identify this large savanna mammal:", 
  image: require('./img/elephant.jpg'), 
  correctAnswer: "Elephant", 
  options: ["Rhinoceros", "Elephant", "Hippo"] }, 
  { id: 2, question: "Which feline is known for its mane?", 
    image: require('./img/lion.jpg'), 
    correctAnswer: "Lion", 
    options: ["Tiger", "Leopard", "Lion"] }, 
  { id: 3, question: "Identify the tallest land animal:", 
    image: require('./img/giraffe.jpg'), 
    correctAnswer: "Giraffe", 
    options: ["Giraffe", "Moose", "Ostrich"] }, 
  ]; 


const QuestionItem = ({ questionData, selectedValue, onAnswerChange }) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        Q{questionData.id}. {questionData.question}
      </Text>
      <Image
        source={questionData.image}
        style={styles.image}
        resizeMode="contain"
      />
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
      feedbackMessage = "Well done! You scored perfectly!";
    } else if (score >= 1) {
      feedbackMessage = `Not bad! You scored ${score} out of ${QUIZ_DATA.length} correct answers.`;
    } else {
      feedbackMessage = `You can do better next time. You scored ${score} out of ${QUIZ_DATA.length}.`;
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
        <Text style={styles.title}>Animal Identification Quiz</Text>
        {QUIZ_DATA.map((data, index) => (
          <QuestionItem
            key={data.id}
            questionData={data}
            selectedValue={userAnswers[index]}
            onAnswerChange={setAnswers[index]}
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
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  imagePlaceholder: {
    height: 100,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#999'
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
  width: '100%',
  height: 150,
  marginBottom: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#999',
  backgroundColor: '#eee',
}
});

export default QuizApp;
