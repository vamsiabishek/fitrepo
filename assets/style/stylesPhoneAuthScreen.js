import {StyleSheet} from 'react-native';
import {
  styleCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  BUTTON_HEIGHT_GENERAL,
  fontsCommon,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  verifyButtonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "gold"
  },
  verifyButtonStyle: {
    width: SCREEN_WIDTH * 0.3,
    height: BUTTON_HEIGHT_GENERAL,
    borderColor: 'transparent',
    //borderRadius: 30,
    backgroundColor: 'transparent',
  },
  socialMediaLoginBtn: {
    width: SCREEN_WIDTH * 0.35,
  },
  verifyButtonText: {
    fontSize: fontsCommon.font16,
    fontWeight: 'bold',
    color: styleCommon.textColor2,
  },
  inputViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.4,
    marginBottom: 8,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: styleCommon.textInputColor,
    height: 55,
    marginTop: 6,
    //paddingLeft: 5,
    backgroundColor: 'white',
  },
  inputStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    color: styleCommon.textInputDarkColor,
    fontSize: 16,
  },
  verificationContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  verificationTitle: {
    fontSize: fontsCommon.font24,
    fontWeight: 'bold',
    paddingBottom: 45,
    paddingTop: 10,
    color: styleCommon.headerTitleColor,
  },
  verificationDescContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
  verificationDesc: {
    fontSize: fontsCommon.font14,
    fontWeight: 'bold',
    paddingTop: 10,
    color: styleCommon.headerTitleColor,
  },
  verificationPhNumContainer: {
    flexDirection: 'row',
    marginLeft: -10,
  },
  verificationPhNum: {
    fontSize: fontsCommon.font15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    //paddingBottom: 16,
    color: styleCommon.headerTitleColor,
  },
  clickHere: {
    fontSize: fontsCommon.font13,
    color: styleCommon.headerTitleColor,
    marginTop: 12,
  },
  iconStyle: {
    marginTop: 12,
  },
  verificationCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    //marginTop: 15,
    //marginLeft: -10,
  },
  verificationSubContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  iconImageStyle: {
    width: SCREEN_HEIGHT * 0.08,
    height: SCREEN_HEIGHT * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
  },
  otpInput: {
    width: '70%',
    height: SCREEN_HEIGHT * 0.08,
  },
  underlineStyleBase: {
    width: SCREEN_HEIGHT * 0.04,
    //height: 45,
    borderWidth: 1,
    backgroundColor: 'white',
    color: styleCommon.textColor1,
    fontSize: 18,
    borderRadius: 6,
    //borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
