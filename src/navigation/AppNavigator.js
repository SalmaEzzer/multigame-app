import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Game1Screen from '../screens/Game1Screen';
import Game2Screen from '../screens/Game2Screen';
import Game3Screen from '../screens/Game3Screen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'MultiGame App' }}
      />
      <Stack.Screen 
        name="Game1" 
        component={Game1Screen} 
        options={{ title: 'Jeu 1' }}
      />
      <Stack.Screen 
        name="Game2" 
        component={Game2Screen} 
        options={{ title: 'Jeu 2' }}
      />
      <Stack.Screen 
        name="Game3" 
        component={Game3Screen} 
        options={{ title: 'Jeu 3' }}
      />
    </Stack.Navigator>
  );
}