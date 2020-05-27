GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements'
import { Utils } from '../utils/Utils';
import Background from '../components/Background';
import TripPlanUnit from '../components/units/TripPlanUnit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginTop: Dimensions.get('window').height * 0.12,
    marginBottom: Dimensions.get('window').height * 0.06,
    width: '100%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 5,
    paddingHorizontal: 20
  },
  titlecontainer: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  date: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#E51B23',
    flex: 2,
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  scrollview: {
    flexGrow: 1
  },
  datemap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },
  noplan: {
    fontWeight: 'bold',
  },
  noplanview: {
    paddingVertical: 10,
    alignItems: 'center',
  }
});

const TripPlan = ({navigation}) => {

  const [placesData, setPlacesData] = useState(null)
  const [update, setUpdate] = useState(false);

  const handleDelete = () => {
    setUpdate(!update)
  }

  useEffect(() => {
    setPlacesData(null)
    async function getAllPlaces() {
      try {
        const keys = await AsyncStorage.getAllKeys();
        let tripKeys = []
        keys.forEach(key => {
          if(key.includes(GLOBAL.id) && !key.includes('plannedtrips')) tripKeys.push(key)
        });

        let placesList = Utils.getPlanDates(new Date(GLOBAL.startDate), new Date(GLOBAL.endDate))
        const places = await AsyncStorage.multiGet(tripKeys);
        places.sort((a, b) => (JSON.parse(a[1]).addedAt < JSON.parse(b[1]).addedAt) ? -1 : 1)
        places.forEach(place => {
          const placeJSON = JSON.parse(place[1])
          placeJSON['delete'] = handleDelete
          placesList[placeJSON.date] = [...placesList[placeJSON.date], placeJSON]
        });
        setPlacesData(placesList)
      } catch (error) {
        console.error(error)
      }
    }

    getAllPlaces()
  }, [update]);

  const handleMapPress = (places) => {
    navigation.navigate('TripMap', {places: places})
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Trip Plan</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollview} >
          {placesData !== null && Object.keys(placesData).map(key => {
            return(
            <>
              <View style={styles.datemap}>
                <Text style={styles.date}>{Utils.getDate(key)}</Text>
                {placesData[key].length > 0 &&
                  <TouchableHighlight
                    onPress={() => handleMapPress(placesData[key])}
                    underlayColor='transparent'
                  >
                    <View>
                      <Icon
                        name={'md-map'}
                        size={35}
                        color="green"
                        type="ionicon"
                      />
                    </View>
                  </TouchableHighlight>
                }
              </View>
              <View style={styles.contentContainer}>
                {placesData[key].length > 0 &&
                  placesData[key].map((place, index) => {
                    return (
                      <TripPlanUnit
                        key={index}
                        name={place.name}
                        photo={place.photo}
                        alert={place.alert}
                        itemName={place.itemName}
                        delete={place.delete}
                      />
                    )
                  })
                }
              </View>
              {placesData[key].length === 0 &&
                <View style={styles.noplanview}>
                  <Text style={styles.noplan}>No plans for this day</Text>
                </View>
              }
            </>
            )
          })}
        </ScrollView>
      </View>
    </Background>
  )
};

export default TripPlan;
