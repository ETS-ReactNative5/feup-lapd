import React, { useEffect, useState } from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import WeatherIcon from './WeatherIcon';
import { ApiServices } from '../api/ApiServices';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '95%',
    flex: 2
  }
});

const Weather = (props) => {
  const [weathers, setWeather] = useState(null)

  useEffect(() => {
    ApiServices.getWeather("Viseu").then((response) => {
      setWeather(response.data)
    }).catch((error) => {console.log(error)})
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        {weathers !== null && weathers.map((item, index) =>{
          return(
            <WeatherIcon key={index} date={item.date} weather_main={item.weather_main} weather_description={item.weather_description} max={item.max} min={item.min}/>
          )
        })}
      </ScrollView>
    </View>
  )
};

export default Weather;
