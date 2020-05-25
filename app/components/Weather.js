GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, ScrollView, Image, ActivityIndicator, Text} from 'react-native';
import WeatherIcon from './WeatherIcon';
import { ApiServices } from '../api/ApiServices';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '95%',
    flex: 2
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginVertical: 2
  },
  noprediction: {
    alignItems: 'center',
  }
});

const Weather = (props) => {
  const [weathers, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ApiServices.getWeather(GLOBAL.city).then((response) => {
      setWeather(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }, [])

  return (
    <View style={styles.container}>
      {loading && weathers === null &&
        <ActivityIndicator
          animating = {true}
          color = 'black'
          size = "small"
        />
      }
      {weathers !== null &&
        <ScrollView horizontal={true}>
          {weathers.map((item, index) =>{
            return(
              <WeatherIcon key={index} date={item.date} weather_main={item.weather_main} weather_description={item.weather_description} max={item.max} min={item.min}/>
            )
          })}
        </ScrollView>
      }
      {!loading && weathers === null &&
        <View style={styles.noprediction}>
          <Image
            source={require('../assets/weather/no_weather.png')}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text>No weather prediction available</Text>
        </View>
      }
    </View>
  )
};

export default Weather;
