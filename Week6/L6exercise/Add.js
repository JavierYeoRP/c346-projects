import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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

      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
      >
        <Picker.Item label="Vowels" value="Vowels" />
        <Picker.Item label="Consonants" value="Consonants" />
      </Picker>

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

export default Add;
