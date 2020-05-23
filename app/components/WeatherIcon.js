import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

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

const getWeatherIcon = (main, description) => {
  if(main === "Clear") {
    return require('../assets/weather/sun.png')
  } else if(main === "Clouds" && description === "few clouds"){
    return require('../assets/weather/sun_cloud.png')
  } else if(main === "Clouds"){
    return require('../assets/weather/cloud.png')
  } else if(main === "Rain" || main === "Drizzle"){
    return require('../assets/weather/rain.png')
  } else if(main === "Snow"){
    return require('../assets/weather/snow.png')
  } else if(main === "Thunderstorm"){
    return require('../assets/weather/thunder.png')
  } else if(
      main === "Fog" ||
      main === "Mist" ||
      main === "Smoke" ||
      main === "Haze" ||
      main === "Dust" ||
      main === "Sand" ||
      main === "Ash" ||
      main === "Squall" ||
      main === "Tornado"
    ){
    return require('../assets/weather/fog.png')
  } else {
    return require('../assets/weather/no_weather.png')
  }
}

const getDate = (date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const split = date.split("-")

  return split[2] + " " + monthNames[parseInt(split[1])-1]
}

const WeatherIcon = (props) => (
  <View style={styles.container}>
    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.date}>{getDate(props.date)}</Text>
    <Image
        source={getWeatherIcon(props.weather_main, props.weather_description)}
        resizeMode="contain"
        style={styles.icon}
      />
    <View style={styles.temperature}>
      <Text style={styles.max}>{Math.round(props.max)}º</Text>
      <Text style={styles.min}>{Math.round(props.min)}º</Text>
    </View>
  </View>
);

export default WeatherIcon;
