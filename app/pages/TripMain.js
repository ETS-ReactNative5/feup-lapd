GLOBAL = require('../config/global');
import React, { useEffect, useState } from 'react';

import {
  Text, Image, StyleSheet, Dimensions, StatusBar, View
} from 'react-native';
import Background from '../components/Background';
import TripInfo from '../components/TripInfo';
import Weather from '../components/Weather';
import PlacesGroup from '../components/PlacesGroup';
import MainButton from '../components/MainButton';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    display: 'flex',
    marginTop: Dimensions.get('window').height * 0.11,
    marginBottom: Dimensions.get('window').height * 0.08
  }
});

const getDate = (date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const split = date.split("-")

  return split[2] + " " + monthNames[parseInt(split[1])-1]
}

const TripMain = ({navigation}) => {

  const city = GLOBAL.city
  const country = GLOBAL.country
  const startDate = GLOBAL.startDate
  const endDate = GLOBAL.endDate

  const handleViewPlanPress = () => {
    navigation.navigate('TripPlan')
  }

  useEffect(() => {
    console.log("Trip page")
    console.log(city, startDate, endDate)
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        {/* <StatusBar barStyle="light-content" backgroundColor="#7159c1" /> */}
        <TripInfo city={city} country={country} date={`${getDate(startDate)} - ${getDate(endDate)}`}/>
        <Weather/>
        <PlacesGroup navigation={navigation}/>
        <MainButton text="View plan" widthRatio={0.7} handlePress={handleViewPlanPress}/>
      </View>
    </Background>
  )
};

export default TripMain;
