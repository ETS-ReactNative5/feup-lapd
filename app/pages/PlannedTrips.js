import React, { useEffect, useState } from 'react';

import {
  Text, StyleSheet, Dimensions, View, ScrollView, AsyncStorage, ActivityIndicator
} from 'react-native';
import Background from '../components/Background';
import PlannedTripUnit from '../components/units/PlannedTripUnit';

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

  const [plannedTrips, setPlannedTrips] = useState(null)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    async function getAllPlannedTrips() {
      try {
        const keys = await AsyncStorage.getAllKeys();
        let tripKeys = []
        keys.forEach(key => {
          if(key.includes("plannedtrips/")) tripKeys.push(key)
        });

        const trips = await AsyncStorage.multiGet(tripKeys);
        let jsonTrips = []
        trips.forEach(trip => {
          jsonTrips.push(JSON.parse(trip[1]))
        });
        setPlannedTrips(jsonTrips)

      } catch (error) {
        console.error(error)
      }
    }

    getAllPlannedTrips()
  }, [update]);

  const handleUpdate = () => {
    setUpdate(!update)
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Planned Trips</Text>
        </View>
        {plannedTrips === null &&
          <ActivityIndicator
            animating = {true}
            color = 'black'
            size = "large"
          />
        }
        {plannedTrips !== null &&
          <ScrollView contentContainerStyle={{width: "100%"}}>
            {plannedTrips.map((trip, index) => {
              return(
                <PlannedTripUnit
                  key={index}
                  id={trip.id}
                  city={trip.city}
                  country={trip.country}
                  photo={trip.photo}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  navigation={navigation}
                  itemName={trip.itemName}
                  update={handleUpdate}
                />
              )
            })}
          </ScrollView>
        }
      </View>
    </Background>
  )
};

export default PlannedTrips;
