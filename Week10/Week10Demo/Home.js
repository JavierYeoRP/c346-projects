// Home.js — #Exercise 2 (slides p.37): wrap list items with TouchableOpacity and navigate to Edit
// Recap: fetch GET /allcards and render FlatList; Provide a button to navigate to Add

import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const BASE_URL = 'https://onlinecardappwebservice-hm2p.onrender.com';
const ALL = `${BASE_URL}/allcards`;

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch(ALL);
      const json = await res.json();
      setData(json);
      setOriginalData(json);
    } catch (err) {
      console.error('Error fetching data:', err);
      Alert.alert('Network error', 'Unable to load cards.');
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text) { setData(originalData); return; }
    const q = text.toLowerCase();
    setData(originalData.filter(item => (item.card_name || '').toLowerCase().includes(q)));
  };

  const renderItem = ({ item }) => (
    // #Exercise 2: TouchableOpacity + navigate to Edit with params
    <TouchableOpacity style={styles.cardRow} onPress={() => navigation.navigate('Edit', { id: item.id, card_name: item.card_name, card_pic: item.card_pic })}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardName}>{item.card_name}</Text>
      </View>
      <Image source={{ uri: item.card_pic }} style={styles.cardImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.label}>Search:</Text>
      <TextInput style={styles.input} value={searchText} onChangeText={handleSearch} placeholder="Type to filter cards..." />
      <View style={{ marginVertical: 8 }} />
      <Button title="ADD ITEM" onPress={() => navigation.navigate('Add')} />
      <View style={{ marginVertical: 8 }} />
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id?.toString?.() ?? String(item.card_name)} ItemSeparatorComponent={() => <View style={styles.separator} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 },
  separator: { height: 10 },
  cardRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, backgroundColor: '#f9f9f9' },
  cardImage: { width: 120, height: 170, marginLeft: 12, borderRadius: 4, backgroundColor: '#eee' },
  cardName: { fontSize: 18, fontWeight: '700' },
});
