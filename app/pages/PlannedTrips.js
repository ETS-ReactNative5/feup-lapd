import React, { useEffect, useState } from 'react';

import {
  Text, StyleSheet, Dimensions, View, ScrollView
} from 'react-native';
import Background from '../components/Background';
import PlannedTripUnit from '../components/PlannedTripUnit';

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
  },
  titlecontainer: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 25
  }
});

const PlannedTrips = ({navigation}) => {

  useEffect(() => {
    console.log("Planned trips page")
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Planned Trips</Text>
        </View>
        <ScrollView contentContainerStyle={{width: "100%"}}>
          <PlannedTripUnit
            city="Porto"
            country="Portugal"
            photo="https://i0.statig.com.br/bancodeimagens/5l/eb/sa/5lebsabb3aqcx1upuu5nwzibw.jpg"
            date="12 - 16 Mar"
            navigation={navigation}
          />
          <PlannedTripUnit
            city="Barcelona"
            country="Espanha"
            photo="https://cdn4.hotelopia.com/destinations/d/BCN.jpg"
            date="25 - 27 Apr"
            navigation={navigation}
          />
          <PlannedTripUnit
            city="Lisboa"
            country="Portugal"
            photo="https://media-manager.noticiasaominuto.com/1920/naom_5c028796324ea.jpg"
            date="12 - 16 Mar"
            navigation={navigation}
          />
          <PlannedTripUnit
            city="Porto"
            country="Portugal"
            photo="https://i0.statig.com.br/bancodeimagens/5l/eb/sa/5lebsabb3aqcx1upuu5nwzibw.jpg"
            date="12 - 16 Mar"
            navigation={navigation}
          />
          <PlannedTripUnit
            city="Porto"
            country="Portugal"
            photo="https://i0.statig.com.br/bancodeimagens/5l/eb/sa/5lebsabb3aqcx1upuu5nwzibw.jpg"
            date="12 - 16 Mar"
            navigation={navigation}
          />
          <PlannedTripUnit
            city="Porto"
            country="Portugal"
            photo="https://i0.statig.com.br/bancodeimagens/5l/eb/sa/5lebsabb3aqcx1upuu5nwzibw.jpg"
            date="12 - 16 Mar"
            navigation={navigation}
          />
          <PlannedTripUnit
            city="Porto"
            country="Portugal"
            photo="https://i0.statig.com.br/bancodeimagens/5l/eb/sa/5lebsabb3aqcx1upuu5nwzibw.jpg"
            date="12 - 16 Mar"
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </Background>
  )
};

export default PlannedTrips;
