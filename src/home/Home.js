import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../../assets/style/stylesHomeScreen";

export default class Home extends Component {
  render() {
    const { nameOfUser } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.textContainer}>
          Welcome to Home Screen, {nameOfUser}
        </Text>
      </View>
    );
  }
}
