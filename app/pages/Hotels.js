GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {
  Text, StyleSheet, Dimensions, View, ScrollView, Image, TouchableHighlight, ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements'
import Background from '../components/Background';
import HotelUnit from '../components/units/HotelUnit';
import { ApiServices } from '../api/ApiServices';
import OverlayCard from '../components/OverlayCard';
import HotelFilter from '../components/filters/HotelFilter';

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

const Hotels = () => {

  const [hotels, setHotels] = useState(null)
  const [show, setShow] = useState(false)
  const [radius, setRadius] = useState(300)
  const [ratings, setRatings] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [sort, setSort] = useState("")

  useEffect(() => {
    ApiServices.getHotels(GLOBAL.city, radius).then((response) => {
      setHotels(response.data.data)
    }).catch((error) => {
      setHotels([])
      console.log(error)
    })
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
          <Text style={styles.title}>Hotels</Text>
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
        {hotels === null &&
          <View style={styles.loading}>
            <ActivityIndicator
              animating = {true}
              color = 'black'
              size = "large"
            />
          </View>
        }
        {hotels !== null &&
          <ScrollView contentContainerStyle={{width: "100%"}}>
            {hotels.map((item, index) => {
              const hotel = item.hotel
              const offers = item.offers
              return(
                <HotelUnit
                  id={hotel.hotelId}
                  key={index}
                  lat={hotel.latitude}
                  long={hotel.longitude}
                  name={hotel.name}
                  address={hotel.address.lines[0] + " " + hotel.address.postalCode}
                  contact={hotel.contact.phone}
                  rating={hotel.rating}
                  price={offers[0].price.total || "-"}
                />
              )
            })}
          </ScrollView>
        }
        {hotels !== null && hotels.length === 0 &&
          <View style={styles.notfound}>
            <Icon
              name={'ios-alert'}
              size={50}
              color="black"
              type="ionicon"
            />
            <Text style={styles.notfoundtext}>No hotels found</Text>
          </View>
        }
        <OverlayCard width="85%" height="60%" visible={show} toogleOverlay={handleOverlay}>
          <HotelFilter
            radius={radius}
            setRadius={setRadius}
            ratings={ratings}
            setRatings={setRatings}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sort={sort}
            setSort={setSort}/>
        </OverlayCard>
      </View>
    </Background>
  )
};

export default Hotels;
