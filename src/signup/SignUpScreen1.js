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
import { Input, Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../../assets/style/stylesSignUpScreen1";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, database } from "../common/FirebaseConfig";
import {
  EMAIL_VERIFICATION,
  ICON_SIZE,
  GRADIENT_COLORS_ARRAY,
  GRADIENT_COLORS_ARRAY_INPUT,
  PASSWORD_LENGTH_MINIMUM,
  GRADIENT_COLORS_ARRAY_BUTTON
} from "../common/Common";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class SignUpScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: "",
      email: "",
      password: "",
      confirmationPassword: "",
      usernameValid: true,
      emailValid: true,
      passwordValid: true,
      confirmationPasswordValid: true
    };
  }

  validateUsername = () => {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  };
  validateEmail = () => {
    const { email } = this.state;
    const emailValid = EMAIL_VERIFICATION.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  };
  validatePassword = () => {
    const { password } = this.state;
    const passwordValid = password.length >= PASSWORD_LENGTH_MINIMUM;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  };
  validateConfirmationPassword = () => {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    confirmationPasswordValid || this.confirmationPasswordInput.shake();
    return confirmationPasswordValid;
  };
  createUserWithDetails = async user => {
    const { username, email } = this.state;
    const { navigate } = this.props.navigation;
    const newUser = {
      username,
      email
    };
    database
      .ref("users")
      .child(user.uid)
      .set(newUser)
      .then(() => {
        //console.log(
        //  "Successfully create new user with details in page SignUpScreen1."
        //);
        this.setState({ isLoading: false });
        navigate("SignUpScreen2");
      })
      .catch(error => {
        this.setState({ isLoading: false });
        //console.log(
        //  "error while creating new user with details in page SignUpScreen1."
        //);
      });
  };
  goToSignUpScreen2 = async () => {
    LayoutAnimation.easeInEaseOut();
    const usernameValid = this.validateUsername();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmationPasswordValid = this.validateConfirmationPassword();
    const { email, password } = this.state;
    if (
      usernameValid &&
      emailValid &&
      passwordValid &&
      confirmationPasswordValid
    ) {
      this.setState({ isLoading: true });
      try {
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then(userObj => this.createUserWithDetails(userObj.user))
          .catch(error => {
            this.setState({ isLoading: false });
            //console.log(
            //  "error while creating user with email and password",
            //  error
            //);
            alert(error.message);
          });
      } catch (error) {
        this.setState({ isLoading: false });
        //console.log(
        //  "error before creating user with email and password",
        //  error
        //);
      }
    }
  };
  loginButtonClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("Login");
  };

  render() {
    const {
      isLoading,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid
    } = this.state;
    return (
      <ImageBackground
        source={require("../../assets/images/SignUp_Photo_Slide_1.jpg")}
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
              <Text style={styles.signUpText}>Sign Up</Text>
            </View>
            <View style={styles.inputOuterViewContainer}>
              {/*<LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={GRADIENT_COLORS_ARRAY_INPUT}
                style={styles.inputGradientContainer}
              >*/}
              <Input
                placeholder="Username"
                placeholderTextColor={styles.inputStyle.color}
                leftIcon={
                  <Icon name="account-box" color="black" size={ICON_SIZE} />
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
                onChangeText={username => this.setState({ username })}
                value={username}
                ref={input => (this.usernameInput = input)}
                onSubmitEditing={() => {
                  this.setState({ usernameValid: this.validateUsername });
                  this.emailInput.focus();
                }}
                errorMessage={
                  usernameValid ? null : "Your username can't be blank"
                }
              />
              {/*<LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={GRADIENT_COLORS_ARRAY_INPUT}
                style={styles.inputGradientContainer}
              >*/}
              <Input
                placeholder="Email"
                placeholderTextColor={styles.inputStyle.color}
                leftIcon={<Icon name="email" color="black" size={ICON_SIZE} />}
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
                onChangeText={email => this.setState({ email })}
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
              {/*<LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={GRADIENT_COLORS_ARRAY_INPUT}
                style={styles.inputGradientContainer}
              >*/}
              <Input
                placeholder="Password"
                leftIcon={<Icon name="lock" color="black" size={ICON_SIZE} />}
                containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                placeholderTextColor={styles.inputStyle.color}
                errorStyle={styles.errorInputStyle}
                secureTextEntry={true}
                keyboardAppearance="dark"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit={true}
                returnKeyType="done"
                onChangeText={password => this.setState({ password })}
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
              {/*<LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={GRADIENT_COLORS_ARRAY_INPUT}
                style={styles.inputGradientContainer}
              >*/}
              <Input
                placeholder="Confirm Password"
                leftIcon={
                  <Icon name="asterisk" color="black" size={ICON_SIZE} />
                }
                containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                placeholderTextColor={styles.inputStyle.color}
                errorStyle={styles.errorInputStyle}
                onChangeText={confirmationPassword =>
                  this.setState({ confirmationPassword })
                }
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
                  confirmationPasswordValid
                    ? null
                    : "The Passwords do not match !"
                }
              />
            </View>
            {/*<LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={GRADIENT_COLORS_ARRAY_BUTTON}
              style={styles.inputGradientContainer}
            >*/}
            <Button
              title="SIGN UP"
              containerStyle={styles.signUpButtonContainer}
              buttonStyle={styles.signUpButton}
              titleStyle={styles.signUpButtonText}
              icon={
                <Icon
                  name="account-plus"
                  size={ICON_SIZE}
                  style={styles.signUpButtonIconStyle}
                />
              }
              iconRight={true}
              loading={isLoading}
              onPress={this.goToSignUpScreen2}
            />
          </KeyboardAvoidingView>
          <View style={styles.loginHereContainer}>
            <Text style={styles.alreadyAccountText}>
              Already have an account?
            </Text>
            <Button
              title="LOGIN"
              type="clear"
              buttonStyle={styles.loginButtonStyle}
              titleStyle={styles.loginHereText}
              onPress={() => this.loginButtonClicked()}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
