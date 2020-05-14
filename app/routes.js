import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View } from 'react-native';

import Main from './pages/Main'
import TripMain from './pages/TripMain'

const Stack = createStackNavigator();

const navigatorOptions = () => {
  return {
    headerTransparent: true,
    headerTintColor: '#808080',
    headerBackTitle: ' ',
    headerTitleAlign: 'center',
    headerTitle: (
      <Image
        source={require('./assets/logo.png')}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
          resizeMode: 'contain',
        }}
      />
    ),
  }
}

export default function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TripMain"
            component={TripMain}
            options={navigatorOptions()}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
