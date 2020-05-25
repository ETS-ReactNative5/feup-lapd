GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {
  Text, StyleSheet, Dimensions, View, ScrollView, Image, TouchableHighlight, ActivityIndicator
} from 'react-native';
import Background from '../components/Background';
import POIUnit from '../components/units/POIUnit';
import { ApiServices } from '../api/ApiServices';

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
  image: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  filter: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const POIs = () => {

  const filters = 'art&outdoor&nightlife&event'

  const [pois, setPois] = useState(null)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  const fetchPOIs = () => {
    ApiServices.getPOIs(GLOBAL.city, offset, filters).then((response) => {
      if(offset === 0) setPois(response.data.response.venues)
      else setPois(pois.concat(response.data.response.venues))
      setOffset(offset+20)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchPOIs()
  }, []);

  const handleFilterPress = () => {
    console.log('Open filters')
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Points of Interest</Text>
          <View style={styles.filter}>
            <TouchableHighlight
              onPress={handleFilterPress}
              underlayColor='transparent'
            >
                <Image
                  source={require('../assets/filter.png')}
                  style={styles.image}
                />
            </TouchableHighlight>
          </View>
        </View>
        {pois === null &&
          <ActivityIndicator
            animating = {true}
            color = 'black'
            size = "large"
          />
        }
        {pois !== null &&
          <ScrollView
            contentContainerStyle={{width: "100%"}}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                if(loading === false) {
                  setLoading(true)
                  fetchPOIs()
                }
              }
            }}
            scrollEventThrottle={400}
          >
            {pois.map((poi, index) => {
              return (
                <POIUnit
                  id={poi.id}
                  key={index}
                  name={poi.name}
                  photo={poi.photoUrl}
                  lat={poi.location.lat}
                  long={poi.location.lng}
                />
              )
            })}
            {loading && <ActivityIndicator
              animating = {true}
              color = 'black'
              size = "large"
            />}
          </ScrollView>
        }
      </View>
    </Background>
  )
};

export default POIs;
