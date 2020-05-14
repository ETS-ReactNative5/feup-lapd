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
    marginVertical: Dimensions.get('window').height * 0.11,
  }
});

const TripMain = ({navigation, route}) => {

  const { city, date } = route.params

  const handleViewPlanPress = () => {
    console.log("View plan")
  }

  useEffect(() => {
    console.log("Trip page")
    console.log(city, date)
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        {/* <StatusBar barStyle="light-content" backgroundColor="#7159c1" /> */}
        <TripInfo city="Porto" country="Portugal" date="12 - 16 Mar"/>
        <Weather/>
        <PlacesGroup navigation={navigation}/>
        <MainButton text="View plan" widthRatio={0.7} handlePress={handleViewPlanPress}/>
      </View>
    </Background>
  )
};

export default TripMain;
