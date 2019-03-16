import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RadioForm from "react-native-simple-radio-button";
import { Dropdown } from "react-native-material-dropdown";
import NumericInput from "react-native-numeric-input";
import { styles } from "../../assets/style/stylesDietGoalPlan";
import { getPossibleTargetWeights } from "./Algorithm/DietAlgorithm";
import { f, database } from "./../common/FirebaseConfig";
import { convertProgramToWeeks } from "../common/Common";

export default class DietGoalPlan extends Component {
  constructor(props) {
    super(props);
    const {
      goal,
      program,
      meals,
      currentWeight,
      targetWeight,
      screenName
    } = props;
    this.state = {
      user: {},
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

  componentDidMount = async () => {
    const currentUser = await f.auth().currentUser;
    console.log("The user details here: " + currentUser);
    database
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

  onGoalChange = value => {
    this.setState({
      selectedGoal: value
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

  onBackClick = () => {
    const {
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight
    } = this.state;
    const { saveDietGoalsPlusBack } = this.props;
    saveDietGoalsPlusBack({
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      targetWeight,
      progress: false
    });
  };

  getTargetWeightOptions = () => {
    const targetWeightOptions = [];
    const { selectedGoal, selectedProgram, currentWeight } = this.state;
    if (selectedGoal && selectedProgram) {
      getPossibleTargetWeights(
        selectedGoal,
        convertProgramToWeeks(selectedProgram),
        currentWeight,
        2
      ).map(targetWeight => {
        targetWeightOptions.push({
          label: `${targetWeight} kg`,
          value: targetWeight
        });
      });
    }
    return targetWeightOptions;
  };

  render() {
    const goalDefaultValue = "Choose Goal !";
    const programDefaultValue = "Choose Program !";
    const mealsDefaultValue = "Choose Meals per day !";
    const targetWeightOptions = this.getTargetWeightOptions();
    const {
      selectedGoal,
      selectedProgram,
      selectedMeals,
      currentWeight,
      goals,
      programs,
      mealOptions
    } = this.state;
    const { screenName } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <Text style={styles.titleContainer}>Getting started...</Text>
          <Text style={styles.textContainer}>
            Hi, {screenName} Please choose your preferences
          </Text>
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
          {targetWeightOptions.length > 0 && (
            <View>
              <Text
                style={{
                  justifyContent: "center",
                  marginVertical: 15,
                  fontSize: 16
                }}
              >
                Target weight:
              </Text>
              <RadioForm
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
              />
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
