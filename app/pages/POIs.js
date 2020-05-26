GLOBAL = require('../config/Global');
import React, { useEffect, useState } from 'react';
import {
  Text, StyleSheet, Dimensions, View, ScrollView, Image, TouchableHighlight, ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements'
import Background from '../components/Background';
import POIUnit from '../components/units/POIUnit';
import { ApiServices } from '../api/ApiServices';
import OverlayCard from '../components/OverlayCard';
import POIFilter from '../components/filters/POIFilter';

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

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const POIs = () => {

  const [pois, setPois] = useState(null)
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [show, setShow] = useState(false)
  const [update, setUpdate] = useState(false)

  const [art, setArt] = useState(true)
  const [outdoor, setOutdoor] = useState(true)
  const [nightlife, setNightlife] = useState(true)
  const [event, setEvent] = useState(true)

  const convertFilters = () => {
    let filters = "";
    if (art) filters += "art&"
    if (outdoor) filters += "outdoor&"
    if (nightlife) filters += "nightlife&"
    if (event) filters += "event&"
    filters = filters.slice(0, -1);
    return filters
  }

  const handleUpdate = () => {
    setLoading(true);
    setPois(null);
    setOffset(0);
    setUpdate(!update);
  }

  const fetchPOIs = () => {
    ApiServices.getPOIs(`${GLOBAL.city} ${GLOBAL.country}`, offset, convertFilters()).then((response) => {
      if (offset === 0) setPois(response.data.response.venues)
      else setPois(pois.concat(response.data.response.venues))
      setOffset(offset + 20)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      if (pois === null) setPois([])
    })
  }

  useEffect(() => {
    fetchPOIs()
  }, [update]);

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
        {pois === null && loading === true &&
          <View style={styles.loading}>
            <ActivityIndicator
              animating={true}
              color='black'
              size="large"
            />
          </View>
        }
        {pois !== null &&
          <ScrollView
            contentContainerStyle={{ width: "100%" }}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                if (loading === false) {
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
              animating={true}
              color='black'
              size="large"
            />}
          </ScrollView>
        }
        {pois !== null && pois.length === 0 &&
          <View style={styles.notfound}>
            <Icon
              name={'ios-alert'}
              size={50}
              color="black"
              type="ionicon"
            />
            <Text style={styles.notfoundtext}>No points of interest found</Text>
          </View>
        }
        <OverlayCard width="85%" height="50%" visible={show} toogleOverlay={handleOverlay}>
          <POIFilter update={handleUpdate} setShow={setShow}
            art={art} toggleArt={() => setArt(!art)}
            outdoor={outdoor} toggleOutdoor={() => setOutdoor(!outdoor)}
            nightlife={nightlife} toggleNightlife={() => setNightlife(!nightlife)}
            event={event} toggleEvent={() => setEvent(!event)}
          />
        </OverlayCard>
      </View>
    </Background>
  )
};

export default POIs;
