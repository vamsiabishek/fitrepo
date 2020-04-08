import React, { Component } from "react";
import { View, UIManager } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ICON_SIZE_MED,
  ICON_SIZE,
  styleCommon
} from "../../assets/style/stylesCommonValues";
import { styles } from "../../assets/style/stylesEmailOrMobileSignup";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class EmailOrMobileSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextKeyP: true,
      secureTextKeyCP: true
    };
  }
  onEyeIconPressP = () => {
    this.setState({ secureTextKeyP: false });
  };
  onEyeOffIconPressP = () => {
    this.setState({ secureTextKeyP: true });
  };
  onEyeIconPressCP = () => {
    this.setState({ secureTextKeyCP: false });
  };
  onEyeOffIconPressCP = () => {
    this.setState({ secureTextKeyCP: true });
  };
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
    const { secureTextKeyP, secureTextKeyCP } = this.state;
    return (
      <View style={styles.mainContent}>
        <Input
          placeholder="Email"
          placeholderTextColor={placeholderTextColor}
          leftIcon={
            <Icon
              name="email"
              color={styleCommon.iconColor}
              size={ICON_SIZE_MED}
            />
          }
          containerStyle={styles.inputViewContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          errorStyle={styles.errorInputStyle}
          keyboardAppearance="light"
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
              color={styleCommon.iconColor}
              size={ICON_SIZE_MED}
            />
          }
          containerStyle={styles.inputViewContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          placeholderTextColor={placeholderTextColor}
          errorStyle={styles.errorInputStyle}
          secureTextEntry={secureTextKeyP}
          keyboardAppearance="light"
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
          rightIcon={
            <Button
              icon={
                <Icon
                  name={secureTextKeyP ? "eye" : "eye-off"}
                  size={ICON_SIZE}
                  style={{ color: styleCommon.iconColor }}
                />
              }
              buttonStyle={{
                backgroundColor: "transparent"
              }}
              onPress={
                secureTextKeyP ? this.onEyeIconPressP : this.onEyeOffIconPressP
              }
            />
          }
        />
        <Input
          placeholder="Confirm Password"
          leftIcon={
            <Icon
              name="asterisk"
              color={styleCommon.iconColor}
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
          secureTextEntry={secureTextKeyCP}
          keyboardAppearance="light"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={true}
          returnKeyType="done"
          ref={input => (this.confirmationPasswordInput = input)}
          onSubmitEditing={() => {
            this.setState({
              confirmationPasswordValid: validateConfirmationPassword
            });
          }}
          errorMessage={
            confirmationPasswordValid ? null : "The Passwords do not match !"
          }
          rightIcon={
            <Button
              icon={
                <Icon
                  name={secureTextKeyCP ? "eye" : "eye-off"}
                  size={ICON_SIZE}
                  style={{ color: styleCommon.iconColor }}
                />
              }
              buttonStyle={{
                backgroundColor: "transparent"
              }}
              onPress={
                secureTextKeyCP
                  ? this.onEyeIconPressCP
                  : this.onEyeOffIconPressCP
              }
            />
          }
        />
      </View>
    );
  }
}
