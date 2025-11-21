import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data.js';

const Add = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [type, setType] = useState('ELECTRIC');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pokemon Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Card Number:</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />

      <RNPickerSelect
        onValueChange={setType}
        value={type}
        items={[
          { label: 'ELECTRIC', value: 'ELECTRIC' },
          { label: 'WATER', value: 'WATER' },
          { label: 'FIRE', value: 'FIRE' }
        ]}
        style={pickerSelectStyles}
      />

      <Button
        title="Submit"
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginBottom: 15
  }
});

const pickerSelectStyles = {
  inputIOS: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginBottom: 15
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginBottom: 15
  }
};

export default Add;
