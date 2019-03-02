import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dropdown } from "react-native-material-dropdown";
import NumericInput from "react-native-numeric-input";
import { styles } from "../../assets/style/stylesDietGoalPlan";

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
    console.log(goal, program);
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
      mealOptions,
      navigation
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.viewContainer}>
          <Text style={styles.titleContainer}>Getting started...</Text>
        </View>
        <View style={styles.viewDDContainer}>
          <Dropdown
            label={goalDefaultValue}
            data={goals}
            baseColor={styles.dropdownBaseColor.color}
            containerStyle={styles.dropdownContainer}
            pickerStyle={styles.dropdownPickerStyle}
            dropdownOffset={styles.dropdownOffset}
            onChangeText={this.onGoalChange}
            value={selectedGoal}
          />
          <Dropdown
            label={programDefaultValue}
            data={programs}
            baseColor={styles.dropdownBaseColor.color}
            containerStyle={styles.dropdownContainer}
            pickerStyle={styles.dropdownPickerStyle}
            dropdownOffset={styles.dropdownOffset}
            onChangeText={this.onProgramChange}
            value={selectedProgram}
          />
          <Dropdown
            label={mealsDefaultValue}
            data={mealOptions}
            baseColor={styles.dropdownBaseColor.color}
            containerStyle={styles.dropdownContainer}
            pickerStyle={styles.dropdownPickerStyle}
            dropdownOffset={styles.dropdownOffset}
            onChangeText={this.onMealsChange}
            value={selectedMeals}
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
              iconStyle={{ color: "white" }}
              step={1.5}
              valueType="integer"
              rounded
              textColor="black"
              rightButtonBackgroundColor="#00DB8D"
              leftButtonBackgroundColor="#00DB8D"
              containerStyle={styles.numberPickerContainer}
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
              iconStyle={{ color: "white" }}
              step={1.5}
              valueType="integer"
              rounded
              textColor="black"
              rightButtonBackgroundColor="#00DB8D"
              leftButtonBackgroundColor="#00DB8D"
              containerStyle={styles.numberPickerContainer}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <Button
            title="NEXT"
            containerStyle={styles.nextButtonContainerStyle}
            buttonStyle={styles.nextButtonStyle}
            titleStyle={styles.nextButtonTitleStyle}
            icon={
              <Icon
                name="arrow-right-thick"
                size={20}
                style={{ color: "white" }}
              />
            }
            iconRight={true}
            onPress={() => this.onNextClick()}
          />
        </View>
      </View>
    );
  }
}