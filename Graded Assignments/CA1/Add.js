import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { datasource } from './Data.js';

const Add = ({ navigation }) => {
  const [statement, setStatement] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expenses');

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.headerText}>Add new Income/Expense</Text>

        <Text style={styles.textStyle}>Statement:</Text>
        <TextInput
          style={styles.opacityStyle}
          value={statement}
          onChangeText={setStatement}
          placeholder="Enter statement"
        />

        <Text style={styles.textStyle}>Amount:</Text>
        <TextInput
          style={styles.opacityStyle}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="Enter amount (e.g. 123.45)"
        />

        <Text style={styles.textStyle}>Type:</Text>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.opacityStyle}
        >
          <Picker.Item label="Income" value="Income" />
          <Picker.Item label="Expenses" value="Expenses" />
        </Picker>

        <View style={styles.buttonWrapper}>
          <Button
            title="Submit"
            onPress={() => {
              const parsedAmount = parseFloat(parseFloat(amount).toFixed(2));
              const item = { type: statement, amount: parsedAmount };
              const indexnum = type === 'Income' ? 0 : 1;
              datasource[indexnum].data.push(item);
              navigation.navigate('Home');
            }}
          />
        </View>
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
    alignItems: 'center',
  },
  centerContent: {
    width: '100%',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 15,
    margin: 10,
    textAlign: 'left',
  },
  opacityStyle: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    width: '100%',
    marginVertical: 8,
  },
});

export default Add;
