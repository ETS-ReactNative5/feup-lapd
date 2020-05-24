GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {
  Text, StyleSheet, Dimensions, View, ScrollView, ActivityIndicator,
} from 'react-native';
import Background from '../components/Background';
import ShopUnit from '../components/units/ShopUnit';
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
  }
});

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const Shops = () => {

  const [shops, setShops] = useState(null)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  const fetchShops = () => {
    ApiServices.getShops(GLOBAL.city, offset).then((response) => {
      if(offset === 0) setShops(response.data.response.venues)
      else setShops(shops.concat(response.data.response.venues))
      setOffset(offset+20)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchShops()
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Shops</Text>
        </View>
        {shops === null &&
          <ActivityIndicator
            animating = {true}
            color = 'black'
            size = "large"
          />
        }
        {shops !== null &&
          <ScrollView
            contentContainerStyle={{width: "100%"}}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                if(loading === false) {
                  setLoading(true)
                  fetchShops()
                }
              }
            }}
            scrollEventThrottle={400}
          >
            {shops.map((shop, index) => {
              return(
                <ShopUnit
                  key={index}
                  id={shop.id}
                  name={shop.name}
                  address={(shop.location.address || "") + " " + (shop.location.postalCode || "") + " " + (shop.location.city || "")}
                  photo={shop.photoUrl}
                />)
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

export default Shops;
