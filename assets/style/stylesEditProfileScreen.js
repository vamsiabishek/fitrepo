import {StyleSheet} from 'react-native';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon,
  fontsCommon,
  DEVICE_NAME,
  BG_COLOR,
} from './stylesCommonValues';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: BG_COLOR,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    //backgroundColor: "white"
  },
  subScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 10,
    //backgroundColor: "purple"
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'purple',
  },
  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    //backgroundColor: 'grey',
  },
  headerText: {
    color: styleCommon.headerTitleColor,
    fontSize: fontsCommon.font30,
    letterSpacing: fontsCommon.letterSpacingOneFive,
  },
  inputOuterViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
    // backgroundColor: 'orange',
  },
  inputViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 10,
    borderColor: styleCommon.secondaryColorNew,
    backgroundColor: styleCommon.secondaryColorNew,
  },
  inputContainer: {
    width: '90%',
    height: SCREEN_HEIGHT * 0.07,
    borderBottomWidth: 0,
    //backgroundColor: 'yellow',
  },
  inputStyle: {
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font18,
    //backgroundColor: 'purple',
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  radioButtonView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH - 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent', // "white"
  },
  radioButtonTextIconStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
  },
  radioButtonTextStyle: {
    flexDirection: 'row',
    marginLeft: 35,
    paddingTop: 5,
    paddingHorizontal: 5,
    //backgroundColor: "blue"
  },
  radioButtonOuterIconStyle: {
    color: styleCommon.textColor1,
    //backgroundColor: "blue"
  },
  radioButtonWrapStyle: {
    marginLeft: 40,
  },
  radioButtonsWrapperStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 36,
    padding: 5,
    //backgroundColor: "pink"
  },
  levelRadioButtonsWrapperStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 0,
    padding: 5,
    //backgroundColor: "blue"
  },
  radioButtonText: {
    paddingLeft: 9,
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font15,
  },
  radioButtonLabelStyle: {
    marginRight: 15,
    paddingLeft: 4,
    paddingRight: 4,
    color: styleCommon.textColor1,
    //backgroundColor: "red"
  },
  levelRadioButtonLabelStyle: {
    marginRight: 5,
    paddingLeft: 4,
    paddingRight: 4,
    color: styleCommon.textColor1,
    //backgroundColor: "red"
  },
  radioButtonDes: {
    borderWidth: 1,
    color: styleCommon.textColor1,
  },
  errorInputStyle2: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
    fontSize: fontsCommon.font12,
  },
  numericInputButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH - 50,
    borderBottomColor: 'transparent',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    //backgroundColor: "white"
  },
  numericInputButtonTextIconStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
  },
  numericInputButtonTextStyle: {
    flexDirection: 'row',
    paddingTop: 5,
    marginLeft: 8,
  },
  numericInputButtonIconStyle: {
    color: styleCommon.textColor1,
    marginBottom: 10,
  },
  numericInputButtonText: {
    marginTop: 5,
    paddingLeft: 9,
    paddingRight: 10,
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font15,
  },
  numericInputButtonTextSmall: {
    marginTop: 5,
    paddingLeft: 9,
    paddingRight: 10,
    color: '#44484E',
    fontSize: fontsCommon.font10,
  },
  numberPickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  numberPickerIconStyle: {
    color: '#28292B',
  },
  numberPickerButtonDes: {
    color: styleCommon.textColor2,
    backgroundColor: styleCommon.textColor1,
  },
  btsButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    marginBottom: 20,
    //backgroundColor: 'red',
  },
  btsButtonStyle: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.07,
    borderColor: 'transparent',
    borderRadius: 80,
    backgroundColor: styleCommon.secondaryButtonColor,
  },
  btsButtonText: {
    fontSize: fontsCommon.font18,
    fontWeight: 'bold',
    letterSpacing: fontsCommon.letterSpacingOneFive,
    color: styleCommon.textColor2,
  },
  btsButtonIconStyle: {
    position: 'absolute',
    left: 20,
    color: styleCommon.textColor2,
  },
  profileButtonHeaderContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 20,
    //backgroundColor: 'blueviolet',
  },
  profileButtonContainer: {
    width: SCREEN_WIDTH,
    height: 80,
    //backgroundColor: 'pink',
  },
  profileButtonContainerStyle: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: DEVICE_NAME.includes('iPhone 11') ? 20 : 0,
    //backgroundColor: 'cyan',
  },
  profileButtonStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  profileButtonTitleStyle: {
    fontSize: fontsCommon.font15,
    fontWeight: 'bold',
    color: styleCommon.textColor1,
  },
  profileButtonIconStyle: {
    color: styleCommon.textColor1,
    paddingTop: 2,
  },
  avatarOverlayContainerStyle: {
    backgroundColor: '#636568',
  },
  avatarImagePropsStyle: {
    backgroundColor: '#636568',
  },

  //gender css
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonStyle: {
    width: SCREEN_WIDTH * 0.2, //140,
    height: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.1
      : SCREEN_HEIGHT * 0.12, //140,
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 20,
    borderBottomWidth: 0,
    shadowColor: 'grey',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 0,
  },
  activeButtonStyle: {
    width: SCREEN_WIDTH * 0.2, //140,
    height: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.1
      : SCREEN_HEIGHT * 0.12, //140,
    backgroundColor: styleCommon.selectedButtonColor,
    borderRadius: 20,
    borderBottomWidth: 0,
    shadowColor: 'grey',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 0,
  },
  buttonIcon: {
    height: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.08
      : SCREEN_HEIGHT * 0.1, // 100,
    //backgroundColor: 'red',
  },
});

const stylesDerived = StyleSheet.create({
  inputTouchOpaContainer: {
    ...styles.inputViewContainer,
    width: '100%',
  },
  inputDateContainer: {
    ...styles.inputViewContainer,
    marginBottom: 0,
  },
  btsButtonDisableStyle: {
    ...styles.btsButtonStyle,
    opacity: 0.6,
  },
  btsButtonDisableText: {
    ...styles.btsButtonText,
    color: styleCommon.descTextColor,
    fontWeight: 'normal',
  },
});

console.log(styles.buttonStyle);

export {styles, stylesDerived};
