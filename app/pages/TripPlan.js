import React, { useEffect, useState } from 'react';

import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Easing,
  Platform,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements'

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
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  date: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#E51B23',
    flex: 2,
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
  },
  scrollview: {
    flexGrow: 1
  },
  datemap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },
  list: {
    flexGrow: 1,
  }
});

const data = {
  0: {
    photo: 'https://www.vilagale.com/media/1231487/slider_vgportoribeira.jpg?quality=89',
    name: 'Ribeira',
    alert: true
  },
  1: {
    photo: 'https://media-manager.noticiasaominuto.com/1920/naom_5b9bc00a43bfc.jpg',
    name: 'Avenida dos Aliados',
  },
  2: {
    photo: 'https://www.comerciocomhistoria.gov.pt/wp-content/uploads/import/listings/3351_imagem2.jpg',
    name: 'Livraria Lello',
    alert: true
  }
};

const all_data = [
  {date: "12 Mar", data: data},
  {date: "13 Mar", data: data},
  {date: "14 Mar", data: data},
  {date: "15 Mar", data: data}
]

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
          alert={props.data.alert}
        />
    </Animated.View>
  );
}

const TripPlan = ({navigation}) => {

  const [scroll, setScroll] = useState(true);

  useEffect(() => {
    console.log("Points of Interest page")
  }, []);

  const _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }

  const handleMapPress = () => {
    navigation.navigate('TripMap')
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Trip Plan</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollview} scrollEnabled={scroll}>
          {all_data.map(day =>
            <>
              <View style={styles.datemap}>
                <Text style={styles.date}>{day.date}</Text>
                <TouchableHighlight
                  onPress={handleMapPress}
                  underlayColor='transparent'
                >
                  <View>
                    <Icon
                      name={'md-map'}
                      size={35}
                      color="green"
                      type="ionicon"
                    />
                  </View>
                </TouchableHighlight>
              </View>
              <SortableList
                style={styles.list}
                contentContainerStyle={styles.contentContainer}
                data={day.data}
                renderRow={_renderRow}
                onActivateRow={() => setScroll(false)}
                onReleaseRow={() => setScroll(true)}
              />
            </>
          )}
        </ScrollView>
      </View>
    </Background>
  )
};

export default TripPlan;
