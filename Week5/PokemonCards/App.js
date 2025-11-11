import React from 'react';
import {SectionList, Text, View, StyleSheet, TouchableOpacity, Image, Button, } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const datasource = [
  {
    title: 'Electric',
    icon: 'bolt',
    bgcolor: 'yellow',
    data: [
      {
        name: 'Pikachu',
        cardNumber: 25,
      },
      {
        name: 'Voltorb',
        cardNumber: 100,
      },
    ],
  },
  {
    title: 'Fire',
    icon: 'fire',
    bgcolor: 'red',
    data: [
      {
        name: 'Charmander',
        cardNumber: 4,
      },
      {
        name: 'Growlithe',
        cardNumber: 58,
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  nameText: {
    flex: 1,
    fontSize: 16,
  },
  cardImage: {
    width: 100,
    height: 140,
    resizeMode: 'contain',
  },
  addButton: {
    marginTop: 50,
    marginBottom: 10,
  },
});

const renderItem = ({ item }) => {
  const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${item.cardNumber}-2x.png`;
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.addButton}>
        <Button title="ADD POKEMON" onPress={() => {}} />
      </View>
      <SectionList
        sections={datasource}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title, icon, bgcolor } }) => (
          <View style={{ backgroundColor: bgcolor, padding: 5 }}>
            <Text style={styles.headerText}>
              <FontAwesome5 name={icon} size={18} /> {title}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default App;
