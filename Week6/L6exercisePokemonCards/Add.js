import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { datasource } from './Data.js';

const Add = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [type, setType] = useState('ELECTRIC');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Pokémon</Text>

      <Text style={styles.label}>Pokemon Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter Pokémon name"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Card Number:</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        placeholder="Enter card number"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Type:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="ELECTRIC" value="ELECTRIC" />
          <Picker.Item label="WATER" value="WATER" />
          <Picker.Item label="FIRE" value="FIRE" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          color="#4B0082"
          onPress={() => {
            const item = {
              name: name,
              cardNumber: parseInt(cardNumber)
            };
            let indexnum = 0;
            if (type === 'WATER') indexnum = 1;
            else if (type === 'FIRE') indexnum = 2;

            datasource[indexnum].data.push(item);
            navigation.navigate("Home");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#D8CFEA',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4B0082',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default Add;
