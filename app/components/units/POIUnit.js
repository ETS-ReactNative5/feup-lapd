GLOBAL = require('../../config/Global');
import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, AsyncStorage} from 'react-native';
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

const POIUnit = (props) => {
  const [selected, setSelected] = useState(false)

  const itemName = `${GLOBAL.id}/poi/${props.id}`

  const childRef = useRef();

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
        long: props.long,
        addedAt: new Date()
      }));
      setSelected(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.button} >
        <Image
          source={props.photo !== null ? { uri: props.photo, }: require('../../assets/no_image.png')}
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
      </View>
      <DatePicker ref={childRef} saveItem={saveItem}/>
    </View>
  )
};

export default POIUnit;
