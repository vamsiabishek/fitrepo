import React, { Component } from "react";
import { View } from "react-native";
import VerticalSelectView from "./VerticalSelectView";
import { styles } from "../../assets/style/stylesFitnessLevel";

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
