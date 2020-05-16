import React, { useEffect } from 'react';

import {
  Text, StyleSheet, Dimensions, View, Linking
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import qs from 'qs'
import Background from '../components/Background';
import MainButton from '../components/MainButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    display: "flex",
    marginTop: Dimensions.get('window').height * 0.12,
    marginBottom: Dimensions.get('window').height * 0.06,
    width: '100%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 5
  },
  titlecontainer: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    marginBottom: 30
  },
});

const TripMap = () => {

  let mapRef = null

  useEffect(() => {
    console.log("Trip Map page")
    mapRef.fitToElements(true)
  }, []);

  // https://github.com/react-native-community/react-native-maps
  // https://developers.google.com/maps/documentation/urls/guide#directions-action

  const handleGetDirections = () => {
    const data = {
      origin: "41.1579 -8.6291", //Porto (or address)
      destination: "41.2579 -8.6291", //Vila Real (or address)
      waypoints: "Norteshopping|41.3579 -8.6291"
    }

    Linking.openURL(`https://www.google.com/maps/dir/?api=1&${qs.stringify(data)}`)
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Trip Map</Text>
        </View>
        <MapView
          ref={(ref) => { mapRef = ref }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              'latitude': 41.1579,
              'longitude': -8.6291
            }}
            title={"tILE"}
            description={"FRERTG"}
          />
          <Marker
            coordinate={{
              'latitude': 41.2579,
              'longitude': -8.6291
            }}
            title={"second"}
            description={"FRERTG"}
          />
        </MapView>
        <MainButton text='Get Directions' widthRatio={0.8} handlePress={handleGetDirections}/>
      </View>
    </Background>
  )
};

export default TripMap;
