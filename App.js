/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Platform, ImageBackground, StatusBar } from "react-native";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { AppContainer } from "./src/tabNavigation/TabNavigationWrapper";
import { GRADIENT_BG_IMAGE } from "./src/common/Common";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon
} from "./assets/style/stylesCommonValues";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  render() {
    return (
      <ImageBackground
        source={GRADIENT_BG_IMAGE}
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent" //{styleCommon.primaryColor}
          translucent={true}
        />
        {changeNavigationBarColor(styleCommon.primaryButtonColor, true)}
        <AppContainer />
      </ImageBackground>
    );
  }
}
