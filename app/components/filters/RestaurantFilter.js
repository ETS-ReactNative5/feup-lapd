import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Divider } from 'react-native-elements';
import MainButton from '../MainButton'

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 15,
    marginBottom: 5,
  },
  divider: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    fontSize: 20,
    marginTop: 10
  },
  pickerLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  pickerContainer: {
    flex: .8,
    borderColor: 'grey',
    borderBottomWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  labelContainer: {
    flex: .2,
  },
  label: {
    fontSize: 17,
  },
  button: {
    marginTop: 30,
    alignItems: 'center',
  }
});

const RestaurantFilter = (props) => {

  const handleApply = () => {
    props.setShow(false);
    props.update();
  }

  return (
    <View>
      <Text style={styles.title}>Filter</Text>
      <Divider style={styles.divider} />
      <View style={styles.pickerLabelContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label} > Sort: </Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            mode='dropdown'
            selectedValue={props.sort}
            onValueChange={(value) => props.setSort(value)}
          >
            <Picker.Item label='-' value='' />
            <Picker.Item label='Cost' value='cost' />
            <Picker.Item label='Rating' value='rating' />
            <Picker.Item label='Real Distance' value='real_distance' />
          </Picker>
        </View>
      </View>
      <View style={styles.pickerLabelContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label} > Order: </Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            mode='dropdown'
            selectedValue={props.order}
            onValueChange={(value) => props.setOrder(value)}
          >
            <Picker.Item label='-' value='' />
            <Picker.Item label='Ascendent' value='asc' />
            <Picker.Item label='Descendent' value='desc' />
          </Picker>
        </View>
      </View>
      <View style={styles.button}>
        <MainButton text='Apply' widthRatio={0.7} handlePress={handleApply} />
      </View>
    </View >
  )
};

export default RestaurantFilter;
