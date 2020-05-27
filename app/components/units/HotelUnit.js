GLOBAL = require('../../config/Global');
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native';
import { Icon, Divider } from 'react-native-elements'
import DatePicker from '../DatePicker';
import { Utils } from '../../utils/Utils';
import { ApiServices } from '../../api/ApiServices';
import OverlayCard from '../OverlayCard';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 5,
    width: "100%",
    justifyContent: 'center',
  },
  photo: {
    width: 100,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 13
  },
  button: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  content: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  name: {
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  icon: {
    paddingRight: 15,
    opacity: 0.8
  },
  text: {
    flex: 2,
    marginHorizontal: 12,
  },
  place: {
    display: 'flex',
    maxWidth: '100%'
  },
  addresscontact: {
    textAlign: 'left',
    color: 'black',
    opacity: 0.8,
    fontSize: 11,
    fontWeight: "200",
    paddingTop: 1
  },
  ratingprice: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  price: {
    textAlign: 'left',
    color: '#5393DF',
    fontSize: 11,
    fontWeight: "400",
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 5,
    paddingTop: 2
  },
  detailsImage: {
    width: '100%',
    height: '30%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  detailsHeader: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 3,
  },
  detailsName: {
    fontWeight: 'bold',
    fontSize: 25,
    marginRight: 2,
    flex: 1,
  },
  ratingnumber: {
    textAlign: 'left',
    color: '#FB7E0A',
    fontSize: 11,
    fontWeight: "400",
    marginRight: 3
  },
  detailsContent: {
    marginTop: 5,
    marginBottom: 5
  },
  detailsAddress: {
    color: 'grey',
    fontSize: 13
  },
  detailsAmenities: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  detailsFooter: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'flex-end',
    flex: 1,
  },
});

const HotelUnit = (props) => {
  const [selected, setSelected] = useState(false)
  const [photos, setPhotos] = useState(null)
  const [show, setShow] = useState(false)

  const itemName = `${GLOBAL.id}/hotel/${props.id}`

  const childRef = useRef();

  const handleHotelPress = () => {
    console.log("Open hotel details")
    setShow(true)
  }

  const handleOverlay = () => {
    setShow(!show)
  }

  const getRating = (size = 13) => {
    let stars = []
    for (let i = 0; i < parseInt(props.rating); i++) {
      stars.push(<Icon
        name={'ios-star'}
        size={size}
        color="#F1C644"
        type="ionicon"
        key={`star_${i}`}
      />)
    }
    return stars
  }

  useEffect(() => {
    async function loadStoredInformation() {
      try {
        let value = await AsyncStorage.getItem(itemName);
        if (value != null) setSelected(true)
        else setSelected(false)
      } catch (error) {
        console.log(error)
      }
    }

    async function loadHotelPhotos() {
      ApiServices.getImage(`${props.name} ${GLOBAL.city}`).then(response => {
        setPhotos(response.data)
      }).catch(error => console.log(error))
    }

    loadStoredInformation()
    loadHotelPhotos()
  }, [])

  const handleSelectPress = async () => {
    if (selected) {
      try {
        await AsyncStorage.removeItem(itemName);
        setSelected(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      childRef.current.open()
    }
  }

  const saveItem = async (selectedDate) => {
    try {
      await AsyncStorage.setItem(itemName, JSON.stringify({
        photo: props.photo,
        name: props.name,
        itemName: itemName,
        date: Utils.formatDate(selectedDate),
        lat: props.lat,
        long: props.long
      }));
      setSelected(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleHotelPress}>
        <Image
          source={photos !== null && photos.length > 0 ? { uri: photos[0].image } : require('../../assets/no_image.png')}
          resizeMode="cover"
          style={styles.photo}
        />
        <View style={styles.content}>
          <View style={styles.text}>
            <View style={styles.place}>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.name}>{props.name}</Text>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.addresscontact}>{props.address}</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.addresscontact}>{props.contact}</Text>
              <View style={styles.ratingprice}>
                <View style={styles.rating}>
                  {getRating()}
                </View>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.price}>{props.price}€</Text>
              </View>
            </View>
          </View>
          <TouchableHighlight
            onPress={handleSelectPress}
            underlayColor='transparent'
          >
            <View>
              {!selected &&
                <Icon
                  iconStyle={styles.icon}
                  name="plus"
                  size={25}
                  color="#BD0B0B"
                  type="evilicon"
                />
              }
              {selected &&
                <Icon
                  iconStyle={styles.icon}
                  name="check"
                  size={25}
                  color="#2FA511"
                  type="evilicon"
                />
              }
            </View>
          </TouchableHighlight>
        </View>
      </TouchableOpacity>
      <DatePicker ref={childRef} saveItem={saveItem} />
      <OverlayCard width="85%" height="80%" visible={show} toogleOverlay={handleOverlay}>
        <View style={{ height: "100%" }}>
          <Image
            source={photos !== null && photos.length > 0 ? { uri: photos[0].image } : require('../../assets/no_image.png')}
            resizeMode="cover"
            style={styles.detailsImage}
          />
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsName}>{props.name}</Text>
            <View>
              <View style={{ flexDirection: 'row' }} >
                <Text numberOfLines={1} style={[styles.ratingnumber, { fontSize: 15 }]}>{props.rating}</Text>
                <View style={styles.rating}>
                  {getRating(15)}
                </View>
              </View>
              <Text numberOfLines={1} style={[styles.price, { fontSize: 13 }]}>Price: {props.price}€</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.detailsContent}>
            <Text style={{ fontSize: 12 }}>{props.description}</Text>
            <Text style={styles.detailsAddress}>{props.address}</Text>
          </View>
          <Divider />
          <View style={styles.detailsAmenities}>
            {props.amenities.map((e => (
              <Text style={{ fontSize: 9 }}>{e}/</Text>
            )))}
          </View>
          <View style={styles.detailsFooter}>
            <Divider />
            <Text style={{ fontSize: 9 }}>Phone number:</Text>
            <Text style={{ fontSize: 10 }}>{props.phone}</Text>
            <Text style={{ fontSize: 9 }}>Email:</Text>
            <Text style={{ fontSize: 10 }}>{props.email}</Text>
          </View>
          {/* 

          <View style={styles.detailsContent}>
            <Text>{props.establishment} - {props.cuisines}</Text>
            <Text style={styles.detailsAddress}>{props.address}</Text>
          </View>
          <View style={styles.detailsFooter}>
            <Divider />
            <Text style={{ fontSize: 13 }}>Phone number:</Text>
            <Text style={{ fontSize: 10 }}>{props.phone}</Text>
            <Text style={{ fontSize: 13 }}>Schedule:</Text>
            <Text style={{ fontSize: 10 }}>{props.timings}</Text>
          </View> */}
        </View>
      </OverlayCard>
    </View>
  )
};

export default HotelUnit;
