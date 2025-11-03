import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, StyleSheet, } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const InputBox = ({label, onChangeText})=> {
  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>

      <TextInput 
          style={styles.textInput} 
          onChangeText={onChangeText} 
      />
    </View>
  );
};

const L3 = ()=> {
    const [userType, setUserType] = useState('Admin');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginPress = () => {
        let myMessage = `Welcome ${userType} ${userName}`;
        ToastAndroid.show(myMessage, ToastAndroid.SHORT);
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />
            <Text>User Type:</Text>
            <Picker 
                selectedValue={userType}
                onValueChange={(itemValue) => setUserType(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label='Admin' value='Admin'/>
                <Picker.Item label='Guest' value='Guest'/>
            </Picker>
            <InputBox 
                label="User Name:" 
                onChangeText={(text) => setUserName(text)}
            />
            <InputBox 
                label="Password:" 
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity 
                onPress={handleLoginPress}
                style={styles.button}
            >
                <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        padding: 5,
        borderColor: '#ccc',
    },
    picker: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default L3;