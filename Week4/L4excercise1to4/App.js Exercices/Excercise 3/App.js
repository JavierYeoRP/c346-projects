import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.Parent}>
    <View style={[
      styles.Child,
      { backgroundColor: 'powderblue'} // < Exercise #3C (add maxWidth: 90) + #3D(add flex: 1)
    ]}>
      <Text>Child One</Text>
    </View>
    <View style={[
      styles.Child,
      { backgroundColor: 'skyblue'} // < Exercise #3D(add flex: 2)
    ]}>
      <Text>Child Two</Text>
    </View>
    <View style={[
      styles.Child,
      { backgroundColor: 'steelblue'} // < Exercise #3C (add maxHeight: 120) + #3D(add flex: 3)
    ]}>
      <Text>Child Three</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  Parent: {
    // flexDirection: 'row', // < Exercise #3D
    flexDirection: 'column', // (Exercise 3B — commented out, Excercise 3E put back in)
    // justifyContent: 'flex-start', // < Exercise #3E Step 1
    // justifyContent: 'flex-end', // < Exercise #3E Step 2
    // justifyContent: 'space-around', // < Exercise #3E Step 3
    justifyContent: 'space-between', // < Exercise #3E Step 4
    backgroundColor: '#F5fcff',
    borderColor: '#0099AA',
    borderWidth: 5,
    flex: 1,
  },
  Child: {
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 24,
    justifyContent: 'center', // < Exercise #3E
    alignItems: 'center',
  },
});

export default App;
