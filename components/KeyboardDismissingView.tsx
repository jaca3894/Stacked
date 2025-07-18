import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

interface KeyboardDismissingViewProps {
  children: React.ReactNode;
  style?: object;
}

const KeyboardDismissingView = ({ children, style }: KeyboardDismissingViewProps) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={style}>
      {children}
    </View>
  </TouchableWithoutFeedback>
);

export default KeyboardDismissingView;