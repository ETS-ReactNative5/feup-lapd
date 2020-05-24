GLOBAL = require('../config/Global');
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {View, Modal, Dimensions, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = forwardRef((props, ref) => {
  const [date, setDate] = useState(new Date(GLOBAL.startDate));
  const [show, setShow] = useState(false)

  useImperativeHandle(ref, () => ({
    open() {
      setShow(true)
    }
  }));

  const onDateChangeAndroid = (event, selectedDate) => {
    props.saveItem(selectedDate);
    setShow(false)
  }

  const onDateChangeIOS = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onDateSubmitIOS = () => {
    props.saveItem(date)
    setShow(false)
  }

  return (
    <>
      <View>
        { Platform.OS !== 'ios' && show && (
          <DateTimePicker
            style={{width:'100%'}}
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChangeAndroid}
            minimumDate={new Date(GLOBAL.startDate)}
            maximumDate={new Date(GLOBAL.endDate)}
          />
        )}
      </View>
      {
        Platform.OS === 'ios' &&
        (
          <Modal
            animationType="fade"
            transparent
            visible={show}
            presentationStyle="overFullScreen"
          >
            <View
              style={{
                flex: 1,
                height: Dimensions.get('window').height,
                backgroundColor: 'rgba(0,0,0,.2)',
                justifyContent: 'flex-end',
                flexDirection: 'column',
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  paddingBottom: 40,
                }}
              >
                <View>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChangeIOS}
                    style={{ width: '100%' }}
                    minimumDate={new Date(GLOBAL.startDate)}
                    maximumDate={new Date(GLOBAL.endDate)}
                  />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Button title="Done" onPress={onDateSubmitIOS} />
                </View>
              </View>
            </View>
          </Modal>
        )
      }
    </>
  )
})

export default DatePicker;
