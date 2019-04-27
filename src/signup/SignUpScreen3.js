import React, { Component } from "react";
import {
  ImageBackground,
  LayoutAnimation,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  UIManager,
  View
} from "react-native";
import NumericInput from "react-native-numeric-input";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RadioForm from "react-native-simple-radio-button";
import { styles } from "../../assets/style/stylesSignUpScreen3";
import { auth, database } from "../common/FirebaseConfig";
import {
  GRADIENT_BG_IMAGE,
  LEVELS_OPTIONS,
  FOOD_PREFERENCES_OPTIONS,
  ICON_SIZE,
  ICON_SIZE_SMALL,
  BUTTON_SIZE,
  BUTTON_OUTER_SIZE,
  NUMERIC_INPUT_WIDTH,
  NUMERIC_INPUT_HEIGHT,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_WEIGHT,
  MAX_WEIGHT
} from "../common/Common";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class SignUpScreen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      weight: 0,
      weightValid: true,
      errorMsgWeight: "",
      height: 0,
      heightValid: true,
      errorMsgHeight: "",
      levels: LEVELS_OPTIONS,
      level: "",
      levelValid: true,
      foodPreferences: FOOD_PREFERENCES_OPTIONS,
      foodPreference: "",
      foodPreferenceValid: true,
      latitude: null,
      longitude: null,
      error: ""
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  validateWeight = () => {
    const { weight } = this.state;
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
    const { height } = this.state;
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
    const { level } = this.state;
    const levelValid = level.length > 0;
    this.setState({ levelValid });
    return levelValid;
  };
  validateFoodPreference = () => {
    const { foodPreference } = this.state;
    const foodPreferenceValid = foodPreference.length > 0;
    this.setState({ foodPreferenceValid });
    return foodPreferenceValid;
  };
  goToHomeScreen = async () => {
    LayoutAnimation.easeInEaseOut();
    const weightValid = this.validateWeight();
    const heightValid = this.validateHeight();
    const levelValid = this.validateLevel();
    const foodPreferenceValid = this.validateFoodPreference();

    if (weightValid && heightValid && levelValid && foodPreferenceValid) {
      this.setState({ isLoading: true });
      try {
        const user = await auth.currentUser;
        this.updateUserWithOtherDetails(user);
      } catch (error) {
        this.setState({ isLoading: false });
        //console.log("error before updating from :", error);
      }
    }
  };
  updateUserWithOtherDetails = async user => {
    const {
      level,
      weight,
      height,
      foodPreference,
      latitude,
      longitude
    } = this.state;
    const { navigate } = this.props.navigation;
    const extraUserDetails = {
      level,
      weight,
      height,
      foodPreference,
      latitude,
      longitude
    };
    database
      .ref("users")
      .child(user.uid)
      .update(extraUserDetails)
      .then(() => {
        //console.log("Successfully updated existing user with details");
        this.setState({ isLoading: false });
        navigate("HomeScreen");
      })
      .catch(error => {
        this.setState({ isLoading: false });
        //console.log("error while updating new user with details:", error);
      });
  };
  skipButtonClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("HomeScreen");
  };

  render() {
    const {
      isLoading,
      weight,
      weightValid,
      errorMsgWeight,
      height,
      heightValid,
      errorMsgHeight,
      levels,
      level,
      levelValid,
      foodPreferences,
      foodPreference,
      foodPreferenceValid
    } = this.state;
    return (
      <ImageBackground
        source={GRADIENT_BG_IMAGE}
        style={styles.bgImage}
        /*imageStyle={{
          opacity: 0.8
        }}*/
      >
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <StatusBar barStyle="light-content" />
          <KeyboardAvoidingView
            behaviour="position"
            contentContainerStyle={styles.formContainer}
          >
            <View style={styles.viewContainer}>
              <Text style={styles.signUpText}>Medical Id...</Text>
            </View>
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
                  value={weight}
                  initValue={weight}
                  minValue={MIN_WEIGHT}
                  maxValue={MAX_WEIGHT}
                  onChange={value => this.setState({ weight: value })}
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
                  value={height}
                  initValue={height}
                  minValue={MIN_HEIGHT}
                  maxValue={MAX_HEIGHT}
                  onChange={value => this.setState({ height: value })}
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
                      name="medal"
                      size={ICON_SIZE}
                      style={styles.radioButtonOuterIconStyle}
                    />
                    <Text style={styles.radioButtonText}>Level</Text>
                  </View>
                </View>
                <RadioForm
                  formHorizontal={true}
                  labelHorizontal={true}
                  radio_props={levels}
                  value={level}
                  ref={input => (this.levelInput = input)}
                  initial={-1}
                  borderWidth={styles.radioButtonDes.borderWidth}
                  buttonColor={styles.radioButtonDes.color}
                  selectedButtonColor={styles.radioButtonDes.color}
                  buttonSize={BUTTON_SIZE}
                  buttonOuterSize={BUTTON_OUTER_SIZE}
                  labelStyle={styles.radioButtonLabelStyle}
                  buttonWrapStyle={styles.radioButtonWrapStyle}
                  onPress={value => {
                    this.setState({ level: value });
                  }}
                />
              </View>
              {levelValid ? null : (
                <Text style={styles.errorInputStyle}>
                  Please choose an Option
                </Text>
              )}
              <View style={styles.radioButtonViewWOBorder}>
                <View styles={styles.radioButtonTextIconStyle}>
                  <View style={styles.radioButtonTextStyle}>
                    <Icon
                      name="food-variant"
                      size={ICON_SIZE}
                      style={styles.radioButtonOuterIconStyle}
                    />
                    <Text style={styles.radioButtonText}>Food Preference</Text>
                  </View>
                </View>
                <RadioForm
                  formHorizontal={true}
                  labelHorizontal={true}
                  radio_props={foodPreferences}
                  value={foodPreference}
                  ref={input => (this.foodPreferenceInput = input)}
                  initial={-1}
                  borderWidth={styles.radioButtonDes.borderWidth}
                  buttonColor={styles.radioButtonDes.color}
                  selectedButtonColor={styles.radioButtonDes.color}
                  buttonSize={BUTTON_SIZE}
                  buttonOuterSize={BUTTON_OUTER_SIZE}
                  labelStyle={styles.radioButtonLabelStyle}
                  buttonWrapStyle={styles.radioButtonWrapStyle}
                  onPress={value => {
                    this.setState({ foodPreference: value });
                  }}
                />
              </View>
              {foodPreferenceValid ? null : (
                <Text style={styles.errorInputStyle}>
                  Please choose an Option
                </Text>
              )}
            </View>
          </KeyboardAvoidingView>

          <Button
            title="GO TO HOME SCREEN"
            icon={
              <Icon
                name="home-circle"
                size={ICON_SIZE}
                style={styles.goToHomeButtonIcon}
              />
            }
            iconRight={true}
            loading={isLoading}
            containerStyle={styles.goToHomeButtonContainer}
            buttonStyle={styles.goToHomeButton}
            titleStyle={styles.goToHomeButtonText}
            disabled={isLoading}
            onPress={() => this.goToHomeScreen()}
          />
          <Button
            title="SKIP THIS STEP"
            icon={
              <Icon
                name="chevron-right-circle"
                size={ICON_SIZE_SMALL}
                style={styles.skipStepButtonIcon}
              />
            }
            iconRight={true}
            loading={isLoading}
            containerStyle={styles.skipStepButtonContainer}
            buttonStyle={styles.skipStepButton}
            titleStyle={styles.skipStepButtonText}
            disabled={isLoading}
            onPress={() => this.skipButtonClicked()}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
}
