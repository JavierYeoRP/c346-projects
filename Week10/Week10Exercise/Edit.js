import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

const Edit = ({ navigation, route }) => {
  const { item } = route.params;
  
  const [cheesecakeName, setCheesecakeName] = useState(item.Cheesecake_name);
  const [cheesecakeImage, setCheesecakeImage] = useState(item.Cheesecake_image);
  const [cheesecakeCalories, setCheesecakeCalories] = useState(item.Cheesecake_calories);

  const handleUpdateCheesecake = () => {
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
    const updatedCheesecake = {
      Cheesecake_name: cheesecakeName,
      Cheesecake_calories: cheesecakeCalories,
      Cheesecake_image: cheesecakeImage,
    };

    // PUT request to update the cheesecake
    fetch(`https://onlinecheesecakestore.onrender.com/updatecheesecake/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCheesecake),
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
        Alert.alert('Success', 'Cheesecake updated successfully!');
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error updating cheesecake:', error);
        Alert.alert('Error', `Failed to update cheesecake: ${error.message}`);
      });
  };

  const handleDeleteCheesecake = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this cheesecake?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // DELETE request
            fetch(`https://onlinecheesecakestore.onrender.com/deletecheesecake/${item.id}`, {
              method: 'DELETE',
            })
              .then(async (response) => {
                const text = await response.text();
                console.log('Delete response status:', response.status);
                console.log('Delete response text:', text);
                
                if (!response.ok) {
                  throw new Error(`Server error: ${response.status} - ${text}`);
                }
                
                return response;
              })
              .then(() => {
                Alert.alert('Success', 'Cheesecake deleted successfully!');
                navigation.goBack();
              })
              .catch((error) => {
                console.error('Error deleting cheesecake:', error);
                Alert.alert('Error', `Failed to delete cheesecake: ${error.message}`);
              });
          },
        },
      ]
    );
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
          <Button title="Update Cheesecake" onPress={handleUpdateCheesecake} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Delete Cheesecake" onPress={handleDeleteCheesecake} color="#d9534f" />
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
  buttonContainer: {
    marginTop: 20,
  },
});

export default Edit;
