import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions
} from "react-native";
import { Input, Button } from "react-native-elements";
import DietGoalPlan from "./DietGoalPlan";
import SelectFoodSources from "./SelectFoodSources";

export default class Diet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionLevel: 1,
      totalLevels: 2,
      selectedProteinSources: [],
      selectedFatSources: [],
      selectedCarbSources: []
    };
  }

  changeSelectionLevel = progress => {
    const { selectionLevel, totalLevels } = this.state;
    const nextLevel = progress ? selectionLevel + 1 : selectionLevel - 1;
    if (nextLevel > 0 && nextLevel <= totalLevels) {
      this.setState({ selectionLevel: nextLevel });
    }
  };

  render() {
    const {
      selectionLevel,
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources
    } = this.state;
    return (
      <View style={styles.container}>
        {selectionLevel === 1 && (
          <DietGoalPlan onLevelChange={this.changeSelectionLevel} />
        )}
        {selectionLevel === 2 && (
          <SelectFoodSources
            onLevelChange={this.changeSelectionLevel}
            selectedProteins={selectedProteinSources}
            selectedFats={selectedFatSources}
            selectedCarbs={selectedCarbSources}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
