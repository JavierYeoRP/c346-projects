// Exercise 1D Barometer Data Display
import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Barometer } from 'expo-sensors';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, margin: 5 },
});

export default function App() {
  const [{ pressure, relativeAltitude }, setData] = useState({
    pressure: 0,
    relativeAltitude: 0,
  });

  useEffect(() => {
    Barometer.setUpdateInterval(100); // readings every 100ms
    const subscription = Barometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.text}>Pressure: {pressure}</Text>
      <Text style={styles.text}>Relative Altitude: {relativeAltitude}</Text>
    </View>
  );
}
