import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main'
import TripMain from './pages/TripMain'

const Stack = createStackNavigator();

export default function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              // title: 'Tela Principal',
              // headerStyle: { backgroundColor: '#7159c1' },
              // headerTintColor: '#fff',
              // headerTitleAlign: 'center',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TripMain"
            component={TripMain}
            options={{
              title: 'Tela Principal',
              headerStyle: { backgroundColor: '#7159c1' },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
