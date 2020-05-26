import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';
import { Divider, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import MainButton from '../MainButton'

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  title: {
    fontSize: 25,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 15,
    marginVertical: 5,
    marginBottom: 7
  },
  divider: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    maxWidth: '100%'
  },
  pickerContainer: {
    flex: 1,
    textAlign: 'center',
  },
  label: {
    fontSize: 17,
  },
  button: {
    marginTop: 30,
    alignItems: 'center',
  },
  priceRange: {
    maxWidth: '30%',
    flexDirection: 'row'
  },
  textInput: {
    borderWidth: 1
  }
});

const HotelFilter = (props) => {

  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  useEffect(() => {
    setMin(props.priceRange.split('-')[0])
    setMax(props.priceRange.split('-')[1])
  }, [])

  useEffect(() => {
    if (!min || !max || min == '' || max == '' ||
      (min != '' && max != '' && parseInt(min) >= parseInt(max))) {
      console.log("Set - nada")
      props.setPriceRange('')
    } else {
      console.log("Set - " + min + '-' + max)
      props.setPriceRange(min + '-' + max);
    }
  }, [min, max])

  const handleApply = () => {
    props.setShow(false);
    props.update();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter</Text>
      <Divider style={styles.divider} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}> Radius: </Text>
        <Slider
          style={{ width: "60%" }}
          minimumValue={1}
          maximumValue={300}
          value={props.radius}
          onValueChange={value => props.setRadius(Math.round(value))}
        />
        <Text>{props.radius} KM</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label} > Rating: </Text>
        </View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={props.ratings}
            placeholder={{ label: 'Select an item...', value: '' }}
            onValueChange={(value) => props.setRatings(value)}
            items={[
              { label: '1 Star', value: '1' },
              { label: '2 Stars', value: '2' },
              { label: '3 Stars', value: '3' },
              { label: '4 Stars', value: '4' },
              { label: '5 Stars', value: '5' }
            ]}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label} > Price Range: </Text>
        <View style={styles.priceRange}>
          <Input
            placeholder={'min'}
            keyboardType='numeric'
            value={min}
            onChangeText={value => setMin(value)}
          />
          <Text style={{ alignItems: 'center' }}> - </Text>
          <Input
            placeholder={'max'}
            keyboardType='numeric'
            value={max}
            onChangeText={value => setMax(value)}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label} > Sort: </Text>
        </View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={props.sort}
            placeholder={{ label: 'Select an item...', value: '' }}
            onValueChange={(value) => props.setSort(value)}
            items={[
              { label: 'Price', value: 'PRICE' },
              { label: 'Distance', value: 'DISTANCE' }
            ]}
          />
        </View>
      </View>
      <View style={styles.button}>
        <MainButton text='Apply' widthRatio={0.7} handlePress={handleApply} />
      </View>
    </View >
  )
};

export default HotelFilter;
