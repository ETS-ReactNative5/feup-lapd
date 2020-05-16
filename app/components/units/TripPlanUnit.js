import React, { useState } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements'

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
  alert: {
    paddingRight: 5,
  },
  text: {
    flex: 2,
    marginHorizontal: 12,
  },
  place: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
  }
});

const TripPlanUnit = (props) => {

  const handleDeletePress = () => {
    console.log("Delete pressed")
  }

  const handleAlertPress = () => {
    console.log("Alert pressed")
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Image
          source={{ uri: props.photo, }}
          resizeMode="cover"
          style={styles.photo}
        />
        <View style={styles.content}>
          <View style={styles.text}>
            <View style={styles.place}>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.name}>{props.name}</Text>
            </View>
          </View>
          {props.alert && <TouchableHighlight
            onPress={handleAlertPress}
            underlayColor='transparent'
          >
            <View>
              <Icon
                iconStyle={styles.alert}
                name="exclamation"
                size={25}
                color="#EBD50F"
                type="evilicon"
              />
            </View>
          </TouchableHighlight>}
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
      </View>
    </View>
  )
};

export default TripPlanUnit;
