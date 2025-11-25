import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { datasource } from './Data.js';

const Edit = ({ navigation, route }) => {
  const [statement, setStatement] = useState(route.params.statement || '');
  const [amount, setAmount] = useState(
    route.params.amount ? String(route.params.amount) : ''
  );
  const [type, setType] = useState(route.params.type || 'Expenses');

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.headerText}>Edit Income/Expense</Text>

        <Text style={styles.textStyle}>Statement:</Text>
        <TextInput
          style={styles.opacityStyle}
          value={statement}
          onChangeText={setStatement}
        />

        <Text style={styles.textStyle}>Amount:</Text>
        <TextInput
          style={styles.opacityStyle}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
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

        <View style={{ flexDirection: 'row', marginTop: 15, width: '100%' }}>
          <View style={{ flex: 1, marginHorizontal: 5 }}>
            <Button
              title="Save"
              onPress={() => {
                const updated = {
                  type: statement,
                  amount: parseFloat(parseFloat(amount).toFixed(2)),
                };

                const getIndexForType = (t) => (t === 'Income' ? 0 : 1);

                const oldType = route.params.type;
                const oldIndex = route.params.index;
                const oldSectionIdx = getIndexForType(oldType);
                const newSectionIdx = getIndexForType(type);

                if (newSectionIdx === oldSectionIdx) {
                  datasource[oldSectionIdx].data[oldIndex] = updated;
                } else {
                  datasource[oldSectionIdx].data.splice(oldIndex, 1);
                  datasource[newSectionIdx].data.push(updated);
                }

                navigation.navigate('Home');
              }}
            />
          </View>

          <View style={{ flex: 1, marginHorizontal: 5 }}>
            <Button
              title="Delete"
              onPress={() => {
                const getIndexForType = (t) => (t === 'Income' ? 0 : 1);
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

export default Edit;
