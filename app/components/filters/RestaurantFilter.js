import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Divider } from 'react-native-elements';
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
  pickerLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  pickerContainer: {
    flex: 8,
    textAlign: 'center',
  },
  labelContainer: {
    flex: 2,
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
    <View style={styles.container}>
      <Text style={styles.title}>Filter</Text>
      <Divider style={styles.divider} />
      <View style={styles.pickerLabelContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label} > Sort: </Text>
        </View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={props.sort}
            placeholder={{ label: 'Select an item...', value: '' }}
            onValueChange={(value) => props.setSort(value)}
            items={[
              { label: 'Cost', value: 'cost' },
              { label: 'Rating', value: 'rating' },
              { label: 'Real Distance', value: 'real_distance' }
            ]}
          />
        </View>
      </View>
      <View style={styles.pickerLabelContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label} > Order: </Text>
        </View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={props.order}
            placeholder={{ label: 'Select an item...', value: '' }}
            onValueChange={(value) => props.setOrder(value)}
            items={[
              { label: 'Ascendant', value: 'asc' },
              { label: 'Descendant', value: 'desc' }
            ]}
          />
        </View>
      </View >
      <View style={styles.button}>
        <MainButton text='Apply' widthRatio={0.7} handlePress={handleApply} />
      </View>
    </View >
  )
};

export default RestaurantFilter;
