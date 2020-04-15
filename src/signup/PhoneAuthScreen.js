import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Input, Button} from 'react-native-elements';
import PhoneNumberPicker from '../components/phoneNumber/PhoneNumberPicker';
import {
  btnGradientColorLeft,
  modalBtnGradientColorRight,
  styleCommon,
  ICON_SIZE_SMALL,
} from '../../assets/style/stylesCommonValues';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../assets/style/stylesPhoneAuthScreen';

class PhoneAuthScreen extends Component {
  state = {
    phoneNumber: '',
    confirmResult: null,
    verificationCode: '',
    userId: '',
    phNumWithoutCountryCode: '',
    countryCode: '',
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
    console.log('sending verification code to', phoneNumber);
    const {setShowSocialOptions} = this.props;
    // Request to send OTP
    const confirmResult = await auth().signInWithPhoneNumber(phoneNumber);
    this.setState({
      confirmResult,
      phoneNumber,
      phNumWithoutCountryCode,
      countryCode,
    });
    setShowSocialOptions(false);
  };

  handleVerifyCode = () => {
    // Request for OTP verification
    const {confirmResult, verificationCode} = this.state;
    const {createUserWithPhoneNumber} = this.props;
    console.log('verifying the code', verificationCode);
    if (verificationCode.length === 6) {
      confirmResult
        .confirm(verificationCode)
        .then((user) => {
          //this.setState({userId: user.uid});
          //alert(`Verified! ${user.uid}`);
          createUserWithPhoneNumber(user);
        })
        .catch((error) => {
          alert(error.message);
          console.log(error);
        });
    } else {
      alert('Please enter a 6 digit OTP code.');
    }
  };

  reEnterPhoneNumber = () => {
    const {setShowSocialOptions} = this.props;
    this.setState({confirmResult: null});
    setShowSocialOptions(true);
  };

  renderConfirmationCodeView = () => {
    const {verificationCode, phoneNumber} = this.state;
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your phone number</Text>
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
        <View style={styles.verificationCodeContainer}>
          <Input
            maxLength={6}
            placeholder="6-digit code"
            placeholderTextColor="grey"
            containerStyle={styles.inputViewContainer}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
            errorStyle={styles.errorInputStyle}
            keyboardAppearance="light"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={true}
            onChangeText={(verifCode) => {
              this.setState({verificationCode: verifCode});
            }}
            value={verificationCode}
          />
          <Button
            title="VERIFY"
            iconRight={true}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [btnGradientColorLeft, modalBtnGradientColorRight], //btnGradientColorRight
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            containerStyle={styles.verifyButtonContainerStyle}
            buttonStyle={styles.verifyButtonStyle}
            titleStyle={styles.verifyButtonText}
            onPress={this.handleVerifyCode}
          />
        </View>
      </View>
    );
  };

  render() {
    const {confirmResult, phNumWithoutCountryCode, countryCode} = this.state;
    return (
      <View style={styles.container}>
        {confirmResult ? (
          this.renderConfirmationCodeView()
        ) : (
          <PhoneNumberPicker
            sendCodeToPhone={this.handleSendCode}
            phoneNumber={phNumWithoutCountryCode}
            countryCode={countryCode}
          />
        )}
        {/* {this.renderConfirmationCodeView()} */}
      </View>
    );
  }
}

export default PhoneAuthScreen;
