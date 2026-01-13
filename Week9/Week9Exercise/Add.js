import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

const Add = ({ navigation }) => {
  const [cheesecakeName, setCheesecakeName] = useState('');
  const [cheesecakeImage, setCheesecakeImage] = useState('');
  const [cheesecakeCalories, setCheesecakeCalories] = useState('');

  const handleAddCheesecake = () => {
    if (!cheesecakeName.trim()) {
      Alert.alert('Error', 'Please enter a cheesecake name');
      return;
    }

    if (!cheesecakeImage.trim()) {
      Alert.alert('Error', 'Please enter an image URL');
      return;
    }

    if (!cheesecakeCalories.trim()) {
      Alert.alert('Error', 'Please enter calories');
      return;
    }

    // Prepare the data to send - match exact MySQL structure
    const newCheesecake = {
      Cheesecake_name: cheesecakeName,
      Cheesecake_calories: cheesecakeCalories,
      Cheesecake_image: cheesecakeImage,
    };

    // POST request to add the cheesecake
    fetch('https://onlinecheesecakestore.onrender.com/addcheesecake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCheesecake),
    })
      .then(async (response) => {
        const text = await response.text();
        console.log('Response status:', response.status);
        console.log('Response text:', text);
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} - ${text}`);
        }
        
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error(`Invalid JSON response: ${text}`);
        }
      })
      .then((data) => {
        Alert.alert('Success', 'Cheesecake added successfully!');
        // Clear the form
        setCheesecakeName('');
        setCheesecakeImage('');
        setCheesecakeCalories('');
        // Navigate back to Home
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error adding cheesecake:', error);
        Alert.alert('Error', `Failed to add cheesecake: ${error.message}`);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Cheesecake Name:</Text>
        <TextInput
          style={styles.input}
          value={cheesecakeName}
          onChangeText={setCheesecakeName}
          placeholder="Enter cheesecake name"
        />

        <Text style={styles.label}>Image URL:</Text>
        <TextInput
          style={styles.input}
          value={cheesecakeImage}
          onChangeText={setCheesecakeImage}
          placeholder="Enter image URL"
        />

        <Text style={styles.label}>Calories:</Text>
        <TextInput
          style={styles.input}
          value={cheesecakeCalories}
          onChangeText={setCheesecakeCalories}
          placeholder="Enter calories"
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <Button title="Add Cheesecake" onPress={handleAddCheesecake} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={() => navigation.goBack()} color="#888" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default Add;
