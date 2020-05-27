import React from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements';

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
