import React, { useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-fontsrc';

const App = () => {
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Nunito-ExtraBold': require('./src/components/subatoms/fonts/fonts files/Nunito-Extrabold.ttf'),
      });

      Text.defaultProps.style.fontFamily = 'Nunito-ExtraBold';
    }

    loadFont();
  }, []);

  return (
    <Text>Hello, world!</Text>
  );
};

export default font;