import React, { useEffect, useState } from 'react';

import {
  Text, StyleSheet, Dimensions, View, ScrollView, Image, TouchableHighlight
} from 'react-native';
import Background from '../components/Background';
import POIUnit from '../components/POIUnit';

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
    // aspectRatio: 1,
    resizeMode: "contain",
  },
  filter: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

const POIs = ({navigation}) => {

  useEffect(() => {
    console.log("Points of Interest page")
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
        <ScrollView contentContainerStyle={{width: "100%"}}>
          <POIUnit
            name="Torre dos Clérigos"
            photo="https://thumbs.web.sapo.io/?W=800&H=0&delay_optim=1&epic=NGVjacAb7MZWPBuMOmahyV9l5LPGACf7TtK2b3sXQhWHzLBPc9KC7eZMvN6GQ/S6YHh0fxK5DJYvPq/YoSd7E1hFcwUefVWbJLytu0BkI5CsuE8="
            navigation={navigation}
          />
          <POIUnit
            name="Ribeira"
            photo="https://i0.statig.com.br/bancodeimagens/5l/eb/sa/5lebsabb3aqcx1upuu5nwzibw.jpg"
            navigation={navigation}
          />
          <POIUnit
            name="Avenida dos Aliados"
            photo="https://media-manager.noticiasaominuto.com/1920/naom_5b9bc00a43bfc.jpg"
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </Background>
  )
};

export default POIs;
