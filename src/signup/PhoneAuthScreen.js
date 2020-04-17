import React, {Component} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native-elements';
import PhoneNumberPicker from '../components/phoneNumber/PhoneNumberPicker';
import {
  styleCommon,
  ICON_SIZE_SMALL,
} from '../../assets/style/stylesCommonValues';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../assets/style/stylesPhoneAuthScreen';
import Loading from '../components/Loading';
import {SMS_ICON} from '../common/Common';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ResendButton from '../components/ResendButton';

class PhoneAuthScreen extends Component {
  state = {
    phoneNumber: '',
    confirmResult: null,
    verificationCode: '',
    userId: '',
    phNumWithoutCountryCode: '',
    countryCode: '',
    isLoading: false,
  };

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);
  };

  handleSendCode = async ({
    phoneNumber,
    phNumWithoutCountryCode,
    countryCode,
  }) => {
    // console.log('sending verification code to', phoneNumber);
    const {setShowSocialOptions} = this.props;
    this.setState({isLoading: true});
    setShowSocialOptions(false);
    // Request to send OTP
    const confirmResult = await auth().signInWithPhoneNumber(phoneNumber);
    this.setState({
      confirmResult,
      phoneNumber,
      phNumWithoutCountryCode,
      countryCode,
      isLoading: false,
    });
  };

  handleVerifyCode = (verificationCode) => {
    // Request for OTP verification
    const {confirmResult} = this.state;
    const {createUserWithPhoneNumber} = this.props;
    this.setState({isLoading: true, verificationCode});
    //console.log('verifying the code', verificationCode);
    if (verificationCode.length === 6) {
      confirmResult
        .confirm(verificationCode)
        .then((user) => {
          //this.setState({userId: user.uid});
          //alert(`Verified! ${user.uid}`);
          createUserWithPhoneNumber(user);
        })
        .catch((error) => {
          this.setState({isLoading: false, verificationCode: ''});
          Alert.alert('Invalid OTP.');
          console.log(
            'Error while creating the user or logging in the user by phone auth: ',
            error,
          );
        });
    } else {
      this.setState({isLoading: false, verificationCode: ''});
      Alert.alert('Please enter a 6 digit OTP code.');
    }
  };

  reEnterPhoneNumber = () => {
    const {setShowSocialOptions} = this.props;
    this.setState({confirmResult: null});
    setShowSocialOptions(true);
  };

  resendCode = () => {
    this.handleSendCode(this.state);
  };

  renderConfirmationCodeView = () => {
    const {phoneNumber} = this.state;
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your phone number</Text>
        <View style={styles.verificationSubContainer}>
          <View style={styles.imageContainer}>
            <Image source={SMS_ICON} style={styles.iconImageStyle} />
          </View>
          <View style={styles.verificationDescContainer}>
            <Text style={styles.verificationDesc}>
              Enter the 6-digit code we sent to
            </Text>
            <View style={styles.verificationPhNumContainer}>
              <Button
                title={phoneNumber}
                titleStyle={styles.verificationPhNum}
                type="clear"
                onPress={() => this.reEnterPhoneNumber()}
              />
              <Icon
                name="arrow-left"
                color={styleCommon.iconColor}
                size={ICON_SIZE_SMALL}
                style={styles.iconStyle}
              />
              <Text style={styles.clickHere}>click to change</Text>
            </View>
          </View>
        </View>
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
      </View>
    );
  };

  render() {
    const {
      confirmResult,
      phNumWithoutCountryCode,
      countryCode,
      isLoading,
    } = this.state;
    const {loadingMessage} = this.props;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Loading
            text={loadingMessage}
            animationStr={require('../../assets/jsons/user_animation_4.json')}
            isTextBold={false}
            takeFullHeight={false}
          />
        ) : (
          <View>
            {confirmResult ? (
              this.renderConfirmationCodeView()
            ) : (
              <PhoneNumberPicker
                sendCodeToPhone={this.handleSendCode}
                phoneNumber={phNumWithoutCountryCode}
                countryCode={countryCode}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

export default PhoneAuthScreen;
