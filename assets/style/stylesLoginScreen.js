import {StyleSheet} from 'react-native';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
  errorTextcolor,
  BUTTON_HEIGHT_GENERAL,
  fontsCommon,
  BG_COLOR,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    marginVertical: SCREEN_HEIGHT * 0.05,
    backgroundColor: BG_COLOR, //BG_COLOR, orange
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    marginVertical: SCREEN_HEIGHT * 0.1,
    backgroundColor: BG_COLOR, //BG_COLOR, orange
  },
  loginView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.01,
    //backgroundColor: "pink"
  },
  logoContainer: {
    //marginVertical: SCREEN_HEIGHT * 0.08,
    height: 100,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 2, height: 20},
    shadowOpacity: 0.5,
    shadowRadius: 4.5,
    //backgroundColor: "brown",
  },
  logoText: {
    padding: 5,
    letterSpacing: fontsCommon.letterSpacingOneFive,
    fontWeight: '700',
    fontSize: fontsCommon.font50,
    color: styleCommon.secondaryColorNew,
    //backgroundColor: "firebrick"
  },
  loginInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //width: SCREEN_WIDTH * 0.9,
    //margin: 5,
    //backgroundColor: "chocolate",
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    //backgroundColor: "crimson"
  },
  inputContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: styleCommon.textInputColor,
    height: 55,
    marginTop: 6,
    backgroundColor: 'white',
  },
  inputStyle: {
    marginLeft: 10,
    color: styleCommon.textColor1,
  },
  errorInputStyle: {
    textAlign: 'center',
    fontSize: fontsCommon.font12,
    color: errorTextcolor,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowOffset: {width: 2, height: 8},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    //backgroundColor: "orange"
  },
  loginButtonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "gold"
  },
  loginButtonStyle: {
    width: SCREEN_WIDTH * 0.73,
    height: BUTTON_HEIGHT_GENERAL,
    borderColor: 'transparent',
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  socialMediaLoginBtn: {
    width: SCREEN_WIDTH * 0.38,
  },
  loginButtonText: {
    fontSize: fontsCommon.font16,
    fontWeight: 'bold',
    color: styleCommon.textColor2,
  },
  loginButtonIcon: {
    paddingLeft: 5,
    color: styleCommon.textColor2,
  },
  loginButtonDes: {
    color: styleCommon.textColor1,
  },
  signUpHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    // shadowOffset: { width: 2, height: 8 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3
    //backgroundColor: "coral"
  },
  newUserText: {
    fontSize: fontsCommon.font16,
    color: styleCommon.textColor2,
  },
  signUpButtonTitle: {
    color: styleCommon.secondaryColor,
    fontSize: fontsCommon.font15,
    fontWeight: 'bold',
  },
  seeUnseeButtonStyle: {
    backgroundColor: 'transparent',
  },
  iconImageStyle: {
    width: SCREEN_HEIGHT * 0.15,
    height: SCREEN_HEIGHT * 0.15,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: 'pink',
    // marginTop: 10,
    //marginBottom: SCREEN_HEIGHT * 0.05,
  },
});
