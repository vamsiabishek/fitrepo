/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {AppContainer} from './src/tabNavigation/TabNavigationWrapper';
import {GRADIENT_BG_IMAGE} from './src/common/Common';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
} from './assets/style/stylesCommonValues';

const App = () => {
  return (
    <ImageBackground
      source={GRADIENT_BG_IMAGE}
      style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent" //{styleCommon.primaryColor}
        translucent={true}
      />
      {changeNavigationBarColor(styleCommon.primaryButtonColor, true)}
      <AppContainer />
    </ImageBackground>
  );
};

export default App;
