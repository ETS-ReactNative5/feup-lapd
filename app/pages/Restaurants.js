import React, { useEffect, useState } from 'react';

import {
  Text, StyleSheet, Dimensions, View, ScrollView, Image, TouchableHighlight
} from 'react-native';
import Background from '../components/Background';
import RestaurantUnit from '../components/units/RestaurantUnit';

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

const Restaurants = () => {

  useEffect(() => {
    console.log("Restaurants page")
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
        <ScrollView contentContainerStyle={{width: "100%"}}>
          <RestaurantUnit
            name="Taberna Londrina"
            address="Estrada da Circunvalação 7964, 4200-537 Porto"
            rating="4.3"
            price="21"
            photo="https://media-cdn.tripadvisor.com/media/photo-s/19/f9/d7/9e/20191101-142718-largejpg.jpg"
          />
          <RestaurantUnit
            name="Salve Simpatia"
            address="Rua da Picaria 89 Baixa, Porto 4050-478 Portugal"
            rating="4.5"
            price="16"
            photo="https://media-cdn.tripadvisor.com/media/photo-s/13/8d/55/92/ambiente-res-do-chao.jpg"
          />
        </ScrollView>
      </View>
    </Background>
  )
};

export default Restaurants;
