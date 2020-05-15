import React from 'react';
import {StyleSheet, View} from 'react-native';
import PlacesButton from './PlacesButton';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '95%',
    flex: 7,
    justifyContent: "center"
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const PlacesGroup = (props) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <PlacesButton navigation={props.navigation} type="poi" content="Points of Interest"/>
      <PlacesButton navigation={props.navigation} type="restaurant" content="Restaurants"/>
    </View>
    <View style={styles.row}>
      <PlacesButton navigation={props.navigation} type="shop" content="Shops"/>
      <PlacesButton navigation={props.navigation} type="hotel" content="Hotels"/>
    </View>
  </View>
);

export default PlacesGroup;
