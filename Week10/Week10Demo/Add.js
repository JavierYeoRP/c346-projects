// Add.js — #Exercise 1 (slides p.27-33): POST /addcard with JSON body; on success navigate back

import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const BASE_URL = 'https://onlinecardappwebservice-hm2p.onrender.com';
const ADD_URL = `${BASE_URL}/addcard`;

export default function Add({ navigation }) {
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    const item = { card_name: name, card_pic: pic };
    if (!item.card_name || !item.card_pic) { Alert.alert('Missing fields', 'Please enter both Name and Picture URL.'); return; }
    setBusy(true);
    try {
      const res = await fetch(ADD_URL, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      navigation.goBack();
    } catch (err) {
      console.error('Add error:', err);
      Alert.alert('Add failed', 'Unable to add card.');
    } finally { setBusy(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Card</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Picture URL" value={pic} onChangeText={setPic} />
      <Button title={busy ? 'Submitting…' : 'Submit'} onPress={onSubmit} disabled={busy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10 },
});
