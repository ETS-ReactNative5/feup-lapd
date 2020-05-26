import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, Slider, Picker, ActionSheetIOS} from 'react-native';

const styles = StyleSheet.create({
  radius: {
    display: 'flex',
    flexDirection: "row",
  }
});

const HotelFilter = (props) => {


  useEffect(() => {

  }, [])

  const pressSortIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Price", "Distance", "Reset"],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          props.setSort("PRICE")
        } else if (buttonIndex === 2) {
          props.setSort("DISTANCE")
        } else if (buttonIndex === 3) {
          props.setSort("")
        }
      }
    );
  }

  return (
    <View>
      <Text>HOTEL FILTER</Text>
      <View style={styles.radius}>
        <Text>Radius: </Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={1}
          maximumValue={300}
          value={props.radius}
          onValueChange={value => props.setRadius(Math.round(value))}
        />
        <Text>{props.radius} KM</Text>
      </View>
      {Platform.OS !== 'ios' &&
        <View>
          <Text>Ratings</Text>
          <Picker
            selectedValue={props.ratings}
            onValueChange={(value) => props.setRatings(value)}
          >
            <Picker.Item label='-' value='' />
            <Picker.Item label='1' value='1' />
            <Picker.Item label='2' value='2' />
            <Picker.Item label='3' value='3' />
            <Picker.Item label='4' value='4' />
            <Picker.Item label='5' value='5' />
          </Picker>
        </View>
      }
      {Platform.OS !== 'ios' &&
        <View>
          <Text>Sort</Text>
          <Picker
            selectedValue={props.sort}
            onValueChange={(value) => props.setSort(value)}
          >
            <Picker.Item label='-' value='' />
            <Picker.Item label='Price' value='PRICE' />
            <Picker.Item label='Distance' value='DISTANCE' />
          </Picker>
        </View>
      }
      {Platform.OS === 'ios' &&
        <View>
          <Text>Sort:</Text>
          <TouchableOpacity
            onPress={pressSortIOS}
          >
            <Text>{props.sort === "" ? "-" : props.sort}</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
};

export default HotelFilter;
