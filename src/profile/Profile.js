import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../../assets/style/stylesProfileScreen";

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.textContainer}>Profile Screen</Text>
      </View>
    );
  }
}
