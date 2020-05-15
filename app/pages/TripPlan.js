import React, { useEffect, useState } from 'react';

import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import Background from '../components/Background';
import TripPlanUnit from '../components/units/TripPlanUnit';
import SortableList from 'react-native-sortable-list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginTop: Dimensions.get('window').height * 0.12,
    marginBottom: Dimensions.get('window').height * 0.06,
    width: '100%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 5,
    paddingHorizontal: 20
  },
  titlecontainer: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  row: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        // width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  }
});

const data = {
  0: {
    photo: 'https://placekitten.com/200/240',
    name: 'Chloe',
  },
  1: {
    photo: 'https://placekitten.com/200/201',
    name: 'Jasper',
  },
  2: {
    photo: 'https://placekitten.com/200/202',
    name: 'Pepper',
  }
};

const Row = (props) => {

  const _active = new Animated.Value(0);

  const _style = {
    ...Platform.select({
      ios: {
        transform: [{
          scale: _active.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1],
          }),
        }],
        shadowRadius: _active.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 10],
        }),
      },
      android: {
        transform: [{
          scale: _active.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.07],
          }),
        }],
        elevation: _active.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 6],
        }),
      },
    })
  };

  useEffect(() => {
    Animated.timing(_active, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(props.active),
    }).start();
  }, [props])

  return (
    <Animated.View style={[
      styles.row,
      _style,
    ]}>
        <TripPlanUnit
          name={props.data.name}
          photo={props.data.photo}
        />
    </Animated.View>
  );
}

const TripPlan = () => {

  useEffect(() => {
    console.log("Points of Interest page")
  }, []);

  const _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Trip Plan</Text>
        </View>
        {/* <ScrollView contentContainerStyle={{width: "100%"}}>
          <TripPlanUnit
            name="Torre dos Clérigos"
            photo="https://thumbs.web.sapo.io/?W=800&H=0&delay_optim=1&epic=NGVjacAb7MZWPBuMOmahyV9l5LPGACf7TtK2b3sXQhWHzLBPc9KC7eZMvN6GQ/S6YHh0fxK5DJYvPq/YoSd7E1hFcwUefVWbJLytu0BkI5CsuE8="
          />
          <TripPlanUnit
            name="Ribeira"
            photo="https://i0.statig.com.br/bancodeimagens/5l/eb/sa/5lebsabb3aqcx1upuu5nwzibw.jpg"
          />
          <TripPlanUnit
            name="Avenida dos Aliados"
            photo="https://media-manager.noticiasaominuto.com/1920/naom_5b9bc00a43bfc.jpg"
          />
        </ScrollView> */}
          <SortableList
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={data}
            renderRow={_renderRow}
          />
      </View>
    </Background>
  )
};

export default TripPlan;
