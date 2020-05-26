GLOBAL = require('../../config/Global');
import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, AsyncStorage} from 'react-native';
import { Icon } from 'react-native-elements'
import DatePicker from '../DatePicker';
import { Utils } from '../../utils/Utils';

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
  }
});

const HotelUnit = (props) => {
  const [selected, setSelected] = useState(false)

  const itemName = `${GLOBAL.id}/hotel/${props.id}`

  const childRef = useRef();

  const handleHotelPress = () => {
    console.log("Open hotel details")
  }

  const getRating = () => {
    let stars = []
    for (let i = 0; i < parseInt(props.rating); i++) {
      stars.push(<Icon
        name={'ios-star'}
        size={13}
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

    loadStoredInformation()
  }, [])

  const handleSelectPress = async () => {
    if(selected){
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
          source={props.photo !== null ? { uri: props.photo, }: require('../../assets/no_image.png')}
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
      <DatePicker ref={childRef} saveItem={saveItem}/>
    </View>
  )
};

export default HotelUnit;
