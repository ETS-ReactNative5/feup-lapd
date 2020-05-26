import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

// https://react-native-elements.github.io/react-native-elements/docs/overlay.html

const OverlayCard = (props) => (
  <View>
    <Overlay overlayStyle={{borderRadius: 20, width: props.width || "85%", height: props.height || "60%"}} isVisible={props.visible} onBackdropPress={props.toogleOverlay}>
      <View>
        {props.children}
      </View>
    </Overlay>
  </View>
);

export default OverlayCard;
