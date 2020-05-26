import { Buffer } from 'buffer';
global.Buffer = Buffer;
GLOBAL = require('../config/Global');
import React, { useEffect, useState, useRef } from 'react';
import {
  Text, Image, StyleSheet, Dimensions, View, TouchableHighlight, AsyncStorage, Alert, ActivityIndicator
} from 'react-native';
import uuid from 'react-native-uuid';
import  moment  from  "moment";
// import DateRangePicker from "react-native-daterange-picker";
import DateRangePicker from "../components/DateRangePicker";
import SelectDate from '../components/SelectDate';
import SelectCity from '../components/SelectCity';
import MainButton from '../components/MainButton';
import Background from '../components/Background';
import { Utils } from '../utils/Utils';
import { ApiServices } from '../api/ApiServices';

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
  const [date, setDate] = useState('Select dates...');
  const [loading, setLoading] = useState(false);

  const childRef = useRef();

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [displayedDate, setDisplayedDate] = useState(moment())
  const [flag, setFlag] = useState(false)

  const setDates = (dates) => {
    if(dates.startDate) setStartDate(dates.startDate)
    if(dates.endDate) setEndDate(dates.endDate)
    if(dates.displayedDate) setDisplayedDate(dates.displayedDate)
  }

  const handleSearch = async () => {
    setLoading(true)
    if(city.trim() === ''){
      Alert.alert('Error', 'No city selected.', [
          {
            text: 'Ok',
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
      setLoading(false)
      return
    }

    try {
      const location = await ApiServices.getLocation(city)
      GLOBAL.city = location.data.city
      GLOBAL.country = location.data.country
    } catch (error) {
      Alert.alert('Error', 'City not found.', [
          {
            text: 'Ok',
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
      setLoading(false)
      return
    }

    if(startDate === null || endDate === null){
      Alert.alert('Error', 'No dates selected.', [
          {
            text: 'Ok',
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
      setLoading(false)
      return
    }
    if(startDate > endDate){
      Alert.alert('Error', 'Start date cannot be after end date.',  [
          {
            text: 'Ok',
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
      setLoading(false)
      return
    }

    GLOBAL.startDate = Utils.formatDate(startDate)
    GLOBAL.endDate = Utils.formatDate(endDate)
    GLOBAL.id = uuid.v4();

    let photo = null
    try {
      photo = (await  ApiServices.getCityPhoto(city)).data.image;
    } catch (error) {
      console.log(error)
    }

    try {
      AsyncStorage.setItem(`plannedtrips/${GLOBAL.id}`, JSON.stringify({
        id: GLOBAL.id,
        city: GLOBAL.city,
        country: GLOBAL.country,
        startDate: GLOBAL.startDate,
        endDate: GLOBAL.endDate,
        itemName: `plannedtrips/${GLOBAL.id}`,
        photo: photo,
        createdAt: new Date()
      }));
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    navigation.navigate('TripMain')
  }

  useEffect(() => {
    if(startDate !== null && endDate !== null){
      if(Utils.formatDate(startDate) === Utils.formatDate(endDate)) setDate(Utils.getDate(Utils.formatDate(startDate)))
      else setDate(`${Utils.getDate(Utils.formatDate(startDate))} - ${Utils.getDate(Utils.formatDate(endDate))}`)
      setFlag(true)
    }
  }, [startDate, endDate])

  const openCalendar = () => {
    childRef.current.onOpen()
  }

  return (
    <Background>
      <DateRangePicker
        ref={childRef}
        onChange={setDates}
        endDate={endDate}
        startDate={startDate}
        displayedDate={displayedDate}
        minDate={moment()}
        range
      />
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.searchinputs}>
        <SelectCity value={city} onChange={setCity} setCity={setCity} setLoading={setLoading} />
        <SelectDate value={date} onChange={setDate} editable={false} flag={flag} openCalendar={openCalendar}/>
      </View>
      <View style={styles.buttoncontainer}>
        <MainButton text='Search' widthRatio={0.5} handlePress={handleSearch}/>
      </View>
      {loading &&
        <ActivityIndicator
          animating = {true}
          color = 'black'
          size = "small"
        />
      }
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
