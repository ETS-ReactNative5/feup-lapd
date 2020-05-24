import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, AsyncStorage} from 'react-native';
import { Icon } from 'react-native-elements'
import { Utils } from '../../utils/Utils';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 7,
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
    paddingVertical: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
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
  city: {
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  country: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.6,
    fontSize: 13,
    paddingLeft: 2
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10
  },
  datecontent: {
    textAlign: 'center',
    color: 'black',
    opacity: 0.8,
    fontSize: 11,
    fontWeight: "200"
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
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '55%',
  },
  calendar: {
    opacity: 0.5
  }
});

const PlannedTripUnit = (props) => {

  const handleDeletePress = async () => {
    try {
      await AsyncStorage.removeItem(props.itemName);
      const keys = await AsyncStorage.getAllKeys();
      let removeKeys = []
      keys.forEach(key => {
        if(key.includes(props.id)) removeKeys.push(key)
      });
      await AsyncStorage.multiRemove(removeKeys);
      props.update()
    } catch (error) {
      console.log(error)
    }
  }

  const handleTripPress = () => {
    GLOBAL.city = props.city
    GLOBAL.country = props.country
    GLOBAL.startDate = props.startDate
    GLOBAL.endDate = props.endDate
    GLOBAL.id = props.id
    props.navigation.navigate('TripMain')
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleTripPress}>
        <Image
          source={{ uri: props.photo, }}
          resizeMode="cover"
          style={styles.photo}
        />
        <View style={styles.content}>
          <View style={styles.text}>
            <View style={styles.place}>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.city}>{props.city},</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.country}>{props.country}</Text>
            </View>
            <View style={styles.date}>
              <Icon
                iconStyle={styles.calendar}
                name="calendar"
                size={20}
                color="black"
                type="evilicon"
              />
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.datecontent}>{`${Utils.getDate(props.startDate)} - ${Utils.getDate(props.endDate)}`}</Text>
            </View>
          </View>
          <TouchableHighlight
            onPress={handleDeletePress}
            underlayColor='transparent'
            >
              <View>
                <Icon
                  iconStyle={styles.icon}
                  name="trash"
                  size={25}
                  color="#BD0B0B"
                  type="evilicon"
                />
              </View>
          </TouchableHighlight>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default PlannedTripUnit;
