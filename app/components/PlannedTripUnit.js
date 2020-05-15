import React from 'react';
import {StyleSheet, Text, Dimensions, View, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 13,
    width: "100%",
    height: 90,
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 70,
    resizeMode: 'cover',
    // marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 13
  },
  button: {
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
  },
  city: {
    // flex: 1,
    textAlign: 'center',
    paddingTop: 10,
    // fontSize: 20,
    color: 'black'
  },
  date: {
    // flex: 1,
    textAlign: 'center',
    paddingTop: 10,
    // fontSize: 20,
    color: 'black'
  },
});

const handlePress = (navigation) => {
  console.log("NAVIGATE")
  // navigation.navigate('Main')
}

const PlannedTripUnit = (props) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handlePress(props.navigation)}>
      <Image
        source={{ uri: 'https://i0.statig.com.br/bancodeimagens/5l/eb/sa/5lebsabb3aqcx1upuu5nwzibw.jpg', }}
        resizeMode="cover"
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.city}>Porto, Portugal</Text>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.date}>12 - 16 Mar</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default PlannedTripUnit;
