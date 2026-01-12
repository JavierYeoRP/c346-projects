import React from 'react';
import {SectionList, Text, View, StyleSheet, TouchableOpacity, Image, Button, } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { datasource } from './Data.js';

const Home = ({ navigation }) => {
  const renderItem = ({ item, index, section }) => {
    const imageUrl = `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${item.cardNumber}-2x.png`;
    return (
      <TouchableOpacity style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('Edit', {
            index: index,
            type: section.title,       // Pokemon Type (ELECTRIC, WATER, FIRE)
            name: item.name,           // Pokemon Name
            cardNumber: item.cardNumber // Pokemon Card Number
          })
        }
      >
        <Text style={styles.nameText}>{item.name}</Text>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.addButton}>
        <Button title='ADD POKEMON' onPress={() => navigation.navigate("Add")} />
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


export default Home;