import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <View style={styles.greenBox}>
      <Text style={[styles.title, styles.boxText]}>Who We Are</Text>
    </View>
    <View style={styles.greenBox}>
      <Text style={styles.boxText}>Our People</Text>
    </View>
    <View style={styles.greenBox}>
      <Text style={styles.boxText}>Our Campus</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'left',
  },
  greenBox: {
    width: 100,
    height: 100,
    marginTop: 30,
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'left',
    alignItems: 'center',
  },
  boxText: {
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default App;
