import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import DietGoalPlan from "./DietGoalPlan";
import SelectFoodSources from "./SelectFoodSources";
import { styles } from "../../assets/style/stylesCreateDiet";

export default class CreateDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionLevel: 1,
      totalLevels: 2,
      selectedProteinSources: [],
      selectedFatSources: [],
      selectedCarbSources: [],
      selectedGoal: "",
      seletedProgram: "",
      selectedMeals: "",
      currentWeight: 75,
      targetWeight: 75
    };
  }

  changeSelectionLevel = progress => {
    const { selectionLevel, totalLevels } = this.state;
    const nextLevel = progress ? selectionLevel + 1 : selectionLevel - 1;
    if (nextLevel > 0 && nextLevel <= totalLevels) {
      this.setState({ selectionLevel: nextLevel });
    }
  };

  setSelectedSources = ({
    selectedProteinSources,
    selectedFatSources,
    selectedCarbSources,
    progress
  }) => {
    this.setState({
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources
    });
    this.changeSelectionLevel(progress);
  };

  setDietGoals = ({
    selectedGoal,
    selectedProgram,
    currentWeight,
    targetWeight,
    selectedMeals,
    progress
  }) => {
    this.setState({
      selectedGoal,
      selectedProgram,
      currentWeight,
      targetWeight,
      selectedMeals
    });
    this.changeSelectionLevel(progress);
  };

  createDiet = ({
    selectedProteinSources,
    selectedFatSources,
    selectedCarbSources
  }) => {
    this.setState({
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources
    });
    this.props.navigation.navigate("MyDiet");
  };

  render() {
    const {
      selectionLevel,
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources,
      selectedGoal,
      selectedProgram,
      currentWeight,
      targetWeight,
      selectedMeals
    } = this.state;
    return (
      <View style={styles.container}>
        {selectionLevel === 1 && (
          <DietGoalPlan
            onLevelChange={this.changeSelectionLevel}
            goal={selectedGoal}
            program={selectedProgram}
            currentWeight={currentWeight}
            targetWeight={targetWeight}
            meals={selectedMeals}
            setDietGoals={this.setDietGoals}
          />
        )}
        {selectionLevel === 2 && (
          <SelectFoodSources
            selectedProteins={selectedProteinSources}
            selectedFats={selectedFatSources}
            selectedCarbs={selectedCarbSources}
            setSelectedSources={this.setSelectedSources}
            createDiet={this.createDiet}
          />
        )}
      </View>
    );
  }
}
