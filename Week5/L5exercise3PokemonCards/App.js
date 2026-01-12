import React from 'react';
import {SectionList, Text, View, StyleSheet, TouchableOpacity, Image, Button, } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const datasource = [
  {
    title: 'ELECTRIC',
    icon: 'bolt',
    bgcolor: 'yellow',
    textcolor: 'darkgoldenrod',
    data: [
      { name: 'Pikachu', cardNumber: 25 },
      { name: 'Voltorb', cardNumber: 100 },
    ],
  },
  {
    title: 'WATER',
    icon: 'tint',
    bgcolor: 'lightblue',
    textcolor: 'darkblue',
    data: [
      { name: 'Magikarp', cardNumber: 129 },
      { name: 'Vaporeon', cardNumber: 134 },
    ],
  },
  {
    title: 'FIRE',
    icon: 'fire',
    bgcolor: 'red',
    textcolor: 'darkred',
    data: [
      { name: 'Charmander', cardNumber: 4 },
      { name: 'Growlithe', cardNumber: 58 },
    ],
  },
];

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
    <View style={styles.screen}>
      <View style={styles.addButton}>
        <Button title="ADD POKEMON" onPress={() => {}} />
      </View>
      <View style={styles.listContainer}>
        <SectionList
          sections={datasource}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title, icon, bgcolor, textcolor } }) => (
            <View style={[styles.sectionHeader, { backgroundColor: bgcolor }]}>
              <Text style={[styles.headerText, { color: textcolor }]}>
                <FontAwesome5 name={icon} size={18} /> {title}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20, //must be the same as addButton paddingHorizontal
    borderWidth: 1,
    paddingTop: 15,
    justifyContent: 'space-around'
  },
  addButton: {
    paddingHorizontal: 20, //Changes the Length of the button
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  sectionHeader: {
  borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#D8CFEA',
  },
  nameText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  cardImage: {
    width: 200,
    height: 280,
    resizeMode: 'contain',
  },
});


export default App;