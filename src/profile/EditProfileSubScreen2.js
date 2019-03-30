import React, { Component } from "react";
import {
  LayoutAnimation,
  KeyboardAvoidingView,
  Text,
  UIManager,
  View
} from "react-native";
import { Button } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import NumericInput from "react-native-numeric-input";
import { styles } from "../../assets/style/stylesEditProfileScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ICON_SIZE,
  ICON_SIZE_MED,
  MIN_WEIGHT,
  MAX_WEIGHT,
  MIN_HEIGHT,
  MAX_HEIGHT,
  BUTTON_SIZE,
  BUTTON_OUTER_SIZE,
  LEVELS_OPTIONS,
  FOOD_PREFERENCES_OPTIONS,
  NUMERIC_INPUT_WIDTH,
  NUMERIC_INPUT_HEIGHT
} from "../common/Common";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class EditProfileSubScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: props.userDets,
      weightValid: true,
      errorMsgWeight: "",
      heightValid: true,
      errorMsgHeight: "",
      levels: LEVELS_OPTIONS,
      levelValid: true,
      foodPreferences: FOOD_PREFERENCES_OPTIONS,
      foodPreferenceValid: true
    };
  }

  validateWeight = () => {
    const { weight } = this.state.user;
    if (weight !== 0) {
      const weightValid =
        (weight > MIN_WEIGHT || weight === MIN_WEIGHT) &&
        (weight < MAX_WEIGHT || weight === MAX_WEIGHT);
      const errorMsgWeight =
        "Weight should be between " + MIN_WEIGHT + " & " + MAX_WEIGHT + " kgs!";
      this.setState({ weightValid, errorMsgWeight });
      return weightValid;
    } else {
      const weightValid = weight > 0 && weight !== 0;
      const errorMsgWeight = "Please select a value!";
      this.setState({ weightValid, errorMsgWeight });
      return weightValid;
    }
  };
  validateHeight = () => {
    const { height } = this.state.user;
    if (height !== 0) {
      const heightValid =
        (height > MIN_HEIGHT || height === MIN_HEIGHT) &&
        (height < MAX_HEIGHT || height === MAX_HEIGHT);
      const errorMsgHeight =
        "Height should be between " + MIN_HEIGHT + " & " + MAX_HEIGHT + " cms!";
      this.setState({ heightValid, errorMsgHeight });
      return heightValid;
    } else {
      const heightValid = height > 0 && height !== 0;
      const errorMsgHeight = "Please select a value!";
      this.setState({ heightValid, errorMsgHeight });
      return heightValid;
    }
  };
  validateLevel = () => {
    const { level } = this.state.user;
    const levelValid = level.length > 0;
    this.setState({ levelValid });
    return levelValid;
  };
  validateFoodPreference = () => {
    const { foodPreference } = this.state.user;
    const foodPreferenceValid = foodPreference.length > 0;
    this.setState({ foodPreferenceValid });
    return foodPreferenceValid;
  };
  goToProfile = () => {
    LayoutAnimation.easeInEaseOut();
    let { user } = this.state;
    const { weight, height, level, foodPreference } = this.state.user;
    const weightValid = this.validateWeight();
    const heightValid = this.validateHeight();
    const levelValid = this.validateLevel();
    const foodPreferenceValid = this.validateFoodPreference();
    if (weightValid && heightValid && levelValid && foodPreferenceValid) {
      const setUserPartial = {
        weight,
        height,
        level,
        foodPreference
      };
      this.props.setSubScreenUserVals(setUserPartial);
    }
  };
  render() {
    const {
      isLoading,
      user,
      weightValid,
      errorMsgWeight,
      heightValid,
      errorMsgHeight,
      levels,
      levelValid,
      foodPreferences,
      foodPreferenceValid
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.scrollViewContainerStyle}>
            <KeyboardAvoidingView
              behaviour="position"
              contentContainerStyle={styles.formContainer}
            >
              <View style={styles.inputOuterViewContainer}>
                <View style={styles.numericInputButtonView}>
                  <View styles={styles.numericInputButtonTextIconStyle}>
                    <View style={styles.numericInputButtonTextStyle}>
                      <Icon
                        name="weight-kilogram"
                        size={ICON_SIZE}
                        style={styles.numericInputButtonIconStyle}
                      />
                      <Text style={styles.numericInputButtonText}>Weight</Text>
                    </View>
                  </View>
                  <NumericInput
                    value={user.weight}
                    initValue={user.weight}
                    minValue={MIN_WEIGHT}
                    maxValue={MAX_WEIGHT}
                    onChange={weight =>
                      this.setState({ user: { ...user, weight } })
                    }
                    totalWidth={NUMERIC_INPUT_WIDTH}
                    totalHeight={NUMERIC_INPUT_HEIGHT}
                    iconSize={ICON_SIZE}
                    iconStyle={styles.numberPickerIconStyle}
                    step={1.5}
                    valueType="integer"
                    rounded
                    containerStyle={styles.numberPickerContainer}
                    textColor={styles.numberPickerButtonDes.color}
                    rightButtonBackgroundColor={
                      styles.numberPickerButtonDes.backgroundColor
                    }
                    leftButtonBackgroundColor={
                      styles.numberPickerButtonDes.backgroundColor
                    }
                  />
                </View>
                {weightValid ? null : (
                  <Text style={styles.errorInputStyle}>{errorMsgWeight}</Text>
                )}

                <View style={styles.numericInputButtonView}>
                  <View styles={styles.numericInputButtonTextIconStyle}>
                    <View style={styles.numericInputButtonTextStyle}>
                      <Icon
                        name="ruler"
                        size={ICON_SIZE}
                        style={styles.numericInputButtonIconStyle}
                      />
                      <Text style={styles.numericInputButtonText}>Height</Text>
                    </View>
                  </View>
                  <NumericInput
                    value={user.height}
                    initValue={user.height}
                    minValue={MIN_HEIGHT}
                    maxValue={MAX_HEIGHT}
                    onChange={height =>
                      this.setState({ user: { ...user, height } })
                    }
                    totalWidth={NUMERIC_INPUT_WIDTH}
                    totalHeight={NUMERIC_INPUT_HEIGHT}
                    type="up-down"
                    iconSize={ICON_SIZE}
                    iconStyle={styles.numberPickerIconStyle}
                    step={1.5}
                    valueType="integer"
                    rounded
                    containerStyle={styles.numberPickerContainer}
                    textColor={styles.numberPickerButtonDes.color}
                    upDownButtonsBackgroundColor={
                      styles.numberPickerButtonDes.backgroundColor
                    }
                  />
                </View>
                {heightValid ? null : (
                  <Text style={styles.errorInputStyle}>{errorMsgHeight}</Text>
                )}
                <View style={styles.radioButtonView}>
                  <View styles={styles.radioButtonTextIconStyle}>
                    <View style={styles.radioButtonTextStyle}>
                      <Icon
                        name="trophy-variant" // "medal"
                        size={ICON_SIZE}
                        style={styles.radioButtonOuterIconStyle}
                      />
                      <Text style={styles.radioButtonText}>Level</Text>
                    </View>
                  </View>
                  <View style={styles.levelRadioButtonsWrapperStyle}>
                    <RadioForm
                      formHorizontal={true}
                      labelHorizontal={true}
                      radio_props={levels}
                      value={user.level}
                      ref={input => (this.levelInput = input)}
                      initial={-1}
                      borderWidth={styles.radioButtonDes.borderWidth}
                      buttonColor={styles.radioButtonDes.color}
                      selectedButtonColor={styles.radioButtonDes.color}
                      buttonSize={BUTTON_SIZE}
                      buttonOuterSize={BUTTON_OUTER_SIZE}
                      labelStyle={styles.levelRadioButtonLabelStyle}
                      buttonWrapStyle={styles.radioButtonWrapStyle}
                      onPress={level =>
                        this.setState({ user: { ...user, level } })
                      }
                    />
                  </View>
                </View>
                {levelValid ? null : (
                  <Text style={styles.errorInputStyle}>
                    Please choose an Option
                  </Text>
                )}
                <View style={styles.radioButtonView}>
                  <View styles={styles.radioButtonTextIconStyle}>
                    <View style={styles.radioButtonTextStyle}>
                      <Icon
                        name="food-variant"
                        size={ICON_SIZE}
                        style={styles.radioButtonOuterIconStyle}
                      />
                      <Text style={styles.radioButtonText}>
                        Food Preference
                      </Text>
                    </View>
                  </View>
                  <View style={styles.radioButtonsWrapperStyle}>
                    <RadioForm
                      formHorizontal={true}
                      labelHorizontal={true}
                      radio_props={foodPreferences}
                      value={user.foodPreference}
                      ref={input => (this.foodPreferenceInput = input)}
                      initial={-1}
                      borderWidth={styles.radioButtonDes.borderWidth}
                      buttonColor={styles.radioButtonDes.color}
                      selectedButtonColor={styles.radioButtonDes.color}
                      buttonSize={BUTTON_SIZE}
                      buttonOuterSize={BUTTON_OUTER_SIZE}
                      labelStyle={styles.radioButtonLabelStyle}
                      buttonWrapStyle={styles.radioButtonWrapStyle}
                      onPress={foodPreference => {
                        this.setState({ user: { ...user, foodPreference } });
                      }}
                    />
                  </View>
                </View>
                {foodPreferenceValid ? null : (
                  <Text style={styles.errorInputStyle}>
                    Please choose an Option
                  </Text>
                )}
              </View>
              <View style={styles.groupButtonViewContainer}>
                <Button
                  title="SAVE"
                  containerStyle={styles.btsButtonContainer}
                  buttonStyle={styles.btsButtonStyle}
                  titleStyle={styles.btsButtonText}
                  icon={
                    <Icon
                      name="content-save"
                      size={ICON_SIZE_MED}
                      style={styles.btsButtonIconStyle}
                    />
                  }
                  iconRight={true}
                  loading={isLoading}
                  onPress={this.goToProfile}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    );
  }
}
