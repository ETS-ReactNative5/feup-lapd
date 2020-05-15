import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 15,
    width: 130,
    aspectRatio: 1,
    justifyContent: 'center'
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginVertical: 2
  },
  content: {
    // flex: 1,
    textAlign: 'center',
    paddingTop: 10,
    // fontSize: 20,
    color: 'black'
  },
  button: {
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center'
  }
});

const getPlaceIcon = (icon) => {
  switch (icon) {
    case 'poi':
      return require('../assets/places/poi.png')
    case 'restaurant':
      return require('../assets/places/restaurant.png')
    case 'shop':
      return require('../assets/places/shop.png')
    case 'hotel':
      return require('../assets/places/hotel.png')
  }
}

const handlePress = (navigation) => {
  console.log("NAVIGATE")
  navigation.navigate('Main')
}

const PlacesButton = (props) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handlePress(props.navigation)}>
      <Image
        source={getPlaceIcon(props.image)}
        resizeMode="cover"
        style={styles.icon}
      />
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.content}>{props.content}</Text>
    </TouchableOpacity>
  </View>
);

export default PlacesButton;
