import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data.js';

const Edit = ({ navigation, route}) => {
    const [letter, setLetter] = useState(route.params.key);

  return (
    <View>
      <Text style={styles.label}>Letter:</Text>
      <TextInput style={styles.input} maxLength={1} value={letter} onChangeText={setLetter} />
        <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, margin: 10 }}>
            // Exercise 2D
            <Button title='Save'
            onPress={()=>{
            let indexnum = 1
            if(route.params.type=="Vowels") {
                indexnum = 0;
            }
            datasource[indexnum].data[route.params.index].key=letter;
            navigation.navigate("Home")
            }
        }
            />
        </View>
        <View style={{ flex: 1, margin: 10 }}>
            <Button title='Delete'
            onPress={()=>{
            let indexnum = 1
            if(route.params.type=="Vowels") {
                indexnum = 0;
            }
            Alert.alert("Are you sure?", '',
            [{text:'Yes', onPress:()=>{
                datasource[indexnum].data.splice(route.params.index,1);
                navigation.navigate("Home")
            }},
            {text:'No'}])
            }
        }
            />
        </View>
        </View>
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
    padding: 8,
    marginBottom: 15
  },
});

export default Edit;
