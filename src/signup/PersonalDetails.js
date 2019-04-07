import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  UIManager,
  View
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import NumberPicker from "../components/Picker/NumberPicker";
import TargetWeightTimeline from "./TargetWeightTimeline";
import {
  MIN_DATE,
  MAX_DATE,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_WEIGHT,
  MAX_WEIGHT,
  WEIGHT_RANGE_FINAL,
  HEIGHT_RANGE_FINAL
} from "../common/Common";
import {
  ICON_SIZE,
  ICON_SIZE_LARGE
} from "../../assets/style/stylesCommonValues";
import { styles } from "../../assets/style/stylesPersonalDetails";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDTPickerVisible: false,
      isWeightNumPickerVisible: false,
      isHeightNumPickerVisible: false,
      isTargetWeightTimelineVisible: false
    };
  }
  showDTPicker = () => {
    this.setState({ isDTPickerVisible: true });
  };
  showWeightNumPicker = () => {
    this.setState({ isWeightNumPickerVisible: true });
  };
  showHeightNumPicker = () => {
    this.setState({ isHeightNumPickerVisible: true });
  };
  showTargetWeightTimeline = () => {
    this.setState({ isTargetWeightTimelineVisible: true });
  };
  hideDTPicker = () => {
    this.setState({ isDTPickerVisible: false });
  };
  hideWeightNumPicker = () => {
    this.setState({ isWeightNumPickerVisible: false });
  };
  hideHeightNumPicker = () => {
    this.setState({ isHeightNumPickerVisible: false });
  };
  hideTargetWeightTimeline = () => {
    this.setState({ isTargetWeightTimelineVisible: false });
  };
  handleDTPicker = date => {
    let currentDate = new Date();
    let dateFormat = new Date(date);
    let newDate = dateFormat.toDateString().substring(4);
    let ageFromDate = currentDate.getFullYear() - dateFormat.getFullYear();
    this.props.setDob(newDate, ageFromDate);
    this.hideDTPicker();
  };
  handleNumPickerForWeight = number => {
    this.props.setWeight(number);
    this.hideWeightNumPicker();
  };
  handleNumPickerForHeight = number => {
    this.props.setHeight(number);
    this.hideHeightNumPicker();
  };
  handleTargetWeightAndProgram = (targetWeight, program) => {
    this.props.setTargetWeightAndProgram(targetWeight, program);
    this.hideTargetWeightTimeline();
  };

  render() {
    const {
      goal,
      gender,
      fitnessLevel,
      dob,
      weight,
      height,
      program,
      programs,
      targetWeight,
      showTargetWeightButton
    } = this.props;
    const {
      isDTPickerVisible,
      isWeightNumPickerVisible,
      isHeightNumPickerVisible,
      isTargetWeightTimelineVisible
    } = this.state;
    console.log(
      goal,
      gender,
      fitnessLevel,
      height,
      weight,
      dob,
      showTargetWeightButton
    );
    return (
      <View style={styles.mainContent}>
        <KeyboardAvoidingView behaviour="position">
          <View style={styles.inputOuterViewContainer}>
            <TouchableOpacity>
              <DateTimePicker
                mode="date"
                minimumDate={MIN_DATE}
                maximumDate={MAX_DATE}
                isVisible={isDTPickerVisible}
                onConfirm={this.handleDTPicker}
                onCancel={this.hideDTPicker}
              />
              <Button
                title={dob.length === 0 ? "Your Birthday" : dob}
                buttonStyle={
                  dob.length === 0
                    ? styles.buttonStyle
                    : styles.activeButtonStyle
                }
                titleStyle={
                  dob.length === 0
                    ? styles.buttonTitle
                    : styles.activeButtonTitle
                }
                icon={
                  <Icon
                    name="cake-variant"
                    style={
                      dob.length === 0
                        ? styles.buttonIcon
                        : styles.activeButtonIcon
                    }
                    size={dob.length === 0 ? ICON_SIZE : ICON_SIZE_LARGE}
                  />
                }
                onPress={this.showDTPicker}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <NumberPicker
                minNumber={MIN_WEIGHT}
                maxNumber={MAX_WEIGHT}
                unit="kilograms"
                numberArray={WEIGHT_RANGE_FINAL}
                isVisible={isWeightNumPickerVisible}
                onConfirm={this.handleNumPickerForWeight}
                onCancel={this.hideWeightNumPicker}
              />
              <Button
                title={weight === undefined ? "Your Weight" : weight + " kgs"}
                buttonStyle={
                  weight === undefined
                    ? styles.buttonStyle
                    : styles.activeButtonStyle
                }
                titleStyle={
                  weight === undefined
                    ? styles.buttonTitle
                    : styles.activeButtonTitle
                }
                icon={
                  <Icon
                    name="scale-bathroom"
                    style={
                      weight === undefined
                        ? styles.buttonIcon
                        : styles.activeButtonIcon
                    }
                    size={ICON_SIZE}
                  />
                }
                onPress={this.showWeightNumPicker}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <NumberPicker
                minNumber={MIN_HEIGHT}
                maxNumber={MAX_HEIGHT}
                unit="centimeters"
                numberArray={HEIGHT_RANGE_FINAL}
                isVisible={isHeightNumPickerVisible}
                onConfirm={this.handleNumPickerForHeight}
                onCancel={this.hideHeightNumPicker}
              />
              <Button
                title={height === undefined ? "Your Height" : height + " cms"}
                buttonStyle={
                  height === undefined
                    ? styles.buttonStyle
                    : styles.activeButtonStyle
                }
                titleStyle={
                  height === undefined
                    ? styles.buttonTitle
                    : styles.activeButtonTitle
                }
                icon={
                  <Icon
                    name="ruler"
                    style={
                      height === undefined
                        ? styles.buttonIcon
                        : styles.activeButtonIcon
                    }
                    size={ICON_SIZE}
                  />
                }
                onPress={this.showHeightNumPicker}
              />
            </TouchableOpacity>
            {showTargetWeightButton && (
              <TouchableOpacity>
                <TargetWeightTimeline
                  isVisible={isTargetWeightTimelineVisible}
                  goal={goal}
                  fitnessLevel={fitnessLevel}
                  weight={weight}
                  programs={programs}
                  program={program}
                  targetWeight={targetWeight}
                  onConfirm={this.handleTargetWeightAndProgram}
                  onClose={this.hideTargetWeightTimeline}
                />
                <Button
                  title={
                    targetWeight === undefined
                      ? "Your Target Weight"
                      : targetWeight + " kgs"
                  }
                  buttonStyle={
                    targetWeight === undefined
                      ? styles.buttonStyle
                      : styles.activeButtonStyle
                  }
                  titleStyle={
                    targetWeight === undefined
                      ? styles.buttonTitle
                      : styles.activeButtonTitle
                  }
                  icon
                  icon={
                    <Icon
                      name="bullseye-arrow"
                      style={
                        targetWeight === undefined
                          ? styles.buttonIcon
                          : styles.activeButtonIcon
                      }
                      size={ICON_SIZE}
                    />
                  }
                  onPress={this.showTargetWeightTimeline}
                />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
