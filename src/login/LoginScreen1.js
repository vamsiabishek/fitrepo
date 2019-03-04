import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  LayoutAnimation
} from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../assets/style/stylesLoginScreen";
import { auth } from "./../common/FirebaseConfig";

const BG_IMAGE = require("../../assets/images/barbell.jpg");

export default class LoginScreen1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "vamsi@gmail.com",
      emailValid: true,
      password: "vamsi123",
      passwordValid: true,
      login_failed: false,
      showLoading: false
    };
  }
  validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    emailValid || this.emailInput.shake();
    return emailValid;
  };
  validatePassword = password => {
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  };
  signUpButttonClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("SignUp");
  };

  onEmailChange = email => {
    this.setState({ email });
  };

  onPasswordChange = password => {
    this.setState({ password });
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
      let user = await auth.signInWithEmailAndPassword(email, password);
      this.setState({ showLoading: false });
      this.props.navigation.navigate("HomeScreen");
    } catch (error) {
      this.setState({ showLoading: false });
      alert("Invalid username/password");
    }
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
            <View style={styles.loginInput}>
              <Input
                leftIcon={<Icon name="user" color="white" size={25} />}
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                onChangeText={email => this.onEmailChange(email)}
                value={email}
                keyboardAppearance="light"
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="white"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                ref={input => (this.emailInput = input)}
                onSubmitEditing={() => {
                  this.setState({ emailValid: this.validateEmail(email) });
                  this.passwordInput.focus();
                }}
                blurOnSubmit={false}
                errorStyle={styles.errorInputStyle}
                errorMessage={
                  emailValid ? null : "Please enter a valid email address"
                }
              />
              <Input
                leftIcon={<Icon name="lock" color="white" size={25} />}
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                onChangeText={password => this.onPasswordChange(password)}
                value={password}
                secureTextEntry={true}
                keyboardAppearance="light"
                keyboardType="email-address"
                placeholder="Password"
                placeholderTextColor="white"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="go"
                ref={input => (this.passwordInput = input)}
                blurOnSubmit={true}
                onSubmitEditing={() => {
                  this.setState({
                    passwordValid: this.validatePassword(password)
                  });
                }}
                errorStyle={styles.errorInputStyle}
                errorMessage={
                  passwordValid ? null : "Please enter a valid password"
                }
              />
            </View>
            <Button
              title="LOGIN"
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
                type="clear"
                buttonStyle={styles.sighUpButtonStyle}
                titleStyle={styles.signUpButtonTitle}
                onPress={() => this.signUpButttonClicked()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
