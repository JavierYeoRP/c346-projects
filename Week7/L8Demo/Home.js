import React, { useState } from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { datasource } from './Data.js';

// Data Reset Function (uncomment to use)
// const resetData = async () => {
//   let stringdata = JSON.stringify(datasource);
//   await AsyncStorage.setItem("alphadata", stringdata);
// };
// resetData();

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    margin: 10,
    textAlign: 'left',
  },
  opacityStyle: {
    borderWidth: 1,
  },
  headerText: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'impact',
  },
});

const Home = ({ navigation }) => {
  const [mydata, setMydata] = useState([]);

  // Load data from AsyncStorage
  const getData = async () => {
    let datastr = await AsyncStorage.getItem("alphadata");
    if (datastr != null) {
      let jsondata = JSON.parse(datastr);
      setMydata(jsondata);
    } else {
      setMydata(datasource);
    }
  };

  getData();

  const renderItem = ({ item, index, section }) => {
    return (
      <TouchableOpacity
        style={styles.opacityStyle}
        onPress={() => {
          let datastr = JSON.stringify(mydata);   // <-- stringify current state
          navigation.navigate("Edit", {
            index: index,
            type: section.title,
            key: item.key,
            datastring: datastr                  // <-- pass it along
          });
        }}
      >
        <Text style={styles.textStyle}>{item.key}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginTop: 20 }}>
      <StatusBar />
        <Button
          title='Add Letter'
          onPress={() => {
            if (mydata && mydata.length > 0) {
              let datastr = JSON.stringify(mydata);
              navigation.navigate("Add", { datastring: datastr });
            } else {
              // fallback to datasource if mydata not ready
              let datastr = JSON.stringify(datasource);
              navigation.navigate("Add", { datastring: datastr });
            }
          }}
        />
      <SectionList
        sections={mydata}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title, bgcolor } }) => (
          <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
            {title}
          </Text>
        )}
      />
    </View>
  );
};

export default Home;
