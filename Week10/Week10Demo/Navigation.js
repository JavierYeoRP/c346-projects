// Navigation.js — Stack navigation setup (Home, Add, Edit)
// Matches Week 10 slides screen structure

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Add from './Add';
import Edit from './Edit';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"> 
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Stack.Screen name="Add" component={Add} options={{ title: 'Add' }} />
        <Stack.Screen name="Edit" component={Edit} options={{ title: 'Edit' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
