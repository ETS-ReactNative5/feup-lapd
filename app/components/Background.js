import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    display: "flex"
  }
});

const Background = (props) => (
  <ImageBackground
    source={require('../assets/background.png')}
    style={styles.container}
    imageStyle= {{opacity:0.7}}
    resizeMode="cover"
  >
    {props.children}
  </ImageBackground>
);

export default Background;
