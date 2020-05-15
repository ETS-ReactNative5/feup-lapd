import React, { useState } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 13,
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
    paddingLeft: 2,
    paddingTop: 2
  },
  ratingnumber: {
    textAlign: 'left',
    color: '#FB7E0A',
    fontSize: 11,
    fontWeight: "400",
  }
});

const RestaurantUnit = (props) => {
  const [selected, setSelected] = useState(false)

  const handleRestaurantPress = () => {
    console.log("Open restaurant details")
  }

  const handleSelectPress = () => {
    console.log("Selected pressed")
    setSelected(!selected)
  }

  const getRating = () => {
    let stars = []
    for (let i = 1; i < 6; i++) {
      if(i <= Math.floor(props.rating)){
        stars.push(<Icon
          name={'ios-star'}
          size={13}
          color="#F1C644"
          type="ionicon"
        />)
      } else if((parseFloat(props.rating)-i) >= -0.5){
        stars.push(<Icon
          name={'ios-star-half'}
          size={13}
          color="#F1C644"
          type="ionicon"
        />)
      } else {
        stars.push(<Icon
          name={'ios-star-outline'}
          size={13}
          color="#F1C644"
          type="ionicon"
        />)
      }
    }
    return stars
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleRestaurantPress}>
        <Image
          source={{ uri: props.photo, }}
          resizeMode="cover"
          style={styles.photo}
        />
        <View style={styles.content}>
          <View style={styles.text}>
            <View style={styles.place}>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.name}>{props.name}</Text>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.addresscontact}>{props.address}</Text>
              <View style={styles.ratingprice}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ratingnumber}>{props.rating}</Text>
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
    </View>
  )
};

export default RestaurantUnit;