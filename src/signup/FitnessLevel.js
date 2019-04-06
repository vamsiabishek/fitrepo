import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import VerticalSelectView from "./VerticalSelectView";

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default class FitnessLevel extends Component {
  render() {
    const { gender, levels, selectedLevel, setFitnessLevel } = this.props;
    return (
      <View style={styles.mainContent}>
        <VerticalSelectView
          gender={gender}
          levels={levels}
          selectedLevel={selectedLevel}
          setFitnessLevel={setFitnessLevel}
        />
      </View>
    );
  }
}
