import React, { useState } from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Data Reset Function (uncomment to use)
// const resetData = async () => {
//   let stringdata = JSON.stringify(datasource);
//   await AsyncStorage.setItem("alphadata", stringdata);
// };
// resetData();

const Edit = ({ navigation, route }) => {
  const [letter, setLetter] = useState(route.params.key);

  // helper function to save updated data
  const setData = async (value) => {
    await AsyncStorage.setItem("alphadata", value);
    navigation.navigate("Home");
  };

  return (
    <View>
      <Text>Letter:</Text>
      <TextInput
        value={letter}
        maxLength={1}
        style={{ borderWidth: 1 }}
        onChangeText={(text) => setLetter(text)}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ margin: 10, flex: 1 }}>
          <Button
            title="Save"
            onPress={() => {
              let mydata = JSON.parse(route.params.datastring);
              let indexnum = route.params.type === "Vowels" ? 0 : 1;

              // update the letter at the given index
              mydata[indexnum].data[route.params.index].key = letter;

              let stringdata = JSON.stringify(mydata);
              setData(stringdata);
            }}
          />
        </View>
        <View style={{ margin: 10, flex: 1 }}>
          <Button
            title="Delete"
            onPress={() => {
              let mydata = JSON.parse(route.params.datastring);
              let indexnum = route.params.type === "Vowels" ? 0 : 1;

              Alert.alert("Are you sure?", "",
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      // remove the item at the given index
                      mydata[indexnum].data.splice(route.params.index, 1);

                      let stringdata = JSON.stringify(mydata);
                      setData(stringdata);
                    }
                  },
                  { text: "No" }
                ]
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Edit;
