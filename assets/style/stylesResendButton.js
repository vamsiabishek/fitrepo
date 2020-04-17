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
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendButtonStyle: {
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
