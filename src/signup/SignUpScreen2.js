import React, { Component } from "react";
import {
  ImageBackground,
  LayoutAnimation,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from "react-native";
import { Input, Button, ButtonGroup } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { styles } from "../../assets/style/stylesSignUpScreen2";
import { auth, database } from "../common/FirebaseConfig";
import {
  ICON_SIZE,
  MIN_DATE,
  MAX_DATE,
  GRADIENT_BG_IMAGE
} from "../common/Common";
import { getCurrentUser } from "../common/Util"

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class SignUpScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: "",
      firstNameValid: true,
      lastName: "",
      name: "",
      selectedGenderIndex: 1,
      gender: "",
      genderValid: true,
      dob: "",
      isDTPickerVisible: false,
      dobAgeValid: true,
      age: null,
      errorMsgWtAge: ""
    };
    this.genders = ["Female", "Male", "Other"];
  }
  showDTPicker = () => {
    this.setState({ isDTPickerVisible: true });
  };
  hideDTPicker = () => {
    this.setState({ isDTPickerVisible: false });
  };
  handleDTPicker = date => {
    let currentDate = new Date();
    let dateFormat = new Date(date);
    let newDate = dateFormat.toDateString().substring(4);
    let ageFromDate = currentDate.getFullYear() - dateFormat.getFullYear();
    LayoutAnimation.easeInEaseOut();
    this.setState({
      dob: newDate,
      age: ageFromDate
    });
    this.hideDTPicker();
  };
  validateFirstName = () => {
    const { firstName } = this.state;
    const firstNameValid = firstName.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ firstNameValid });
    firstNameValid || this.firstNameInput.shake();
    return firstNameValid;
  };
  createName = () => {
    const { firstName, lastName } = this.state;
    LayoutAnimation.easeInEaseOut();
    if (lastName.length == 0) {
      this.setState({
        name: firstName
      });
    } else {
      this.setState({
        name: firstName + " " + lastName
      });
    }
  };
  validateDobAndAge = () => {
    const { dob, age } = this.state;
    if (age !== null) {
      const dobAgeValid = dob.length > 0 && age > 18;
      const errorMsgWtAge = "You should be 18 years & above!";
      LayoutAnimation.easeInEaseOut();
      this.setState({ dobAgeValid, errorMsgWtAge });
      dobAgeValid || this.dobInput.shake();
      return dobAgeValid;
    } else {
      const dobAgeValid = dob.length > 0;
      const errorMsgWtAge = "Please select a Date!";
      LayoutAnimation.easeInEaseOut();
      this.setState({ dobAgeValid, errorMsgWtAge });
      dobAgeValid || this.dobInput.shake();
      return dobAgeValid;
    }
  };
  changeSelectedGenderIndex = selectedGenderIndex => {
    let { gender } = this.state;
    this.setState({
      selectedGenderIndex,
      gender: this.genders[selectedGenderIndex]
    });
  };
  validateGender = () => {
    const { gender } = this.state;
    const genderValid = gender.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ genderValid });
    return genderValid;
  };
  goToSignUpScreen3 = async () => {
    LayoutAnimation.easeInEaseOut();
    this.createName();
    const firstNameValid = this.validateFirstName();
    const dobValid = this.validateDobAndAge();
    const genderValid = this.validateGender();
    if (firstNameValid && dobValid && genderValid) {
      this.setState({ isLoading: true });
      try {
        const user = await getCurrentUser();
        this.updateUserWithDetails(user);
      } catch (error) {
        this.setState({ isLoading: false });
        console.log("Error before updating from :", error);
      }
    }
  };
  updateUserWithDetails = async user => {
    const { name, dob, age, gender } = this.state;
    const { navigate } = this.props.navigation;
    const extraUserDetails = {
      name,
      dob,
      age,
      gender
    };
    database
      .ref("users")
      .child(user.uid)
      .update(extraUserDetails)
      .then(() => {
        console.log(
          "Successfully updated existing user with details in page SignUpScreen2."
        );
        this.setState({ isLoading: false });
        navigate("SignUpScreen3", {
          screenName: name
        });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(
          "error while updating new user with details in page SignUpScreen2.",
          error
        );
      });
  };

  render() {
    const {
      isLoading,
      firstName,
      firstNameValid,
      lastName,
      selectedGenderIndex,
      genderValid,
      isDTPickerVisible,
      dob,
      dobAgeValid,
      errorMsgWtAge
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
          <KeyboardAvoidingView
            behaviour="position"
            contentContainerStyle={styles.formContainer}
          >
            <View style={styles.viewContainer}>
              <Text style={styles.signUpText}>Personal Details...</Text>
            </View>
            <View style={styles.inputOuterViewContainer}>
              <Input
                placeholder="First Name"
                placeholderTextColor={styles.inputStyle.color}
                leftIcon={
                  <Icon name="alpha-f-circle" color="black" size={ICON_SIZE} />
                }
                containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                onChangeText={firstName => this.setState({ firstName })}
                value={firstName}
                keyboardAppearance="light"
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
                blurOnSubmit={false}
                returnKeyType="next"
                ref={input => (this.firstNameInput = input)}
                onSubmitEditing={() => {
                  this.setState({ firstNameValid: this.validateFirstName });
                  this.lastNameInput.focus();
                }}
                errorMessage={firstNameValid ? null : "Please enter a Name!"}
              />
              <Input
                placeholder="Last Name (Optional)"
                placeholderTextColor={styles.inputStyle.color}
                leftIcon={
                  <Icon name="alpha-l-circle" color="black" size={ICON_SIZE} />
                }
                containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                onChangeText={lastName => this.setState({ lastName })}
                value={lastName}
                keyboardAppearance="light"
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
                blurOnSubmit={false}
                returnKeyType="next"
                ref={input => (this.lastNameInput = input)}
                onSubmitEditing={() => {
                  this.dobInput.focus();
                }}
              />
              <TouchableOpacity onPress={this.showDTPicker}>
                <Input
                  placeholder="Date of Birth"
                  placeholderTextColor={styles.inputStyle.color}
                  leftIcon={
                    <Icon name="calendar" color="black" size={ICON_SIZE} />
                  }
                  containerStyle={styles.inputViewContainer}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  onChangeText={dob => this.setState({ dob })}
                  value={dob}
                  keyboardAppearance="light"
                  keyboardType="default"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  editable={true}
                  returnKeyType="next"
                  ref={input => (this.dobInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ dobAgeValid: this.validateDobAndAge });
                  }}
                  errorMessage={dobAgeValid ? null : errorMsgWtAge}
                />
              </TouchableOpacity>
              <DateTimePicker
                mode="date"
                minimumDate={MIN_DATE}
                maximumDate={MAX_DATE}
                isVisible={isDTPickerVisible}
                onConfirm={this.handleDTPicker}
                onCancel={this.hideDTPicker}
              />
              <View>
                <View style={styles.radioButtonView}>
                  <View styles={styles.radioButtonTextIconStyle}>
                    <View style={styles.radioButtonTextStyle}>
                      <Icon
                        name="gender-transgender"
                        size={ICON_SIZE}
                        style={styles.radioButtonOuterIconStyle}
                      />
                      <Text style={styles.radioButtonText}>Gender</Text>
                    </View>
                  </View>
                  <ButtonGroup
                    onPress={this.changeSelectedGenderIndex}
                    selectedIndex={selectedGenderIndex}
                    buttons={this.genders}
                    containerStyle={styles.vegButtonGroup}
                    innerBorderStyle={{ width: 1, color: "black" }}
                    selectedButtonStyle={{
                      backgroundColor: "#00DB8D"
                    }}
                    textStyle={{ fontSize: 14, color: "black" }}
                    selectedTextStyle={{ color: "black" }}
                  />
                </View>
              </View>
              {genderValid ? null : (
                <Text style={styles.errorInputStyle}>
                  Please choose an Option
                </Text>
              )}
            </View>
          </KeyboardAvoidingView>
          <Button
            icon={
              <Icon
                name="medical-bag"
                size={ICON_SIZE}
                style={styles.goToMedicalIDButtonIcon}
              />
            }
            iconRight={true}
            title="GO TO MEDICAL ID"
            loading={isLoading}
            containerStyle={styles.goToMedicalIDButtonContainer}
            buttonStyle={styles.goToMedicalIDButton}
            titleStyle={styles.goToMedicalIDButtonText}
            disabled={isLoading}
            onPress={this.goToSignUpScreen3}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
}
