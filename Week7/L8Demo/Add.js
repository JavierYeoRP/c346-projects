import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Data Reset Function (uncomment to use)
// const resetData = async () => {
//   let stringdata = JSON.stringify(datasource);
//   await AsyncStorage.setItem("alphadata", stringdata);
// };
// resetData();

const Add = ({ navigation, route }) => {
  const [letter, setLetter] = useState("");
  const [type, setType] = useState("Vowels");

  const setData = async (value) => {
    await AsyncStorage.setItem("alphadata", value);
    navigation.navigate("Home");
  };

  return (
    <View>
      <StatusBar />
      <Text>Letter:</Text>
      <TextInput
        maxLength={1}
        style={{ borderWidth: 1 }}
        onChangeText={(text) => setLetter(text)}
      />
      <Picker selectedValue={type} onValueChange={(value) => setType(value)}>
        <Picker.Item label='Vowels' value='Vowels' />
        <Picker.Item label='Consonants' value='Consonants' />
      </Picker>
      <Button
        title='Submit'
        onPress={() => {
          if (route.params && route.params.datastring) {
            let mydata = JSON.parse(route.params.datastring);
            let item = { key: letter };
            let indexnum = type === "Vowels" ? 0 : 1;
            mydata[indexnum].data.push(item);
            let stringdata = JSON.stringify(mydata);
            setData(stringdata);
          } else {
            console.warn("No datastring passed from Home");
          }
        }}
      />
    </View>
  );
};

export default Add;
