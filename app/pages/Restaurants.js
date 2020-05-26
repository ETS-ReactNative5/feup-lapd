GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {
  Text, StyleSheet, Dimensions, View, ScrollView, Image, TouchableHighlight, ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements'
import Background from '../components/Background';
import RestaurantUnit from '../components/units/RestaurantUnit';
import { ApiServices } from '../api/ApiServices';
import OverlayCard from '../components/OverlayCard';
import RestaurantFilter from '../components/filters/RestaurantFilter';

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
  },
  loading: {
    flex: 3,
    justifyContent: 'center',
  },
  notfound: {
    flex: 2,
  },
  notfoundtext: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
    textAlign: 'center',
  }
});

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const Restaurants = () => {

  const [restaurants, setRestaurants] = useState(null)
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [show, setShow] = useState(false)
  const [order, setOrder] = useState("")

  const fetchRestaurants = () => {
    ApiServices.getRestaurants(`${GLOBAL.city} ${GLOBAL.country}`, offset).then((response) => {
      if(!response.data.restaurants) throw new Error()
      if(offset === 0) setRestaurants(response.data.restaurants)
      else setRestaurants(restaurants.concat(response.data.restaurants))
      setOffset(offset+20)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      if(restaurants === null) setRestaurants([])
    })
  }

  useEffect(() => {
    fetchRestaurants()
  }, []);

  const handleFilterPress = () => {
    setShow(true)
  }

  const handleOverlay = () => {
    setShow(!show)
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
        {restaurants === null && loading === true &&
          <View style={styles.loading}>
            <ActivityIndicator
              animating = {true}
              color = 'black'
              size = "large"
            />
          </View>
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
                  id={restaurant.id}
                  name={restaurant.name}
                  address={restaurant.location.address}
                  rating={restaurant.user_rating.aggregate_rating}
                  price={restaurant.average_cost_for_two/2}
                  photo={restaurant.thumb}
                  lat={parseFloat(restaurant.location.latitude)}
                  long={parseFloat(restaurant.location.longitude)}
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
        {restaurants !== null && restaurants.length === 0 &&
          <View style={styles.notfound}>
            <Icon
              name={'ios-alert'}
              size={50}
              color="black"
              type="ionicon"
            />
            <Text style={styles.notfoundtext}>No restaurants found</Text>
          </View>
        }
        <OverlayCard width="85%" height="60%" visible={show} toogleOverlay={handleOverlay}>
          <RestaurantFilter setOrder={setOrder}/>
        </OverlayCard>
      </View>
    </Background>
  )
};

export default Restaurants;
