import React, { useEffect, useState } from 'react';

import {
  Text, StyleSheet, Dimensions, View, ScrollView, Image, TouchableHighlight
} from 'react-native';
import Background from '../components/Background';
import HotelUnit from '../components/units/HotelUnit';

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

const Hotels = ({navigation}) => {

  useEffect(() => {
    console.log("Hotels page")
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
        <ScrollView contentContainerStyle={{width: "100%"}}>
          <HotelUnit
            name="HF Ipanema Porto"
            address="Rua do Campo Alegre 156, 4150-169 Porto"
            contact="22 607 5059"
            rating="4"
            price="60"
            photo="https://pix10.agoda.net/hotelImages/154/1543/1543_15063016440031302008.jpg?s=1024x768"
            navigation={navigation}
          />
          <HotelUnit
            name="Hotel Vila Galé Porto"
            address="Av. de Fernão de Magalhães 7, 4300-190 Porto"
            contact="22 519 1800"
            rating="5"
            price="69"
            photo="https://q-cf.bstatic.com/images/hotel/max1024x768/739/73902525.jpg"
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </Background>
  )
};

export default Hotels;
