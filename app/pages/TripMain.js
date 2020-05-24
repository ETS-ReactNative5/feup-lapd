GLOBAL = require('../config/Global');
import React, { useEffect } from 'react';
import {
  StyleSheet, Dimensions, View
} from 'react-native';
import Background from '../components/Background';
import TripInfo from '../components/TripInfo';
import Weather from '../components/Weather';
import PlacesGroup from '../components/PlacesGroup';
import MainButton from '../components/MainButton';
import { Utils } from '../utils/Utils';

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

const TripMain = ({navigation}) => {

  useEffect(() => {
    console.log("Trip page")
    console.log(GLOBAL.id, GLOBAL.city, GLOBAL.country, GLOBAL.startDate, GLOBAL.endDate)
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        {/* <StatusBar barStyle="light-content" backgroundColor="#7159c1" /> */}
        <TripInfo city={GLOBAL.city} country={GLOBAL.country} date={`${Utils.getDate(GLOBAL.startDate)} - ${Utils.getDate(GLOBAL.endDate)}`}/>
        <Weather/>
        <PlacesGroup navigation={navigation}/>
        <MainButton text="View plan" widthRatio={0.7} handlePress={() => navigation.navigate('TripPlan')}/>
      </View>
    </Background>
  )
};

export default TripMain;
