import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { datasource } from './Data.js';

const Edit = ({ navigation, route }) => {
  // States: Pokemon Name, Card Number, and Type
  const [name, setName] = useState(route.params.name || '');
  const [cardNumber, setCardNumber] = useState(
    route.params.cardNumber ? String(route.params.cardNumber) : ''
  );
  const [type, setType] = useState(route.params.type || 'ELECTRIC');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit the Pokémon</Text>
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

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Save"
            onPress={() => {
              // Build the updated item
              const updated = {
                name: name,
                cardNumber: parseInt(cardNumber, 10),
              };

              // Map section title to index
              const getIndexForType = (t) => {
                if (t === 'WATER') return 1;
                if (t === 'FIRE') return 2;
                return 0; // ELECTRIC default
              };

              const oldType = route.params.type;           // original section from Home
              const oldIndex = route.params.index;         // original position in that section
              const oldSectionIdx = getIndexForType(oldType);
              const newSectionIdx = getIndexForType(type);

              if (newSectionIdx === oldSectionIdx) {
                // Same section: update in place (no duplication, no move)
                datasource[oldSectionIdx].data[oldIndex] = updated;
              } else {
                // Different section: move item
                // 1) Remove from old section
                datasource[oldSectionIdx].data.splice(oldIndex, 1);
                // 2) Append to bottom of new section
                datasource[newSectionIdx].data.push(updated);
              }

              navigation.navigate('Home');
            }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Delete"
            onPress={() => {
              // Map type string to section index
              const getIndexForType = (t) => {
                if (t === 'WATER') return 1;
                if (t === 'FIRE') return 2;
                return 0; // ELECTRIC default
              };

              // Always use the original type and index from route.params
              const originalSectionIdx = getIndexForType(route.params.type);
              const originalIndex = route.params.index;

              Alert.alert('Are you sure?', '', [
                {
                  text: 'Yes',
                  onPress: () => {
                    datasource[originalSectionIdx].data.splice(originalIndex, 1);
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
    marginBottom: 5,
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
