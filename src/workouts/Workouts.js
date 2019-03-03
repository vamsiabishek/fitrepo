import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../../assets/style/stylesWorkoutsScreen";

export default class Workouts extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.textContainer}>Workouts Screen</Text>
      </View>
    );
  }
}
