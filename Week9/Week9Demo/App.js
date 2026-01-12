// Week 09 Demo App
// Exercises implemented: #Exercise 1A, #Exercise 1B, #Exercise 1C, #Exercise 1D

import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image, StyleSheet } from 'react-native';

// #Exercise 1C - Store original data
let originalData = [];

const App = () => {
  const [myData, setMyData] = useState([]);
  const [searchText, setSearchText] = useState("");

  // #Exercise 1B - Fetch data once on first render
  useEffect(() => {
    const myurl = "https://onlinecardappwebservice-hm2p.onrender.com/allcards";

    fetch(myurl)
      .then((response) => response.json())
      .then((myJson) => {
        if (originalData.length < 1) {
          setMyData(myJson);
          originalData = myJson;
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // #Exercise 1C - Filter list based on search input (case-insensitive)
  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setMyData(originalData);
    } else {
      const filtered = originalData.filter((item) =>
        item.card_name.toLowerCase().includes(text.toLowerCase())
      );
      setMyData(filtered);
    }
  };

  // #Exercise 1D - Render each card with image and name
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.card_pic }} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.card_name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Search:</Text>
      <TextInput
        style={styles.searchBox}
        value={searchText}
        onChangeText={handleSearch}
        placeholder="Type to filter cards..."
      />
      <FlatList
        data={myData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

// #Exercise 1D - Styling for cleaner layout
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  cardImage: {
    width: 60,
    height: 90,
    marginRight: 12,
    borderRadius: 4,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
