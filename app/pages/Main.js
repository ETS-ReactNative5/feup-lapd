import { Buffer } from 'buffer';
global.Buffer = Buffer;
GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {
  Text, Image, StyleSheet, Dimensions, View, TouchableHighlight, AsyncStorage
} from 'react-native';
import uuid from 'react-native-uuid';
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

    // TODO: SET VARIABLES FROM SEARCH
    GLOBAL.city = "Porto"
    GLOBAL.country = "Portugal"
    GLOBAL.startDate = "2020-05-12"
    GLOBAL.endDate = "2020-05-17"
    GLOBAL.id = uuid.v4();

    try {
      AsyncStorage.setItem(`plannedtrips/${GLOBAL.id}`, JSON.stringify({
        id: GLOBAL.id,
        city: GLOBAL.city,
        country: GLOBAL.country,
        startDate: GLOBAL.startDate,
        endDate: GLOBAL.endDate,
        itemName: `plannedtrips/${GLOBAL.id}`,
        // TODO: GET PHOTO OF A CITY
        photo: "https://i0.statig.com.br/bancodeimagens/5l/eb/sa/5lebsabb3aqcx1upuu5nwzibw.jpg"
      }));
    } catch (error) {
      console.log(error)
    }
    navigation.navigate('TripMain')
  }

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
