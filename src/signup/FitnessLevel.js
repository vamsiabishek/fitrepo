import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import VerticalSelectView from "./VerticalSelectView"

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    //marginTop: 50
  },
});

export default class FitnessLevel extends Component {
  render() {
    const { gender, setGender } = this.props;
    return (
      <View style={styles.mainContent}>
        <VerticalSelectView items={[1,2,3]}/>
      </View>
    );
  }
}
