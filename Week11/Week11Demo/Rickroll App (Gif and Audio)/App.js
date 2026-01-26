import React, { useState } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';   // ✅ use expo-av for now

export default function App() {
  const [showGif, setShowGif] = useState(false);

  const playSurprise = async () => {
    try {
      // Load and play audio
      const { sound } = await Audio.Sound.createAsync(
        require('./Sound File/Rickroll/Rick-Roll.mp3')
      );
      await sound.playAsync();

      // Show GIF
      setShowGif(true);
    } catch (error) {
      console.error('Error playing media:', error);
    }
  };

  return (
    <View style={styles.container}>
      {showGif && (
        <Image
          source={require('./Video File/Rickroll/Rick Surprise.gif')}
          style={styles.gif}
        />
      )}
      <Button title="Surprise" onPress={playSurprise} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
});
