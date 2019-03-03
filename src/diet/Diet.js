import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import { styles } from "../../assets/style/stylesDietScreen";

export default class Diet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.viewContainer}>
          <Text style={styles.titleContainer}>Your Diet Plans..</Text>
        </View>
      </View>
    );
  }
}
