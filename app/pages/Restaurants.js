import React, { useEffect, useState } from 'react';

import {
  Text, StyleSheet, Dimensions, View, ScrollView, Image, TouchableHighlight, ActivityIndicator
} from 'react-native';
import Background from '../components/Background';
import RestaurantUnit from '../components/units/RestaurantUnit';
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

const Restaurants = () => {

  const [restaurants, setRestaurants] = useState(null)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  const fetchRestaurants = () => {
    ApiServices.getRestaurants("Lisboa", offset).then((response) => {
      if(offset === 0) setRestaurants(response.data.restaurants)
      else setRestaurants(restaurants.concat(response.data.restaurants))
      setOffset(offset+20)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchRestaurants()
  }, []);

  const handleFilterPress = () => {
    console.log('Open filters')
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Restaurants</Text>
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
        {restaurants === null &&
          <ActivityIndicator
            animating = {true}
            color = 'black'
            size = "large"
          />
        }
        {restaurants !== null &&
          <ScrollView
            contentContainerStyle={{width: "100%"}}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                if(loading === false) {
                  setLoading(true)
                  fetchRestaurants()
                }
              }
            }}
            scrollEventThrottle={400}
          >
            {restaurants.map((item, index) => {
              const restaurant = item.restaurant
              return(
                <RestaurantUnit
                  key={index}
                  name={restaurant.name}
                  address={restaurant.location.address}
                  rating={restaurant.user_rating.aggregate_rating}
                  price={restaurant.average_cost_for_two/2}
                  photo={restaurant.thumb}
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

export default Restaurants;
