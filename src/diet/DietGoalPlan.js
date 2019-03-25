import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Input, Button, ButtonGroup } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RadioForm from "react-native-simple-radio-button";
import { Dropdown } from "react-native-material-dropdown";
import NumericInput from "react-native-numeric-input";
import { styles } from "../../assets/style/stylesDietGoalPlan";
import { getPossibleTargetWeights } from "./Algorithm/DietAlgorithm";
import { f, database } from "./../common/FirebaseConfig";
import { convertProgramToWeeks } from "../common/Common";
import HorizontalSelectView from "../components/HorizontalSelectView";

export default class DietGoalPlan extends Component {
  constructor(props) {
    super(props);
    const {
      goal,
      program,
      meals,
      currentWeight,
      targetWeight,
      targetWeightIndex,
      screenName
    } = props;
    this.state = {
      user: {},
      selectedVegIndex: 1,
      targetWeightIndex,
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
      programs: [4, 8, 12],
      mealOptions: [3, 4, 5, 6],
      targetWeightChanged: false
    };
    this.targetWeightLabels = [];
    this.targetWeightOptions = [];
  }

  componentDidMount = async () => {
    const currentUser = await f.auth().currentUser;
    console.log("The user details here: " + currentUser);
    await database
      .ref("users")
      .child(currentUser.uid)
      .once("value")
      .then(snapshot => {
        const user = snapshot.val(); 
        this.setState({ user, currentWeight: user.weight });
      })
      .catch(error => {
        console.log(
          "error while fetching user details in DietGoalPlan:",
          error
        );
      });
  };

  componentDidUpdate = () => {
    let { targetWeight, targetWeightIndex } = this.state;
    if(this.targetWeightOptions.length > 0){
      const newTargetWeight = this.targetWeightOptions[targetWeightIndex]
      if(newTargetWeight !== targetWeight)
        this.setState({
          targetWeight: newTargetWeight,
        })
    }
  }

  onGoalChange = value => {
    this.setState({
      selectedGoal: value
    });
  };

