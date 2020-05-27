GLOBAL = require('../config/Global');
import React from 'react';
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

const TripMain = ({navigation}) => (
  <Background>
    <View style={styles.container}>
      <TripInfo city={GLOBAL.city} country={GLOBAL.country} date={GLOBAL.startDate === GLOBAL.endDate ? Utils.getDate(GLOBAL.startDate) : `${Utils.getDate(GLOBAL.startDate)} - ${Utils.getDate(GLOBAL.endDate)}`}/>
      <Weather/>
      <PlacesGroup navigation={navigation}/>
      <MainButton text="View plan" widthRatio={0.7} handlePress={() => navigation.navigate('TripPlan')}/>
    </View>
  </Background>
);

export default TripMain;
