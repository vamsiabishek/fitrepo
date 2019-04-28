import React, { Component } from "react";
import { Text, View, LayoutAnimation } from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { Input, Button, SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesLoginScreen";
import { f, auth } from "./../common/FirebaseConfig";
import { EMAIL_VERIFICATION, PASSWORD_LENGTH_MINIMUM } from "../common/Common";
import {
  ICON_SIZE,
  btnGradientColorLeft,
  modalBtnGradientColorRight
} from "../../assets/style/stylesCommonValues";
import Loading from "../components/Loading";
import LinearGradient from "react-native-linear-gradient";

export default class LoginScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "dhivya@gmail.com",
      //email: "vamsi@gmail.com",
      //password: "vamsi123",
      emailValid: true,
      password: "Dhivya09",
      passwordValid: true,
      login_failed: false,
      showLoading: false,
      selectedIndex: 0
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
      this.onLoginSuccess();
    } catch (error) {
      this.setState({ showLoading: false });
      alert("Invalid username/password");
    }
  };
  onFBLogin = () => {
    this.setState({ isLoading: true });
    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => this.getFBTokenFromResponse(result))
      .then(data => this.getFBCredentialsUsingToken(data))
      .then(currentUser => {
        //console.log("current FB User:", currentUser);
        this.onLoginSuccess();
      })
      .catch(error => {
        alert("Login fail with error: " + error);
      });
  };
  getFBTokenFromResponse = result => {
    if (result.isCancelled) {
      this.setState({ isLoading: false });
      return Promise.reject(new Error("The user cancelled the request"));
    }
    console.log(
      "FB login success with permission: ",
      result.grantedPermissions.toString()
    );
    //get access token
    return AccessToken.getCurrentAccessToken();
  };
  getFBCredentialsUsingToken = data => {
    const credentials = f.auth.FacebookAuthProvider.credential(
      data.accessToken
    );
    console.log("credentials:", credentials);
    return f.auth().signInAndRetrieveDataWithCredential(credentials);
  };
  onLoginSuccess = () => {
    this.setState({ showLoading: false });
    this.props.navigation.navigate("HomeScreen");
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
      showLoading,
      isLoading
    } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Loading
            text={"Logging you into Fitrepo..."}
            animationStr={require("../../assets/jsons/user_animation_4.json")}
            isTextBold={false}
          />
        ) : (
          <View style={styles.loginView}>
            <View style={styles.logoContainer}>
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
            <View style={styles.buttonContainer}>
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
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: [btnGradientColorLeft, modalBtnGradientColorRight], //btnGradientColorRight
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 }
                }}
                containerStyle={styles.loginButtonContainerStyle}
                buttonStyle={styles.loginButtonStyle}
                titleStyle={styles.loginButtonText}
                onPress={() => this.submitLoginCredentials()}
              />
            </View>
            <View style={styles.buttonContainer}>
              <SocialIcon
                style={styles.facebookLoginBtn}
                title="Login With Facebook"
                button
                type="facebook"
                onPress={() => this.onFBLogin()}
              />
            </View>
            <View style={styles.signUpHereContainer}>
              <Text style={styles.newUserText}>New here ?</Text>
              <Button
                title="SIGN UP"
                titleStyle={styles.signUpButtonTitle}
                type="clear"
                onPress={() => this.signUpButttonClicked()}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}
