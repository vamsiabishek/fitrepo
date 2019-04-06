import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  UIManager
} from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  EMAIL_VERIFICATION,
  ICON_SIZE,
  ICON_SIZE_MED,
  PASSWORD_LENGTH_MINIMUM
} from "../common/Common";
import { styleCommon } from "../../assets/style/stylesCommonValues";

const SCREEN_WIDTH = Dimensions.get("window").width;
// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  inputViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    //paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: "transparent",
    width: SCREEN_WIDTH - 100
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#004a94",
    height: 55,
    //borderBottomWidth: 0,
    marginTop: 6
    //paddingHorizontal: 8
  },
  inputStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    color: "#004a94", // "#44484E",
    fontSize: 16
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336"
  }
});

export default class EmailOrMobileSignup extends Component {
  render() {
    const placeholderTextColor = "#004a94";
    const { email, password, confirmationPassword, emailValid, passwordValid, confirmationPasswordValid,  onEmailChange,
      onPasswordChange,
      onConfirmPasswordChange,
      validateEmail,
      validatePassword,
      validateConfirmationPassword } = this.props.signupObject;
    return (
      <View style={styles.mainContent}>
        <Input
          placeholder="Email"
          placeholderTextColor={placeholderTextColor}
          leftIcon={<Icon name="email" color="#004a94" size={ICON_SIZE_MED} />}
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
          onChangeText={email => this.onEmailChange()}
          value={email}
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
          placeholder="Password"
          leftIcon={<Icon name="lock" color="#004a94" size={ICON_SIZE_MED} />}
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
          onChangeText={password => this.onPasswordChange()}
          onFocus={() => this.validateEmail()}
          value={password}
          ref={input => (this.passwordInput = input)}
          onSubmitEditing={() => {
            this.setState({ passwordValid: this.validatePassword });
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
          leftIcon={<Icon name="asterisk" color="#004a94" size={ICON_SIZE_MED} />}
          containerStyle={styles.inputViewContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          placeholderTextColor={placeholderTextColor}
          errorStyle={styles.errorInputStyle}
          onChangeText={confirmationPassword => this.onConfirmPasswordChange()
          }
          onFocus={()=>this.validatePassword()}
          value={confirmationPassword}
          secureTextEntry={true}
          keyboardAppearance="light"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={true}
          returnKeyType="done"
          ref={input => (this.confirmationPasswordInput = input)}
          onSubmitEditing={() => {
            this.setState({
              confirmationPasswordValid: this.validateConfirmationPassword
            });
          }}
          errorMessage={
           confirmationPasswordValid ? null : "The Passwords do not match !"
          }
        />
      </View>
    );
  }
}
