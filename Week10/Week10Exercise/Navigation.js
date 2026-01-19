import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home.js';
import Add from './Add.js';
import Edit from './Edit.js';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Cheesecake Store' }} 
        />
        <Stack.Screen 
          name="Add" 
          component={Add} 
          options={{ title: 'Add Cheesecake' }} 
        />
        <Stack.Screen 
          name="Edit" 
          component={Edit} 
          options={{ title: 'Edit Cheesecake' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
