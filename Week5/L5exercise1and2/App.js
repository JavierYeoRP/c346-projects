import React from 'react';
import { SectionList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const datasource = [
  {
    title: "Vowels",
    bgcolor: "skyblue",
    data: [
      { key: 'a' }, 
      { key: 'e' }, 
      { key: 'i' }, 
      { key: 'o' }, 
      { key: 'u' }
    ]
  },
  {
    title: "Consonants",
    bgcolor: "khaki",
    data: [
      { key: 'b' }, 
      { key: 'c' }, 
      { key: 'd' }, 
      { key: 'f' }, 
      { key: 'g' },
      { key: 'h' }, 
      { key: 'j' }, 
      { key: 'k' }, 
      { key: 'l' }, 
      { key: 'm' },
      { key: 'n' }, 
      { key: 'p' }, 
      { key: 'q' }, 
      { key: 'r' }, 
      { key: 's' },
      { key: 't' }, 
      { key: 'v' }, 
      { key: 'w' }, 
      { key: 'x' }, 
      { key: 'y' },
      { key: 'z' }
    ]
  }
];

const styles = StyleSheet.create({
  opacityStyle: {  //Excercise 1
    borderWidth: 1,
  },
  textStyle: {    //Excercise 1
    fontSize: 15,
    margin: 10,
    textAlign: 'left',
  },
  headerText: {   //Excercise 2
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const renderItem = ({ item }) => {        //Excercise 1
  return (
    <TouchableOpacity style={styles.opacityStyle}>
      <Text style={styles.textStyle}>{item.key}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={{ padding: 10 }}>
      <SectionList sections={datasource} renderItem={renderItem}          //Excercise 2
      renderSectionHeader={({ section: { title, bgcolor } }) => (
      <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>{title}</Text>
      )}
      />
    </View>
  );
};

export default App;
