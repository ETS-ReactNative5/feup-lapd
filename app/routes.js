import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import Main from './pages/Main'
import TripMain from './pages/TripMain'
import PlannedTrips from './pages/PlannedTrips'
import POIs from './pages/POIs'
import Shops from './pages/Shops'
import Hotels from './pages/Hotels'
import Restaurants from './pages/Restaurants'
import TripPlan from './pages/TripPlan'
import TripMap from './pages/TripMap'

const Stack = createStackNavigator();

const navigatorOptions = {
  headerTransparent: true,
  headerTintColor: 'black',
  headerBackTitle: ' ',
  headerTitleAlign: 'center',
  headerTitle: (
    <Image
      source={require('./assets/logo.png')}
      resizeMode="contain"
      style={{
        width: 50,
        height: 50,
        resizeMode: 'contain',
      }}
    />
  )
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
            options={navigatorOptions}
          />
          <Stack.Screen
            name="PlannedTrips"
            component={PlannedTrips}
            options={navigatorOptions}
          />
          <Stack.Screen
            name="POIs"
            component={POIs}
            options={navigatorOptions}
          />
          <Stack.Screen
            name="Shops"
            component={Shops}
            options={navigatorOptions}
          />
          <Stack.Screen
            name="Hotels"
            component={Hotels}
            options={navigatorOptions}
          />
          <Stack.Screen
            name="Restaurants"
            component={Restaurants}
            options={navigatorOptions}
          />
          <Stack.Screen
            name="TripPlan"
            component={TripPlan}
            options={navigatorOptions}
          />
          <Stack.Screen
            name="TripMap"
            component={TripMap}
            options={navigatorOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
