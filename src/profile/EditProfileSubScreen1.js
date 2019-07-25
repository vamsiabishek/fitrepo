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
  MIN_DATE,
  MAX_DATE,
  BUTTON_SIZE,
  BUTTON_OUTER_SIZE,
  EMAIL_VERIFICATION
} from "../common/Common";
import {
  styleCommon,
  ICON_SIZE,
  ICON_SIZE_MED,
  btnGradientColorLeft,
  btnGradientColorRight,
  btnGradientColorRightDisabled
} from "../../assets/style/stylesCommonValues";
import LinearGradient from "react-native-linear-gradient";

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
      isDTPickerVisible: false,
      dobAgeValid: true,
      errorMsgWtAge: "",
      isActive: false
    };
    this.selectedDate = new Date(this.state.user.dob);
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
    const { user } = this.state;
    let currentDate = new Date();
    let dateFormat = new Date(date);
    let newDate = dateFormat.toDateString().substring(4);
    let ageFromDate = currentDate.getFullYear() - dateFormat.getFullYear();
    //LayoutAnimation.easeInEaseOut();
    this.setState({
      user: { ...user, dob: newDate, age: ageFromDate },
      isActive: true
    });
    this.hideDTPicker();
  };
  onDateChangePicker = date => {
    this.selectedDate = date;
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
  goToNextSubSection = () => {
    LayoutAnimation.easeInEaseOut();
    const { name, username, dob, age, email } = this.state.user;
    const usernameValid = this.validateUsername();
    const emailValid = this.validateEmail();
    const nameValid = this.validateName();
    const dobageValid = this.validateDobAndAge();
    // const progress = true;
    if (usernameValid && emailValid && dobageValid && nameValid) {
      const setUserPartial = {
        name,
        username,
        dob,
        age,
        email
      };
      this.props.setSubScreenUserVals(setUserPartial); // progress
    }
  };
  render() {
    const {
      isLoading,
      user,
      emailValid,
      usernameValid,
      nameValid,
      isDTPickerVisible,
      dobAgeValid,
      errorMsgWtAge,
      isActive
    } = this.state;
    const dateInDatetime = new Date(user.dob);
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
                  rightIcon={
                    <Icon
                      name="account-box"
                      color={styleCommon.textColor1}
                      size={ICON_SIZE}
                    />
                  }
                  containerStyle={styles.inputViewContainer}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  keyboardAppearance="light"
                  keyboardType="default"
                  returnKeyType="done"
                  onChangeText={username =>
                    this.setState({
                      user: { ...user, username },
                      isActive: true
                    })
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
                  rightIcon={
                    <Icon
                      name="email"
                      color={styleCommon.darkDisableColor}
                      size={ICON_SIZE}
                    />
                  }
                  containerStyle={styles.inputViewContainer}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputDisableStyle}
                  errorStyle={styles.errorInputStyle}
                  editable={false}
                  keyboardAppearance="light"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  returnKeyType="done"
                  onChangeText={email =>
                    this.setState({ user: { ...user, email }, isActive: true })
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
                  rightIcon={
                    <Icon
                      name="alpha-n-box"
                      color={styleCommon.textColor1}
                      size={ICON_SIZE}
                    />
                  }
                  containerStyle={styles.inputViewContainer}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  onChangeText={name =>
                    this.setState({ user: { ...user, name }, isActive: true })
                  }
                  value={user.name}
                  keyboardAppearance="light"
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  returnKeyType="done"
                  ref={input => (this.nameInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ nameValid: this.validateName });
                    this.dobInput.focus();
                  }}
                  errorMessage={nameValid ? null : "Please enter a Name!"}
                />
                <TouchableOpacity onPress={this.showDTPicker}>
                  <DateTimePicker
                    mode="date"
                    date={
                      this.selectedDate ? this.selectedDate : dateInDatetime
                    }
                    minimumDate={MIN_DATE}
                    maximumDate={MAX_DATE}
                    isVisible={isDTPickerVisible}
                    onDateChange={this.onDateChangePicker}
                    onConfirm={this.handleDTPicker}
                    onCancel={this.hideDTPicker}
                  />
                  <View pointerEvents="none">
                    <Input
                      placeholder="Date of Birth"
                      placeholderTextColor={styles.inputStyle.color}
                      rightIcon={
                        <Icon
                          name="calendar"
                          color={styleCommon.textColor1}
                          size={ICON_SIZE}
                        />
                      }
                      containerStyle={styles.inputViewContainer}
                      inputContainerStyle={styles.inputContainer}
                      inputStyle={styles.inputStyle}
                      errorStyle={styles.errorInputStyle}
                      onChangeText={date =>
                        this.setState({
                          user: { ...user, dob: date },
                          isActive: true
                        })
                      }
                      value={user.dob}
                      keyboardAppearance="light"
                      keyboardType="default"
                      autoCorrect={false}
                      blurOnSubmit={true}
                      editable={true}
                      returnKeyType="done"
                      ref={input => (this.dobInput = input)}
                      onSubmitEditing={() => {
                        this.setState({ dobAgeValid: this.validateDobAndAge });
                      }}
                      errorMessage={dobAgeValid ? null : errorMsgWtAge}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <Button
                title="SAVE & GO BACK"
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: [
                    btnGradientColorLeft,
                    isActive
                      ? btnGradientColorRight
                      : btnGradientColorRightDisabled
                  ],
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 }
                }}
                containerStyle={styles.btsButtonContainer}
                buttonStyle={
                  isActive
                    ? styles.btsButtonStyle
                    : styles.btsButtonDisableStyle
                }
                titleStyle={
                  isActive ? styles.btsButtonText : styles.btsButtonDisableText
                }
                loading={isLoading}
                onPress={this.goToNextSubSection}
                disabled={!isActive}
              />
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    );
  }
}
