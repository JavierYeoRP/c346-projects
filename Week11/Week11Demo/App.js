// Exercise 2 - Play Audio with Expo AV
import React, { useState, useEffect } from 'react';
import { StatusBar, Button, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  const [mySound, setMySound] = useState();

  // Custom function to play sound
  async function playSound() {
    const soundfile = require('./Sound File/Exercise2/short1.wav'); // make sure short1.wav is in your project folder
    const { sound } = await Audio.Sound.createAsync(soundfile);
    setMySound(sound);
    await sound.playAsync();
  }

  // Unload sound after playback
  useEffect(() => {
    return mySound
      ? () => {
          console.log('Unloading Sound');
          mySound.unloadAsync();
        }
      : undefined;
  }, [mySound]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Button
        title="Play Sound"
        onPress={() => {
          playSound();
        }}
      />
    </View>
  );
}
