import React from 'react';
import {StyleSheet, Text, Dimensions, View, Image} from 'react-native';
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    padding: 10
  },
  date: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center'
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginVertical: 2
  },
  temperature: {
    display: 'flex',
    flexDirection: "row"
  },
  max: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12
  },
  min: {
    flex:1,
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.6
  }
});

const getWeatherIcon = (condition) => {
  switch (condition) {
    case 'sun':
      return require('../assets/weather/sun.png')
    case 'cloud':
      return require('../assets/weather/cloud.png')
    case 'fog':
      return require('../assets/weather/fog.png')
    case 'rain':
      return require('../assets/weather/rain.png')
    case 'snow':
      return require('../assets/weather/snow.png')
    case 'sun_cloud':
      return require('../assets/weather/sun_cloud.png')
    case 'thunder':
      return require('../assets/weather/thunder.png')
    default:
      return require('../assets/weather/no_weather.png')
  }
}

const WeatherIcon = (props) => (
  <View style={styles.container}>
    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.date}>{props.date}</Text>
    <Image
        source={getWeatherIcon(props.weather)}
        resizeMode="contain"
        style={styles.icon}
      />
    <View style={styles.temperature}>
      <Text style={styles.max}>{props.max}º</Text>
      <Text style={styles.min}>{props.min}º</Text>
    </View>
  </View>
);

export default WeatherIcon;
