import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Slider, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Divider, Input } from 'react-native-elements';
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
    maxWidth: '100%',
    marginVertical: 20,
    marginLeft: 10,
    flex: 1
  },
  pickerContainer: {
    flex: 5,
    textAlign: 'center',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 20,
    justifyContent: "flex-end"
  },
  priceRange: {
    maxWidth: '20%',
    flexDirection: 'row',
    // justifyContent: 'center'
  },
  textInput: {
    borderWidth: 1
  },
  content: {
    flex: 4,
    justifyContent: "center",
    marginVertical: 20
  },
  labelContainer: {
    flex: 2,
  },
});

const HotelFilter = (props) => {

  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  useEffect(() => {
    if(props.priceRange !== ""){
      setMin(props.priceRange.split('-')[0])
      setMax(props.priceRange.split('-')[1])
    }
  }, [])

  useEffect(() => {
    if (!min || !max || min == '' || max == '' ||
      (min != '' && max != '' && parseInt(min) >= parseInt(max))) {
      props.setPriceRange('')
    } else {
      props.setPriceRange(min + '-' + max);
    }
  }, [min, max])

  const handleApply = () => {
    if((min !== '' || max !== '') && props.priceRange === '') {
      Alert.alert('Error', 'Invalid price range.', [
          {
            text: 'Ok',
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
      return
    }
    props.setShow(false);
    props.update();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Filter</Text>
        <Divider style={styles.divider} />
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}> Radius: </Text>
            <Slider
              style={{ width: "50%", marginHorizontal: 6 }}
              minimumValue={1}
              maximumValue={300}
              value={props.radius}
              onValueChange={value => props.setRadius(Math.round(value))}
            />
            <Text>{props.radius} KM</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
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
                inputStyle={{ fontSize: 14}}
              />
              <View style={{justifyContent: 'center'}}>
                <Text style={{ alignItems: 'center' }}> - </Text>
              </View>
              <Input
                placeholder={'max'}
                keyboardType='numeric'
                value={max}
                onChangeText={value => setMax(value)}
                inputStyle={{ fontSize: 14}}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label} > Sort: </Text>
            </View>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                value={props.sort}
                placeholder={{ label: 'Select an item...', value: '' }}
                onValueChange={(value) => props.setSort(value)}
                items={[
                  { label: 'Price', value: 'price' },
                  { label: 'Distance', value: 'distance' }
                ]}
              />
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <MainButton text='Apply' widthRatio={0.7} handlePress={handleApply} />
        </View>
      </View >
    </TouchableWithoutFeedback>
  )
};

export default HotelFilter;
