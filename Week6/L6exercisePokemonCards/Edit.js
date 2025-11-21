import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data.js';

const Edit = ({ navigation, route }) => {
  // Two states: Pokemon Name and Card Number
  const [name, setName] = useState(route.params.name || '');
  const [cardNumber, setCardNumber] = useState(
    route.params.cardNumber ? String(route.params.cardNumber) : ''
  );

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

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Save"
            onPress={() => {
              let indexnum = 0;
              if (route.params.type === 'WATER') indexnum = 1;
              else if (route.params.type === 'FIRE') indexnum = 2;

              datasource[indexnum].data[route.params.index].name = name;
              datasource[indexnum].data[route.params.index].cardNumber = parseInt(cardNumber);
              navigation.navigate('Home');
            }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Delete"
            onPress={() => {
              let indexnum = 0;
              if (route.params.type === 'WATER') indexnum = 1;
              else if (route.params.type === 'FIRE') indexnum = 2;

              Alert.alert('Are you sure?', '', [
                {
                  text: 'Yes',
                  onPress: () => {
                    datasource[indexnum].data.splice(route.params.index, 1);
                    navigation.navigate('Home');
                  },
                },
                { text: 'No' },
              ]);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default Edit;
