import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native-elements';
import PhoneNumberPicker from '../components/phoneNumber/PhoneNumberPicker';
import {styleCommon} from '../../assets/style/stylesCommonValues';
import {styles} from '../../assets/style/stylesPhoneAuthScreen';
import Loading from '../components/Loading';
import {SMS_ICON} from '../common/Common';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ResendButton from '../components/ResendButton';
// import analytics from '@react-native-firebase/analytics';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class PhoneAuthScreen extends Component {
  state = {
    phoneNumber: '',
    confirmResult: null,
    verificationCode: '',
    userId: '',
    phNumWithoutCountryCode: '',
    countryCode: '',
    isLoading: false,
    sendingSms: false,
    autoValidating: false,
    user: {},
  };

  onAuthStateChanged = (user) => {
    const {confirmResult, verificationCode} = this.state;
    // For few devices the OTP(verification code) is auto-mapped so does not need to verify the code and the user will be automatically be logged in after signInWithPhoneNumber
    if (user?.uid && confirmResult && verificationCode?.length !== 6) {
      //this.setState({user});
      this.setState({isLoading: true, sendingSms: false, autoValidating: true});
      const {createUserWithPhoneNumber} = this.props;
      this.unSubscribe();
      createUserWithPhoneNumber(user);
    }
  };

  componentDidMount() {
    this.unSubscribe = auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);
  };

  handleSendCode = async ({
    phoneNumber,
    phNumWithoutCountryCode,
    countryCode,
  }) => {
    const {setShowSocialOptions} = this.props;
    this.setState({isLoading: true, sendingSms: true});
    setShowSocialOptions(false, true);
    // Request to send OTP
    try {
      const confirmResult = await auth().signInWithPhoneNumber(phoneNumber);
      this.setState({
        confirmResult,
        phoneNumber,
        phNumWithoutCountryCode,
        countryCode,
        isLoading: false,
      });
      // Alert.alert('code sent to phone');
    } catch (err) {
      Alert.alert(
        err.toString().includes('popup-closed-by-user')
          ? 'Cancelled!'
          : 'Oops!',
        err.toString().includes('popup-closed-by-user')
          ? 'Looks like you cancelled the login process. Do choose your sign up method from the given options.'
          : 'Some error occurred. Please try again after sometime.',
      ); // err.message);
      // console.log(
      //   'Error Occured while in the try catch of signinwithPhonenumber: ',
      //   err,
      // );
      this.setState({isLoading: false});
      setShowSocialOptions(true, undefined);
    }
  };

  handleVerifyCode = (verificationCode) => {
    // Request for OTP verification
    const {confirmResult} = this.state;
    const {createUserWithPhoneNumber} = this.props;
    this.setState({isLoading: true, verificationCode, sendingSms: false});
    //console.log('verifying the code', verificationCode);
    if (verificationCode.length === 6) {
      confirmResult
        .confirm(verificationCode)
        .then((user) => {
          //this.setState({userId: user.uid});
          //alert(`Verified! ${user.uid}`);
          this.unSubscribe();
          createUserWithPhoneNumber(user);
        })
        .catch((error) => {
          Alert.alert(
            'Invalid OTP.',
            'Looks like you have entered the wrong OTP. Please re-check and try again later.',
          );
          // console.log(
          //   'Error while creating the user or logging in the user by phone auth: ',
          //   error,
          // );
          this.setState({isLoading: false, verificationCode: ''});
        });
    } else {
      Alert.alert('Incorrect', 'Please enter a 6 digit OTP code.');
      this.setState({isLoading: false, verificationCode: ''});
    }
  };

  reEnterPhoneNumber = () => {
    const {setShowSocialOptions} = this.props;
    this.setState({confirmResult: null, phNumWithoutCountryCode: ''});
    setShowSocialOptions(true, false);
  };

  resendCode = () => {
    this.handleSendCode(this.state);
  };

  renderConfirmationCodeView = () => {
    const {phoneNumber} = this.state;
    const {loadingMessage} = this.props;
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'android' && -1000}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
          contentContainerStyle={styles.modalContainer}>
          <View
            style={
              loadingMessage.includes('Signing')
                ? styles.verificationSignUpContainer
                : styles.verificationContainer
            }>
            <Text style={styles.verificationTitle}>
              Verify your phone number
            </Text>
            <Text style={styles.verificationDesc}>
              Enter the 6-digit code we sent to {phoneNumber}
            </Text>
            <Image source={SMS_ICON} style={styles.iconImageStyle} />
            <View style={styles.verificationCodeContainer}>
              <OTPInputView
                style={styles.otpInput}
                pinCount={6}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                placeholderTextColor={styleCommon.textColor1}
                onCodeFilled={(code) => {
                  this.handleVerifyCode(code);
                }}
              />
            </View>
            <ResendButton resendCode={this.resendCode} />
            <View style={styles.verificationPhNumContainer}>
              <Text style={styles.clickHere}>
                Not your number? Click below to change
              </Text>
              <Button
                title={phoneNumber}
                titleStyle={styles.verificationPhNum}
                type="clear"
                onPress={() => this.reEnterPhoneNumber()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
  };

  render() {
    const {
      confirmResult,
      phNumWithoutCountryCode,
      countryCode,
      isLoading,
      sendingSms,
      autoValidating,
    } = this.state;
    const {loadingMessage, isSignup} = this.props;
    let loadingMsg = sendingSms
      ? 'Sending the verification code...'
      : loadingMessage;
    if (autoValidating) {
      loadingMsg = 'Auto-validating the verification code...';
    }
    return (
      <React.Fragment>
        {isLoading ? (
          <Loading
            resizeMode={
              (sendingSms || loadingMessage.includes('Signing')) && 'contain'
            }
            text={loadingMsg}
            animationStr={
              sendingSms
                ? require('../../assets/jsons/phone_sms_code_animation.json')
                : loadingMessage.includes('Signing')
                ? require('../../assets/jsons/user_animation_4.json')
                : require('../../assets/jsons/logging_animation.json')
            }
            isTextBold={true}
            takeFullHeight={false}
          />
        ) : (
          <React.Fragment>
            {confirmResult ? (
              this.renderConfirmationCodeView()
            ) : (
              <PhoneNumberPicker
                isSignup={isSignup}
                sendCodeToPhone={this.handleSendCode}
                phoneNumber={phNumWithoutCountryCode}
                countryCode={countryCode}
              />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default PhoneAuthScreen;
