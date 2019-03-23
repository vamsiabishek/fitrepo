import React, { Component } from "react";
import {
  LayoutAnimation,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from "react-native";
import { Input, Button } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import DateTimePicker from "react-native-modal-datetime-picker";
import { styles } from "../../assets/style/stylesEditProfileScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ICON_SIZE,
  ICON_SIZE_MED,
  MIN_DATE,
  MAX_DATE,
  BUTTON_SIZE,
  BUTTON_OUTER_SIZE,
  EMAIL_VERIFICATION
} from "../common/Common";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class EditProfileSubScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: props.userDets,
      usernameValid: true,
      emailValid: true,
      nameValid: true,
      genders: [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" },
        { label: "Other", value: "Other" }
      ],
      genderValid: true,
      isDTPickerVisible: false,
      dobAgeValid: true,
      errorMsgWtAge: ""
    };
    this.s;
  }

  validateUsername = () => {
    const { username } = this.state.user;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  };
  validateEmail = () => {
    const { email } = this.state.user;
    const emailValid = EMAIL_VERIFICATION.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  };
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
    //LayoutAnimation.easeInEaseOut();
    this.setState({
      dob: newDate,
      age: ageFromDate
    });
    this.hideDTPicker();
  };
  validateName = () => {
    const { name } = this.state.user;
    const nameValid = name.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ nameValid });
    nameValid || this.nameInput.shake();
    return nameValid;
  };
  validateDobAndAge = () => {
    const { dob, age } = this.state.user;
    if (age !== null) {
      const dobAgeValid = dob.length > 0 && age > 18;
      const errorMsgWtAge = "You should be 18 years & above!";
      //LayoutAnimation.easeInEaseOut();
      this.setState({ dobAgeValid, errorMsgWtAge });
      dobAgeValid || this.dobInput.shake();
      return dobAgeValid;
    } else {
      const dobAgeValid = dob.length > 0;
      const errorMsgWtAge = "Please select a Date!";
      //LayoutAnimation.easeInEaseOut();
      this.setState({ dobAgeValid, errorMsgWtAge });
      dobAgeValid || this.dobInput.shake();
      return dobAgeValid;
    }
  };
  validateGender = () => {
    const { gender } = this.state.user;
    const genderValid = gender.length > 0;
    //LayoutAnimation.easeInEaseOut();
    this.setState({ genderValid });
    return genderValid;
  };
  goToNextSubSection = () => {
    LayoutAnimation.easeInEaseOut();
    const { name, username, dob, age, email, gender } = this.state.user;
    const usernameValid = this.validateUsername();
    const emailValid = this.validateEmail();
    const nameValid = this.validateName();
    const dobageValid = this.validateDobAndAge();
    const genderValid = this.validateGender();
    const progress = true;
    if (
      usernameValid &&
      emailValid &&
      dobageValid &&
      nameValid &&
      genderValid
    ) {
      const setUserPartial = {
        name,
        username,
        dob,
        age,
        email,
        gender
      };
      this.props.setSubScreenUserVals(setUserPartial, progress);
    }
  };
  render() {
    const {
      isLoading,
      user,
      emailValid,
      usernameValid,
      nameValid,
      genders,
      genderValid,
      isDTPickerVisible,
      dobAgeValid,
      errorMsgWtAge
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
                <Input
                  placeholder="Username"
                  placeholderTextColor={styles.inputStyle.color}
                  leftIcon={
                    <Icon name="account-box" color="#00DB8D" size={ICON_SIZE} />
                  }
                  containerStyle={styles.inputViewContainer}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  keyboardAppearance="dark"
                  keyboardType="default"
                  returnKeyType="done"
                  onChangeText={username =>
                    this.setState({ user: { ...user, username } })
                  }
                  value={user.username}
                  ref={input => (this.usernameInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ usernameValid: this.validateUsername });
                    this.emailInput.focus();
                  }}
                  errorMessage={
                    usernameValid ? null : "Your username can't be blank"
                  }
                />
                <Input
                  placeholder="Email"
                  placeholderTextColor={styles.inputStyle.color}
                  leftIcon={
                    <Icon name="email" color="#00DB8D" size={ICON_SIZE} />
                  }
                  containerStyle={styles.inputViewContainer}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  keyboardAppearance="dark"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  returnKeyType="done"
                  onChangeText={email =>
                    this.setState({ user: { ...user, email } })
                  }
                  value={user.email}
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ emailValid: this.validateEmail });
                    this.passwordInput.focus();
                  }}
                  errorMessage={
                    emailValid ? null : "Please enter a valid email address!"
                  }
                />
                <Input
                  placeholder="Name"
                  placeholderTextColor={styles.inputStyle.color}
                  leftIcon={
                    <Icon
                      name="alpha-n-circle"
                      color="#00DB8D"
                      size={ICON_SIZE}
                    />
                  }
                  containerStyle={styles.inputViewContainer}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  onChangeText={name =>
                    this.setState({ user: { ...user, name } })
                  }
                  value={user.name}
                  keyboardAppearance="light"
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  ref={input => (this.nameInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ nameValid: this.validateName });
                    this.dobInput.focus();
                  }}
                  errorMessage={nameValid ? null : "Please enter a Name!"}
                />
                <TouchableOpacity onPress={this.showDTPicker}>
                  <Input
                    placeholder="Date of Birth"
                    placeholderTextColor={styles.inputStyle.color}
                    leftIcon={
                      <Icon name="calendar" color="#00DB8D" size={ICON_SIZE} />
                    }
                    containerStyle={styles.inputViewContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    errorStyle={styles.errorInputStyle}
                    onChangeText={dob =>
                      this.setState({ user: { ...user, dob } })
                    }
                    value={user.dob}
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
                    <View style={styles.radioButtonsWrapperStyle}>
                      <RadioForm
                        formHorizontal={true}
                        labelHorizontal={true}
                        radio_props={genders}
                        value={user.gender}
                        ref={input => (this.genderInput = input)}
                        initial={-1}
                        borderWidth={styles.radioButtonDes.borderWidth}
                        buttonColor={styles.radioButtonDes.color}
                        selectedButtonColor={styles.radioButtonDes.color}
                        buttonSize={BUTTON_SIZE}
                        buttonOuterSize={BUTTON_OUTER_SIZE}
                        labelStyle={styles.radioButtonLabelStyle}
                        buttonWrapStyle={styles.radioButtonWrapStyle}
                        onPress={gender => {
                          this.setState({ user: { ...user, gender } });
                        }}
                      />
                    </View>
                  </View>
                  {genderValid ? null : (
                    <Text style={styles.errorInputStyle}>
                      Please choose an Option
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.groupButtonViewContainer}>
                <Button
                  title="NEXT"
                  containerStyle={styles.btsButtonContainer}
                  buttonStyle={styles.btsButtonStyle}
                  titleStyle={styles.btsButtonText}
                  icon={
                    <Icon
                      name="chevron-right"
                      size={ICON_SIZE_MED}
                      style={styles.btsButtonIconStyle}
                    />
                  }
                  iconRight={true}
                  loading={isLoading}
                  onPress={this.goToNextSubSection}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    );
  }
}
