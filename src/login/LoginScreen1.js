import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  LayoutAnimation
} from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesLoginScreen";
import { f, auth, database } from "./../common/FirebaseConfig";
import {
  BG_IMAGE,
  EMAIL_VERIFICATION,
  PASSWORD_LENGTH_MINIMUM,
  ICON_SIZE
} from "../common/Common";

export default class LoginScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "dhivya@gmail.com",
      emailValid: true,
      password: "Dhivya09",
      passwordValid: true,
      login_failed: false,
      showLoading: false
    };
  }
  onEmailChange = email => {
    this.setState({ email });
  };
  validateEmail = () => {
    const { email } = this.state;
    const emailValid = EMAIL_VERIFICATION.test(email);
    LayoutAnimation.easeInEaseOut();
    emailValid || this.emailInput.shake();
    return emailValid;
  };
  onPasswordChange = password => {
    this.setState({ password });
  };
  validatePassword = () => {
    const { password } = this.state;
    const passwordValid = password.length >= PASSWORD_LENGTH_MINIMUM;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  };
  submitLoginCredentials = () => {
    const { email, password } = this.state;
    const emailValid = this.validateEmail(email);
    const passwordValid = this.validatePassword(password);
    this.setState({ emailValid, passwordValid });
    if (emailValid && passwordValid) {
      this.setState({ showLoading: true });
      this.login();
    }
  };
  login = async () => {
    const { email, password } = this.state;
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      this.setState({ showLoading: false });
      this.props.navigation.navigate("HomeScreen");
    } catch (error) {
      this.setState({ showLoading: false });
      alert("Invalid username/password");
    }
  };
  signUpButttonClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("SignUp");
  };

  render() {
    const {
      email,
      password,
      passwordValid,
      emailValid,
      showLoading
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={styles.loginView}>
            <View style={styles.viewContainer}>
              <Text style={styles.logoText}>FITREPO</Text>
            </View>
            <View style={styles.loginInputContainer}>
              <Input
                placeholder="Email"
                placeholderTextColor="white"
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                leftIcon={
                  <Icon
                    name="account"
                    color={styles.loginButtonDes.color}
                    size={ICON_SIZE}
                  />
                }
                autoCapitalize="none"
                autoCorrect={false}
                keyboardAppearance="dark"
                keyboardType="email-address"
                returnKeyType="done"
                value={email}
                onChangeText={value => this.onEmailChange(value)}
                ref={input => (this.emailInput = input)}
                onSubmitEditing={() => {
                  this.setState({ emailValid: this.validateEmail });
                  this.passwordInput.focus();
                }}
                errorMessage={
                  emailValid ? null : "Please enter a valid email address"
                }
              />
              <Input
                placeholder="Password"
                placeholderTextColor="white"
                leftIcon={
                  <Icon
                    name="key-variant"
                    color={styles.loginButtonDes.color}
                    size={ICON_SIZE}
                  />
                }
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                keyboardAppearance="dark"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="go"
                secureTextEntry={true}
                value={password}
                onChangeText={password => this.onPasswordChange(password)}
                ref={input => (this.passwordInput = input)}
                onSubmitEditing={() => {
                  this.setState({ passwordValid: this.validatePassword });
                }}
                errorMessage={
                  passwordValid ? null : "Please enter a valid password"
                }
              />
            </View>
            <Button
              title="LOGIN"
              icon={
                <Icon
                  name="login"
                  size={ICON_SIZE}
                  style={styles.loginButtonIcon}
                />
              }
              iconRight={true}
              loading={showLoading}
              containerStyle={styles.loginButtonContainer}
              buttonStyle={styles.loginButtonStyle}
              titleStyle={styles.loginButtonText}
              onPress={() => this.submitLoginCredentials()}
            />
            <View style={styles.signUpHereContainer}>
              <Text style={styles.newUserText}>New here?</Text>
              <Button
                title="SIGN UP"
                buttonStyle={styles.sighUpButtonStyle}
                titleStyle={styles.signUpButtonTitle}
                type="clear"
                onPress={() => this.signUpButttonClicked()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
