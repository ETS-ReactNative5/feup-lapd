import React from 'react';
import {View, StyleSheet, TextInput, Dimensions, TouchableHighlight, TouchableOpacity, Text} from 'react-native';
import { Icon } from 'react-native-elements'

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
	textbutton: {
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
    justifyContent: 'center'
  },
  icon: {
    marginRight: 12,
    padding: 1,
    backgroundColor: 'transparent',
    opacity: 0.5
  },
  textinput: {
    color: '#354056',
    opacity: 0.3,
    fontSize: 16
  },
  textinputflag: {
    color: '#424242',
    fontSize: 16
  }
});


const SelectDate = (props) => {

  const handlePress = () => {
    console.log("Icon pressed")
    props.openCalendar()
  }

  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={handlePress}>
        <Text style={props.flag ? styles.textinputflag : styles.textinput}>{props.value}</Text>
      </TouchableOpacity>
      <TouchableHighlight
        onPress={handlePress}
        underlayColor='transparent'
      >
        <View>
          <Icon
            iconStyle={styles.icon}
            name="calendar"
            size={30}
            color="black"
            type="evilicon"
          />
        </View>
      </TouchableHighlight>
    </View>
  )
};

export default SelectDate;
