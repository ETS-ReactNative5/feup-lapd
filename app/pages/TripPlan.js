GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Easing,
  Platform,
  TouchableHighlight,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements'
import { Utils } from '../utils/Utils';

import Background from '../components/Background';
import TripPlanUnit from '../components/units/TripPlanUnit';
import SortableList from 'react-native-sortable-list';

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
  row: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        elevation: 0,
        marginHorizontal: 30,
      },
    })
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

const Row = (props) => {

  const _active = new Animated.Value(0);

  const _style = {
    ...Platform.select({
      ios: {
        transform: [{
          scale: _active.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1],
          }),
        }],
        shadowRadius: _active.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 10],
        }),
      },
      android: {
        transform: [{
          scale: _active.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.07],
          }),
        }],
        elevation: _active.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 6],
        }),
      },
    })
  };

  useEffect(() => {
    Animated.timing(_active, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(props.active),
    }).start();
  }, [props])

  return (
    <Animated.View style={[
      styles.row,
      _style,
    ]}>
        <TripPlanUnit
          name={props.data.name}
          photo={props.data.photo}
          alert={props.data.alert}
          itemName={props.data.itemName}
          delete={props.data.delete}
        />
    </Animated.View>
  );
}

const TripPlan = ({navigation}) => {

  const [placesData, setPlacesData] = useState(null)
  const [scroll, setScroll] = useState(true);
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
        places.forEach(place => {
          const placeJSON = JSON.parse(place[1])
          placeJSON['delete'] = handleDelete
          // placeJSON['alert'] = true
          placesList[placeJSON.date] = [...placesList[placeJSON.date], placeJSON]
        });

        setPlacesData(placesList)
      } catch (error) {
        console.error(error)
      }
    }

    getAllPlaces()

  }, [update]);

  const _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }

  const handleMapPress = (places) => {
    navigation.navigate('TripMap', {places: places})
  }

  // TODO: Save order of plans for each day

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Trip Plan</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollview} scrollEnabled={scroll}>
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
              {placesData[key].length > 0 &&
                <SortableList
                  contentContainerStyle={styles.contentContainer}
                  data={placesData[key]}
                  renderRow={_renderRow}
                  onActivateRow={() => setScroll(false)}
                  onReleaseRow={() => setScroll(true)}
                  onChangeOrder={(order) => {console.log(order)}}
                />
              }
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
