import React, { Component } from "react";
import { View, UIManager, KeyboardAvoidingView } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ICON_SIZE_MED,
  styleCommon
} from "../../assets/style/stylesCommonValues";
import { styles } from "../../assets/style/stylesEmailOrMobileSignup";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class EmailOrMobileSignup extends Component {
  render() {
    const placeholderTextColor = styleCommon.textColor1;
    const {
      email,
      password,
      confirmationPassword,
      emailValid,
      passwordValid,
      confirmationPasswordValid,
      onEmailChange,
      onPasswordChange,
      onConfirmPasswordChange,
      validateEmail,
      validatePassword,
      validateConfirmationPassword
    } = this.props.signupObject;
    return (
      <KeyboardAvoidingView
        style={styles.mainContent}
        contentContainerStyle={styles.mainContent}
        behavior="padding"
        enabled
      >
        <Input
          placeholder="Email"
          placeholderTextColor={placeholderTextColor}
          leftIcon={
            <Icon
              name="email"
              color={styleCommon.textColor1}
              size={ICON_SIZE_MED}
            />
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
          onChangeText={email => onEmailChange(email)}
          value={email}
          ref={input => (this.emailInput = input)}
          onSubmitEditing={() => {
            this.setState({ emailValid: validateEmail });
            this.passwordInput.focus();
          }}
          errorMessage={
            emailValid ? null : "Please enter a valid email address!"
          }
        />
        <Input
          placeholder="Password"
          leftIcon={
            <Icon
              name="lock"
              color={styleCommon.textColor1}
              size={ICON_SIZE_MED}
            />
          }
          containerStyle={styles.inputViewContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          placeholderTextColor={placeholderTextColor}
          errorStyle={styles.errorInputStyle}
          secureTextEntry={true}
          keyboardAppearance="dark"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={true}
          returnKeyType="done"
          onChangeText={password => onPasswordChange(password)}
          onFocus={() => validateEmail(email, this.emailInput)}
          value={password}
          ref={input => (this.passwordInput = input)}
          onSubmitEditing={() => {
            this.setState({ passwordValid: validatePassword });
            this.confirmationPasswordInput.focus();
          }}
          errorMessage={
            passwordValid
              ? null
              : "Password should have more than 8 charecters!"
          }
        />
        <Input
          placeholder="Confirm Password"
          leftIcon={
            <Icon
              name="asterisk"
              color={styleCommon.textColor1}
              size={ICON_SIZE_MED}
            />
          }
          containerStyle={styles.inputViewContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          placeholderTextColor={placeholderTextColor}
          errorStyle={styles.errorInputStyle}
          onChangeText={confirmationPassword =>
            onConfirmPasswordChange(confirmationPassword)
          }
          onFocus={() => validatePassword(password, this.passwordInput)}
          value={confirmationPassword}
          secureTextEntry={true}
          keyboardAppearance="light"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={true}
          returnKeyType="done"
          ref={input => (confirmationPasswordInput = input)}
          onSubmitEditing={() => {
            this.setState({
              confirmationPasswordValid: validateConfirmationPassword
            });
          }}
          errorMessage={
            confirmationPasswordValid ? null : "The Passwords do not match !"
          }
        />
      </KeyboardAvoidingView>
    );
  }
}
