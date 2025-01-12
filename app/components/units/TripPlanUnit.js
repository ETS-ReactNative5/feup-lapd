import React from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage, TouchableHighlight, Alert} from 'react-native';
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

  const handleDeletePress = async () => {
    Alert.alert(
      'Are you sure you want to delete this item?', '',
      [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(props.itemName);
            } catch (error) {
              console.log(error)
            }
            props.delete()
          }
        },
        {
          text: 'No',
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Image
          source={props.photo !== null ? { uri: props.photo, } : require('../../assets/no_image.png')}
          resizeMode="cover"
          style={styles.photo}
        />
        <View style={styles.content}>
          <View style={styles.text}>
            <View style={styles.place}>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.name}>{props.name}</Text>
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
      </View>
    </View>
  )
};

export default TripPlanUnit;
