import React, { useEffect, useState } from 'react';

import {
  Text, Image, StyleSheet, Dimensions, View, ScrollView
} from 'react-native';
import SelectInput from '../components/SelectInput';
import MainButton from '../components/MainButton';
import Background from '../components/Background';
import PlannedTripUnit from '../components/PlannedTripUnit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    display: "flex",
    marginTop: Dimensions.get('window').height * 0.12,
    marginBottom: Dimensions.get('window').height * 0.06,
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  titlecontainer: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    width: '100%',
    paddingBottom: 25
  }
});

const PlannedTrips = ({navigation}) => {

  useEffect(() => {
    console.log("Planned trips page")
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Planned Trips</Text>
        </View>
        <ScrollView contentContainerStyle={{width: "100%"}}>
          <PlannedTripUnit content="IOIO" navigation={navigation}/>
          <PlannedTripUnit content="IOIO" navigation={navigation}/>
          <PlannedTripUnit content="IOIO" navigation={navigation}/>
          <PlannedTripUnit content="IOIO" navigation={navigation}/>
          <PlannedTripUnit content="IOIO" navigation={navigation}/>
          <PlannedTripUnit content="IOIO" navigation={navigation}/>
          <PlannedTripUnit content="IOIO" navigation={navigation}/>
          <PlannedTripUnit content="IOIO" navigation={navigation}/>
        </ScrollView>
      </View>
      {/* <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.searchinputs}>
        <SelectInput value={city} onChange={setCity} placeholder="Select city..." icon="location" />
        <SelectInput value={date} onChange={setDate} placeholder="Select date..." icon="calendar" />
      </View>
      <View style={styles.buttoncontainer}>
        <MainButton text='Search' widthRatio={0.5} handlePress={handleSearch}/>
      </View>
      <TouchableHighlight
        onPress={handlePlannedTripsPress}
        underlayColor='transparent'
        style={styles.plannedtripscontainer}
        >
          <View>
            <Text style={styles.plannedtrips}>View planned trips</Text>
          </View>
      </TouchableHighlight> */}
    </Background>
  )
};

export default PlannedTrips;
