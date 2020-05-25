GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {
  Text, StyleSheet, Dimensions, View, ScrollView, ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements'
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

const Shops = () => {

  const [shops, setShops] = useState(null)
  const [loading, setLoading] = useState(true)
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
      setShops([])
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
        {shops === null && loading === true &&
          <View style={styles.loading}>
            <ActivityIndicator
              animating = {true}
              color = 'black'
              size = "large"
            />
          </View>
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
                  lat={shop.location.lat}
                  long={shop.location.lng}
                />)
            })}
            {loading && <ActivityIndicator
              animating = {true}
              color = 'black'
              size = "large"
            />}
          </ScrollView>
        }
        {shops !== null && shops.length === 0 &&
          <View style={styles.notfound}>
            <Icon
              name={'ios-alert'}
              size={50}
              color="black"
              type="ionicon"
            />
            <Text style={styles.notfoundtext}>No shops found</Text>
          </View>
        }
      </View>
    </Background>
  )
};

export default Shops;
