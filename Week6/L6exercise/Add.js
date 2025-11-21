import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data.js';

const Add = ({ navigation }) => {
  const [letter, setLetter] = useState('');
  const [type, setType] = useState('Vowels');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Letter:</Text>
      <TextInput
        style={styles.input}
        maxLength={1}
        value={letter}
        onChangeText={setLetter}
      />
      <RNPickerSelect
        onValueChange={setType}
        value={type}
        items={[
          { label: 'Vowels', value: 'Vowels' },
          { label: 'Consonants', value: 'Consonants' }
        ]}
        style={pickerSelectStyles}
      />
      <Button
        title="Submit"
        onPress={() => {
          let item = { key: letter };
          let indexnum = type === "Vowels" ? 0 : 1;
          datasource[indexnum].data.push(item);
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
  }
});

const pickerSelectStyles = {
  inputIOS: {
    borderWidth: 1,
    borderColor: '#000',
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#000',
  }
};

export default Add;
