
// Edit.js — update via POST /updatecard (id in body) + delete via DELETE /deletecard/:id
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';

const BASE_URL   = 'https://onlinecardappwebservice-hm2p.onrender.com';
const UPDATE_URL = () => `${BASE_URL}/updatecard`; // server expects PUT /updatecard with id in body
const DEL_URL    = (id) => `${BASE_URL}/deletecard/${encodeURIComponent(id)}`;

export default function Edit({ route, navigation }) {
  const { id, card_name, card_pic } = route?.params ?? {};

  const [name, setName] = useState(card_name ?? '');
  const [pic,  setPic ] = useState(card_pic ?? '');
  const [busy, setBusy] = useState(false);

  const confirmDelete = () => {
    Alert.alert(
      'Confirm delete',
      'Are you sure you want to delete this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: doDelete },
      ]
    );
  };

  const doDelete = async () => {
    if (!id) { Alert.alert('Missing ID', 'Cannot delete without a card ID.'); return; }
    setBusy(true);
    try {
      const url = DEL_URL(id);
      console.log('DELETE =>', url);
      const res = await fetch(url, { method: 'DELETE' });
      const txt = await res.text(); // read for debugging if needed
      if (!res.ok) {
        console.error('Delete failed', res.status, txt);
        throw new Error(`HTTP ${res.status}`);
      }
      ToastAndroid.show('Card deleted', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (err) {
      console.error('Delete error:', err);
      Alert.alert('Delete failed', 'Unable to delete card.');
    } finally {
      setBusy(false);
    }
  };

  const onUpdate = async () => {
    // Use PUT /updatecard with body { id, card_name, card_pic }
    const payload = { id, card_name: name, card_pic: pic };

    if (!payload.card_name?.trim() || !payload.card_pic?.trim()) {
      Alert.alert('Missing fields', 'Please fill in both fields.');
      return;
    }
    if (!id) {
      Alert.alert('Missing ID', 'Cannot update without a card ID.');
      return;
    }

    setBusy(true);
    try {
      const url = UPDATE_URL();
      console.log('PUT =>', url, 'payload =>', payload);
      const res = await fetch(url, {
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const txt = await res.text(); // log body for easier debugging
      if (!res.ok) {
        console.error('Update failed', res.status, txt);
        throw new Error(`HTTP ${res.status}`);
      }
      ToastAndroid.show('Card updated', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (err) {
      console.error('Update error:', err);
      Alert.alert('Update failed', 'Unable to update card.');
    } finally {
      setBusy(false);
    }
  };

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Card</Text>
        <Text style={{ color: '#d11' }}>
          No card ID provided. Re-open this screen from the card list.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Card</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Picture URL"
        value={pic}
        onChangeText={setPic}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Button title={busy ? 'Saving…' : 'Update'} onPress={onUpdate} disabled={busy} />
        </View>
        <View style={{ width: 12 }} />
        <View style={styles.rowItem}>
          <Button title={busy ? 'Working…' : 'Delete'} color="#d11" onPress={confirmDelete} disabled={busy} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title:     { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  input:     { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10 },
  row:       { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  rowItem:   { flex: 1 },
});
``
