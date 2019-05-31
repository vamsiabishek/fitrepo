import React, { Component } from "react";
import {
  Alert,
  Text,
  View,
  LayoutAnimation,
  UIManager,
  ImageBackground
} from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../../assets/style/stylesForgotPasswordScreen";
import { auth } from "./../common/FirebaseConfig";
import { EMAIL_VERIFICATION, GRADIENT_BG_IMAGE } from "../common/Common";
import {
  btnGradientColorLeft,
  modalBtnGradientColorRight,
  fontsCommon,
  styleCommon
} from "../../assets/style/stylesCommonValues";
import { commonStyles } from "../../assets/style/stylesCommon";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/signup/Header";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValid: true,
      isLoading: false
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

  forgotPassword = () => {
    const { email } = this.state;
    const { navigate } = this.props.navigation;
    this.setState({ isLoading: true });
    auth
      .sendPasswordResetEmail(email)
      .then(user => {
        this.setState({ isLoading: false });
        navigate("LoginScreen");
        alert("Please check your email to change your password !");
      })
      .catch(e => {
        this.setState({ isLoading: false });
        Alert.alert(
          "Oops !",
          email +
            " is not registered with us. Re-enter your email address and try again."
        );
      });
  };

  onBack = () => {
    const { navigate } = this.props.navigation;
    navigate("LoginScreen");
  };

  render() {
    const { email, emailValid, isLoading } = this.state;
    return (
      <ImageBackground style={commonStyles.bgImage} source={GRADIENT_BG_IMAGE}>
        <View style={styles.contentWrapper}>
          <Header
            title="Forgot your password ?"
            onBack={this.onBack}
            showOnCancel={false}
          />
          <View style={styles.forgotPasswordViewWrapper}>
            <View style={styles.changePasswordInsWrapper}>
              <Text style={styles.changePasswordInsTextStyle}>
                To reset your password, enter your email address, press the
                reset password button and further instructions will be sent to
                your email address.
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Your email address here"
                placeholderTextColor={styleCommon.textColor1}
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardAppearance="light"
                keyboardType="email-address"
                returnKeyType="done"
                value={email}
                onChangeText={value => this.onEmailChange(value)}
                ref={input => (this.emailInput = input)}
                onSubmitEditing={() =>
                  this.setState({ emailValid: this.validateEmail })
                }
                errorMessage={
                  emailValid ? null : "Please enter a valid email address"
                }
                style={{
                  fontSize: fontsCommon.font16
                }}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="RESET PASSWORD"
                  loading={isLoading}
                  ViewComponent={LinearGradient}
                  linearGradientProps={{
                    colors: [btnGradientColorLeft, modalBtnGradientColorRight], //btnGradientColorRight
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 }
                  }}
                  containerStyle={styles.loginButtonContainerStyle}
                  buttonStyle={styles.loginButtonStyle}
                  titleStyle={styles.loginButtonText}
                  onPress={() => this.forgotPassword()}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
