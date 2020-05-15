import React, { useEffect, useState } from 'react';

import {
  Text, Image, StyleSheet, Dimensions, View, TouchableHighlight
} from 'react-native';
import SelectInput from '../components/SelectInput';
import MainButton from '../components/MainButton';
import Background from '../components/Background';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    display: "flex"
  },
  plannedtrips: {
    color: 'white',
    fontSize: 12,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
    padding: 1,
  },
  plannedtripscontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Dimensions.get('window').height * 0.13
  },
  searchinputs: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: Dimensions.get('window').height * 0.1,
    paddingTop: Dimensions.get('window').height * 0.30,
    width: Dimensions.get('window').height * 0.23,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttoncontainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Main = ({navigation}) => {

  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    console.log('Search button pressed')
    console.log("City: ", city)
    console.log("Date: ", date )
    navigation.navigate('TripMain', { city: city, date: date })
  }

  useEffect(() => {
    console.log("Main page")
  }, []);

  return (
    <Background>
      <Image
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
        onPress={() => navigation.navigate('PlannedTrips')}
        underlayColor='transparent'
        style={styles.plannedtripscontainer}
        >
          <View>
            <Text style={styles.plannedtrips}>View planned trips</Text>
          </View>
      </TouchableHighlight>
    </Background>
  )
};

export default Main;
