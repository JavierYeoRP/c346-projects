// Exercise 1C Magnetometer Data Display
import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, margin: 5 },
});

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Magnetometer.setUpdateInterval(100); // readings every 100ms
    const subscription = Magnetometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
    </View>
  );
}
