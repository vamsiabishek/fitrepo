import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import NumericInput from "react-native-numeric-input";

export default class DietGoalPlan extends Component {
  constructor(props) {
    super(props);
    const { goal, program, meals, currentWeight, targetWeight } = props;
    this.state = {
      selectedGoal: goal,
      selectedProgram: program,
      selectedMeals: meals,
      currentWeight,
      targetWeight,
      goals: [
        {
          value: "Fat-loss",
          id: "fat-loss"
        },
        {
          value: "Weight-gain",
          id: "weight-gain"
        }
      ],
      programs: [
        { value: "4 Week Program", id: "4-week" },
        { value: "8 Week Program", id: "8week" },
        { value: "12 Week Program", id: "12weel" }
      ],
      mealOptions: [
        { value: "3 meals / day", id: "3meals" },
        { value: "4 meals / day", id: "4meals" },
        { value: "5 meals / day", id: "5meals" },
        { value: "6 meals / day", id: "6meals" }
      ],
      targetWeightChanged: false
    };
  }

  onGoalChange = value => {
    this.setState({
      selectedGoal: value,
      targetWeight: this.calculateTargetWeight({ goal: value })
    });
  };

  onProgramChange = value => {
    this.setState({
      selectedProgram: value,
      targetWeight: this.calculateTargetWeight({ program: value })
    });
  };

  onMealsChange = value => {
    this.setState({
      selectedMeals: value
    });
  };

  calculateTargetWeight = ({ goal, program }) => {
    const { targetWeightChanged, selectedGoal, selectedProgram } = this.state;
    let { currentWeight: targetWeight } = this.state;
    if (!goal) goal = selectedGoal;
    if (!program) program = selectedProgram;
    console.log(goal,program);
    if (!targetWeightChanged) {
      if (goal === "Fat-loss") {
        targetWeight = targetWeight - 3;
        if (program === "4 Week Program") targetWeight = targetWeight + 1;
        else if (program === "8 Week Program") targetWeight = targetWeight;
        else if (program === "12 Week Program") targetWeight = targetWeight - 2;
      } else if (goal === "Weight-gain") {
        console.log("inside weight gain", targetWeight);
        targetWeight = targetWeight + 3;
        if (program === "4 Week Program") targetWeight = targetWeight - 1;
        else if (program === "8 Week Program") targetWeight = targetWeight;
        else if (program === "12 Week Program") targetWeight = targetWeight + 1;
      }
    }
    console.log("targetWeight:", targetWeight);
    return targetWeight;
  };

  onNextClick = () => {
    const {
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight
    } = this.state;
    this.props.setDietGoals({
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight,
      progress: true
    });
  };

  render() {
    const goalDefaultValue = "Choose Goal !";
    const programDefaultValue = "Choose Program !";
    const mealsDefaultValue = "Choose Meals per day !";
    const {
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight,
      goals,
      programs,
      mealOptions
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyCentent: "center",
            alignItems: "center",
            marginTop: 50,
            marginBottom: 20
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              fontStyle: "italic",
              color: "grey"
            }}
          >
            Getting started...
          </Text>
        </View>
        <Dropdown
          label={goalDefaultValue}
          data={goals}
          containerStyle={styles.dropdown}
          dropdownOffset={{ top: 20, left: 0 }}
          onChangeText={this.onGoalChange}
          value={selectedGoal}
        />
        <Dropdown
          label={programDefaultValue}
          data={programs}
          containerStyle={styles.dropdown}
          dropdownOffset={{ top: 20, bottom: 20, left: 0 }}
          onChangeText={this.onProgramChange}
          value={selectedProgram}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Current weight:</Text>
          <NumericInput
            value={currentWeight}
            onChange={value => this.setState({ currentWeight: value })}
            initValue={currentWeight}
            totalWidth={80}
            totalHeight={40}
            iconSize={25}
            step={1.5}
            valueType="integer"
            rounded
            textColor="black"
            iconStyle={{ color: "white" }}
            rightButtonBackgroundColor="#58D68D"
            leftButtonBackgroundColor="#58D68D"
            containerStyle={styles.numberPicker}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Target weight:</Text>
          <NumericInput
            value={targetWeight}
            onChange={value => this.setState({ targetWeight: value })}
            initValue={targetWeight}
            totalWidth={80}
            totalHeight={40}
            iconSize={25}
            step={1.5}
            valueType="integer"
            rounded
            textColor="black"
            iconStyle={{ color: "white" }}
            rightButtonBackgroundColor="#EC7063"
            leftButtonBackgroundColor="#EC7063"
            containerStyle={styles.numberPicker}
          />
        </View>
        <Dropdown
          label={mealsDefaultValue}
          data={mealOptions}
          containerStyle={styles.dropdown}
          dropdownOffset={{ top: 20, bottom: 20, left: 0 }}
          onChangeText={this.onMealsChange}
          value={selectedMeals}
        />
        <View style={{ flex: 1, marginTop: 40 }}>
          <Button
            title="Next"
            titleStyle={{ fontWeight: "bold", fontSize: 18 }}
            buttonStyle={{
              borderWidth: 0,
              borderColor: "transparent",
              borderRadius: 20,
              paddingHorizontal: 15,
              opacity: 0.7
            }}
            containerStyle={{
              marginVertical: 10,
              marginHorizontal: 20,
              height: 40,
              justifyContent: "center",
              alignItems: "flex-end"
            }}
            icon={{
              name: "arrow-right",
              type: "font-awesome",
              size: 15,
              color: "white"
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 5 }}
            onPress={() => this.onNextClick()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdown: {
    width: 300,
    padding: 10
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "space-between",
    marginHorizontal: 30
  },
  inputLabel: {
    marginVertical: 15,
    marginHorizontal: 10,
    fontSize: 16
  },
  numberPicker: {
    marginRight: 20
  }
});
