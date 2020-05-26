import React from 'react';
import {View, StyleSheet, TextInput, Dimensions, TouchableHighlight, Alert} from 'react-native';
import { Icon } from 'react-native-elements'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
	view: {
    marginTop: 20,
    width: Dimensions.get('window').width * 0.75,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8
	},
	textinput: {
    borderRadius: 50,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    fontSize: 16,
    height: 45,
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
    color: '#424242',
  },
  icon: {
    marginRight: 12,
    padding: 1,
    backgroundColor: 'transparent',
    opacity: 0.5
  }
});


const SelectCity = (props) => {

  const handleLocationPress = async () => {
    props.setLoading(true)
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Error', 'Permission to access location was denied.', [
        {
          text: 'Ok',
          style: 'cancel',
        }
      ],
      { cancelable: false }
    );
    }
    try {
      let location = await Location.getCurrentPositionAsync({});

      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 1.0,
        longitudeDelta: 1.0
      }

      let loc = await Location.reverseGeocodeAsync(region)
      props.setCity(loc[0].region)
    } catch (error) {
      Alert.alert('Error', 'Enable GPS to get your current location.', [
          {
            text: 'Ok',
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
    }
    props.setLoading(false)
  }

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.textinput}
        placeholder="Select city..."
        value={props.value}
        onChangeText={text => props.onChange(text)}
      />
      <TouchableHighlight
        onPress={handleLocationPress}
        underlayColor='transparent'
      >
        <View>
          <Icon
            iconStyle={styles.icon}
            name="location"
            size={30}
            color="black"
            type="evilicon"
          />
        </View>
      </TouchableHighlight>
    </View>
  )
};

export default SelectCity;
