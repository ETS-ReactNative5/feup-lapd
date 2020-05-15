import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import WeatherIcon from './WeatherIcon';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '95%',
    flex: 2
  }
});

const Weather = (props) => (
  <View style={styles.container}>
    <ScrollView horizontal={true}>
      <WeatherIcon date="12 Mar" weather="sun" max="32" min="9"/>
      <WeatherIcon date="13 Mar" weather="cloud" max="31" min="10"/>
      <WeatherIcon date="14 Mar" weather="rain" max="30" min="-1"/>
      <WeatherIcon date="15 Mar" weather="sun_cloud" max="28" min="20"/>
      <WeatherIcon date="16 Mar" weather="snow" max="25" min="12"/>
      <WeatherIcon date="17 Mar" weather="thunder" max="25" min="12"/>
      <WeatherIcon date="18 Mar" weather="random" max="25" min="12"/>
    </ScrollView>
  </View>
);

export default Weather;
