import React, {useState} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Characters from '../pages/Characters';
import CharactersDetail from '../pages/CharactersDetail';
import Episodes from '../pages/Episodes';
import Locations from '../pages/Locations';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CharacterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CharacterScreen" component={Characters} />
      <Stack.Screen name="CharacterDetailScreen" component={CharactersDetail} />
    </Stack.Navigator>
  );
};

const EpisodeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EpisodeScreen" component={Episodes} />
    </Stack.Navigator>
  );
};
const LocationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LocationScreen" component={Locations} />
    </Stack.Navigator>
  );
};

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#5CAD4A',
          tabBarInactiveTintColor: '#208D45',
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
            height: '8%',
            backgroundColor: 'white',
            ...styles.shadow,
          },
          headerShown: false,
        }}>
        <Tab.Screen
          name="Characters"
          component={CharacterStack}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="human-child" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Episodes"
          component={EpisodeStack}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="movie-open-outline" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Locations"
          component={LocationStack}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="map-marker-radius" color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const DefaultTheme = {
  dark: false,
  colors: {
    primary: '#666',
    background: '#fff',
    card: '#f0f0f0',
    text: '#333',
    border: '#ccc',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: '#999',
    background: '#333',
    card: '#444',
    text: '#f0f0f0',
    border: '#555',
  },
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#5CAD4A',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 8,
  },
});