  onProgramChange = value => {
    this.setState({
      selectedProgram: value,
      //targetWeight: this.calculateTargetWeight({ program: value })
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
      if (goal === 0) {
        //fat-loss
        targetWeight = targetWeight - 3;
        if (program === 4) targetWeight = targetWeight + 1;
        else if (program === 8) targetWeight = targetWeight;
        else if (program === 12) targetWeight = targetWeight - 2;
      } else if (goal === 1) {
        //weight gain
        console.log("inside weight gain", targetWeight);
        targetWeight = targetWeight + 3;
        if (program === 4) targetWeight = targetWeight - 1;
        else if (program === 8) targetWeight = targetWeight;
        else if (program === 12) targetWeight = targetWeight + 1;
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
      targetWeight,
      targetWeightIndex,
    } = this.state;
    console.log('state:', this.state)
    this.props.setDietGoals({
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight,
      targetWeightIndex,
      progress: true
    });
  };

  onBackClick = () => {
    const {
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight,
      targetWeightIndex,
    } = this.state;
    const { saveDietGoalsPlusBack } = this.props;
    saveDietGoalsPlusBack({
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight,
      targetWeightIndex,
      progress: false
    });
  };

  getTargetWeightOptions = () => {
    this.targetWeightOptions = [];
    this.targetWeightLabels = [];
    const { selectedGoal, selectedProgram, currentWeight } = this.state;
    getPossibleTargetWeights(
      selectedGoal,
      selectedProgram,
      currentWeight,
      2
    ).map(targetWeight => {
      this.targetWeightLabels.push(`${targetWeight} kg`);
      this.targetWeightOptions.push(targetWeight);
    });
  };

  updateVegIndex = selectedVegIndex => {
    this.setState({ selectedVegIndex });
  };

  updateGoal = selectedGoal => {
    this.setState({ selectedGoal });
  };

  updateTargetWeight = targetWeightIndex => {
    this.setState({
      targetWeightIndex,
      targetWeight: this.targetWeightOptions[targetWeightIndex]
    });
  };

  render() {
    const goalLabelValue = "Your Goal";
    const programLabelValue = "Program: ";
    const mealsLabelValue = "Meals: ";
    this.getTargetWeightOptions();
    const {
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      goals,
      programs,
      mealOptions,
      selectedVegIndex,
      targetWeightIndex
    } = this.state;
    const { screenName } = this.props;

    const buttons = ["Vegetarian", "Non Vegetarian"];

    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <Text style={styles.titleContainer}>Getting started...</Text>
        </View>
        <View style={styles.viewDDContainer}>
          <ButtonGroup
            onPress={this.updateVegIndex}
            selectedIndex={selectedVegIndex}
            buttons={buttons}
            containerStyle={styles.vegButtonGroup}
            innerBorderStyle={{ width: 0 }}
            selectedButtonStyle={
              selectedVegIndex === 0 ? styles.veg : styles.nonVeg
            }
            textStyle={{ fontSize: 12, color: "lightgrey" }}
          />
          <View style={styles.dropdownContainer}>
            <Text style={styles.labelText}> {goalLabelValue} </Text>
            <ButtonGroup
              onPress={this.updateGoal}
              selectedIndex={selectedGoal}
              buttons={["Fat-Loss", "Weight-Gain"]}
              containerStyle={styles.goalButtonGroup}
              innerBorderStyle={{ width: 0 }}
              selectedButtonStyle={styles.selectedButtonStyle}
              textStyle={{ color: "lightgrey" }}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}> {programLabelValue} </Text>
              <Text style={styles.selectedOptionLabel}>
                {" "}
                {selectedProgram} Week Program{" "}
              </Text>
            </View>
            <HorizontalSelectView
              items={programs}
              selectedItem={selectedProgram}
              onSelectionChange={this.onProgramChange}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}> {mealsLabelValue} </Text>
              <Text style={styles.selectedOptionLabel}>
                {" "}
                {selectedMeals} Meals per day{" "}
              </Text>
            </View>
            <HorizontalSelectView
              items={mealOptions}
              selectedItem={selectedMeals}
              onSelectionChange={this.onMealsChange}
            />
          </View>
          <View style={styles.weightContainer}>
            <Text style={styles.labelText}>Current weight:</Text>
            <View style={styles.numericInputContainer}>
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
                textColor="lightgrey"
                rightButtonBackgroundColor="#00DB8D"
                leftButtonBackgroundColor="#00DB8D"
                containerStyle={styles.numberPickerContainer}
              />
            </View>
          </View>
          {this.targetWeightOptions.length > 0 && (
            <View style={styles.dropdownContainer}>
              <Text style={styles.labelText}>Target weight:</Text>
              <ButtonGroup
                onPress={this.updateTargetWeight}
                selectedIndex={targetWeightIndex}
                buttons={this.targetWeightLabels}
                containerStyle={styles.buttonGroupStyle}
                innerBorderStyle={{ width: 0 }}
                selectedButtonStyle={styles.selectedButtonStyle}
                textStyle={{ color: "lightgrey" }}
              />
              {/* <RadioForm
                radio_props={targetWeightOptions}
                ref="radioForm"
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={"#00DB8D"}
                animation={true}
                radioStyle={{ paddingRight: 10 }}
                onPress={value => {
                  this.setState({ targetWeight: value });
                }}
              /> */}
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="BACK"
            containerStyle={styles.nextButtonContainerStyle}
            buttonStyle={styles.nextButtonStyle}
            titleStyle={styles.nextButtonTitleStyle}
            icon={
              <Icon
                name="arrow-left-thick"
                size={20}
                style={{ color: "white" }}
              />
            }
            iconLeft={true}
            onPress={() => this.onBackClick()}
          />
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
