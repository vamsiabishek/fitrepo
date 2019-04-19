import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground
} from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../../assets/style/stylesSupplementsScreen";
import { GRADIENT_BG_IMAGE } from "../common/Common";

export default class Supplements extends Component {
  render() {
    return (
      <ImageBackground source={GRADIENT_BG_IMAGE} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.textContainer}>Supplements Screen</Text>
      </ImageBackground>
    );
  }
}
