import React, { useEffect } from 'react';

import {
  Text, StyleSheet, Dimensions, View, Linking, Alert
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

const TripMap = ({route}) => {

  const { places } = route.params

  let mapRef = null

  useEffect(() => {
    mapRef.fitToElements(true)
  }, []);

  const handleGetDirections = () => {

    if(places.length < 2) {
      Alert.alert(
        'Warning',
        'In order to get directions, you need to have at least 2 places planned to visit for the day.',
        [
          {
            text: 'Ok',
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
      return
    }

    const data = {
      origin: places[0].lat + " " + places[0].long,
      destination: places[places.length-1].lat + " " + places[places.length-1].long
    }

    let waypoints = ""
    for (let i = 1; i < places.length - 1; i++) {
      waypoints += places[i].lat + " " + places[i].long + "|"
    }

    if(waypoints !== "") data['waypoints'] = waypoints

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
          {places.map((place, index) => {
            return(
              <Marker
                key={index}
                coordinate={{
                  'latitude': place.lat,
                  'longitude': place.long
                }}
                title={place.name}
              />
            )
          })}
        </MapView>
        <MainButton text='Get Directions' widthRatio={0.8} handlePress={handleGetDirections}/>
      </View>
    </Background>
  )
};

export default TripMap;
