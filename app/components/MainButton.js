import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.50,
  },
  gradient: {
    justifyContent: 'center',
    alignItems:'center',
    padding: 10,
    borderRadius: 20
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});

const MainButton = (props) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={props.handlePress}>
      <LinearGradient
        colors={['#E51B23', '#FF6363']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.text}>{props.text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

export default MainButton;
