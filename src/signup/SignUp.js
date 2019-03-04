import React, { Component } from "react";
import {
  LayoutAnimation,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  UIManager,
  View
} from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../../assets/style/stylesSignUpScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, database } from "./../common/FirebaseConfig";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class SignUp extends Component {
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

  createUserWithDetails = async user => {
    const { username, email } = this.state;
    const { navigate } = this.props.navigation;
    const newUser = {
      username,
      email,
      avatar: "http://i.pravatar.cc/300",
      weight: 75,
      height: 175,
      age: 29,
      gender: 'male',
    };
    database
      .ref("users")
      .child(user.uid)
      .set(newUser)
      .then(() => {
        console.log("Successfully create new user with details:");
        this.setState({ isLoading: false });
        navigate("HomeScreen");
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log("error while creating new user with details:", error);
      });
  };

  signup = async () => {
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
            console.log(
              "error while creating user with email and password:",
              error
            );
            alert(error.message);
          });
      } catch (error) {
        this.setState({ isLoading: false });
        console.log(
          "error before creating user with email and password:",
          error
        );
      }
    }
  };
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
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  };
  validatePassword = () => {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
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
  loginButtonClicked = () => {
    const { navigate } = this.props.navigation;
    navigate("LoginScreen");
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
            <Input
              placeholder="Username"
              placeholderTextColor={styles.inputStyle.color}
              leftIcon={<Icon name="user" color="black" size={25} />}
              containerStyle={styles.inputViewContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errorStyle={styles.errorInputStyle}
              onChangeText={username => this.setState({ username })}
              value={username}
              keyboardAppearance="light"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={false}
              returnKeyType="next"
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
              leftIcon={<Icon name="envelope" color="black" size={25} />}
              containerStyle={styles.inputViewContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              placeholderTextColor={styles.inputStyle.color}
              errorStyle={styles.errorInputStyle}
              onChangeText={email => this.setState({ email })}
              value={email}
              keyboardAppearance="light"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={false}
              returnKeyType="next"
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
              leftIcon={<Icon name="lock" color="black" size={27} />}
              containerStyle={styles.inputViewContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              placeholderTextColor={styles.inputStyle.color}
              errorStyle={styles.errorInputStyle}
              onChangeText={password => this.setState({ password })}
              value={password}
              keyboardAppearance="light"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={false}
              returnKeyType="next"
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
              leftIcon={<Icon name="lock" color="black" size={27} />}
              containerStyle={styles.inputViewContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              placeholderTextColor={styles.inputStyle.color}
              errorStyle={styles.errorInputStyle}
              onChangeText={confirmationPassword =>
                this.setState({ confirmationPassword })
              }
              value={confirmationPassword}
              keyboardAppearance="light"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={false}
              returnKeyType="go"
              ref={input => (this.confirmationPasswordInput = input)}
              onSubmitEditing={() => {
                this.setState({
                  confirmationPasswordValid: this.validateConfirmationPassword
                });
                this.signup.focus();
              }}
              errorMessage={
                confirmationPasswordValid
                  ? null
                  : "The Passwords do not match !"
              }
            />
          </View>
          <Button
            title="SIGNUP"
            loading={isLoading}
            containerStyle={styles.signUpButtonContainer}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={this.signup}
            disabled={isLoading}
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
    );
  }
}

export default SignUp;
