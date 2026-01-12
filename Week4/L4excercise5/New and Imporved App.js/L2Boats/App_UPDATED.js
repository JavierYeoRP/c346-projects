import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import Boat from './Boat';

const boatData = [
  {
    id: 1,
    name: 'Sea Ray 500 Sundancer',
    description: 'Contoured lines and dramatic styling reveal a refined and powerful presence that will take your breath away.',
    picture: require('./img/sea_ray.jpg'),
    icon_name: 'ship',
  },
  {
    id: 2,
    name: 'Four Winns Horizon 180',
    description: 'A sporty look and refined details truly set the Horizon 180 above all others.',
    picture: require('./img/four_winns.jpg'),
    icon_name: 'ship',
  },
  {
    id: 3,
    name: 'Flipper 640 ST',
    description: 'A modern take on the classic, traditional hardtop and perfect for a family picnic.',
    picture: require('./img/flipper.jpg'),
    icon_name: 'ship',
  },
  {
    id: 4,
    name: 'Princess V48',
    description: 'There is the option for an open design with a full-length cockpit and sunroof, or the enclosed deck saloon model, available with the option of a climate controlled interior.',
    picture: require('./img/princess.jpg'),
    icon_name: 'ship',
  },
  {
    id: 5,
    name: 'Bayliner 175 Bowrider',
    description: 'Its outboard power gives you increased cockpit space and quiet, fuel-efficient performance.',
    picture: require('./img/bayliner.jpg'),
    icon_name: 'ship',
  },
  {
    id: 6,
    name: 'Fairline Targa 47',
    description: 'Stretch out on the large sun bed aft while friends lounge in the generously appointed cockpit.',
    picture: require('./img/fairline.jpg'),
    icon_name: 'ship',
  },
];

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GetABoat – For Sale</Text>
      </View>
      {boatData.map((boat) => (
        <Boat
          key={boat.id}
          name={boat.name}
          description={boat.description}
          picture={boat.picture}
          icon_name={boat.icon_name}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'left',
  },
});

export default App;
