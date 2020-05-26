import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flex: 2
  },
  city: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  country: {
    color: '#696969',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  location: {
    flex: 2
  },
  datecontainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row'
  },
  date: {
    flex: 1,
    color: '#696969',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingTop: 3,
    paddingLeft: 5
  }
});

const TripInfo = (props) => (
  <View style={styles.container}>
    <View style={styles.location}>
      <Text adjustsFontSizeToFit numberOfLines={2} style={styles.city}>{props.city}</Text>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.country}>{props.country}</Text>
    </View>
    <View style={{paddingHorizontal: 5}}></View>
    <View style={styles.datecontainer}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.date}>{props.date}</Text>
      <Icon name='calendar' size={30} color="black" type="evilicon"/>
    </View>
  </View>
);

export default TripInfo;
