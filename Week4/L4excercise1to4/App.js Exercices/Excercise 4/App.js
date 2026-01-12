import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.Parent}>
    <View style={[styles.Child, { backgroundColor: 'lightblue' }]}>
      <Text>Square 1</Text>
    </View>
    <View style={[styles.Child, { backgroundColor: 'mediumseagreen' }]}>
      <Text>Square 2</Text>
    </View>
    <View style={[styles.Child, { backgroundColor: 'tomato' }]}>
      <Text>Square 3</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  Parent: {
    backgroundColor: 'whitesmoke', 
    marginTop: 30,                 
    flex: 1,
    flexDirection: 'row',          
    justifyContent: 'space-around',      
    alignItems: 'center',         
  },
  Child: {
    width: 80,                     
    height: 80,                    
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,         
  },
});

export default App;
