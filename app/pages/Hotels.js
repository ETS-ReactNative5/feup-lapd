import React, { useEffect, useState } from 'react';

import {
  Text, StyleSheet, Dimensions, View, ScrollView, Image, TouchableHighlight, ActivityIndicator
} from 'react-native';
import Background from '../components/Background';
import HotelUnit from '../components/units/HotelUnit';
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

const Hotels = () => {

  const [hotels, setHotels] = useState(null)

  useEffect(() => {
    ApiServices.getHotels("Lisboa", 300).then((response) => {
      setHotels(response.data.data)
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  const handleFilterPress = () => {
    console.log('Open filters')
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
          <ActivityIndicator
            animating = {true}
            color = 'black'
            size = "large"
          />
        }
        {hotels !== null &&
          <ScrollView contentContainerStyle={{width: "100%"}}>
            {hotels.map((item, index) => {
              const hotel = item.hotel
              const offers = item.offers
              console.log(hotel.media.uri)
              return(
                <HotelUnit
                  key={index}
                  name={hotel.name}
                  address={hotel.address.lines[0] + " " + hotel.address.postalCode}
                  contact={hotel.contact.phone}
                  rating={hotel.rating}
                  price={offers[0].price.total || "-"}
                  photo={hotel.media[0].uri}
                />
              )
            })}
          </ScrollView>
        }
      </View>
    </Background>
  )
};

export default Hotels;
