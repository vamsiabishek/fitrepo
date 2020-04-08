import {Dimensions, StyleSheet} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  motherContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    //backgroundColor: "#28292B"
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  signUpText: {
    justifyContent: 'center',
    alignContent: 'center',
    color: 'white',
    fontSize: 60,
    fontFamily: 'Billabong',
  },
  inputOuterViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 40,
    borderWidth: 5,
    borderColor: 'transparent',
    borderRadius: 50,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white',
    opacity: 0.6,
  },
  inputGradientContainer: {
    borderColor: 'transparent',
    borderRadius: 60,
    marginBottom: 5,
  },
  inputViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    borderColor: 'transparent',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 100,
    //height: 45,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  inputStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    color: 'black', // "#44484E",
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  goToHomeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  goToHomeButton: {
    borderRadius: 50,
    width: SCREEN_WIDTH - 40,
    height: 45,
    backgroundColor: '#00DB8D',
  },
  goToHomeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  goToHomeButtonIcon: {
    paddingLeft: 5,
    color: 'white',
  },
  skipStepButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  skipStepButton: {
    borderRadius: 50,
    width: SCREEN_WIDTH - 200,
    height: 35,
    backgroundColor: 'transparent',
  },
  skipStepButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#00DB8D',
  },
  skipStepButtonIcon: {
    paddingTop: 1,
    paddingLeft: 1,
    color: '#00DB8D',
  },
  radioButtonView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH - 100,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  radioButtonWrapStyle: {
    marginLeft: 20,
  },
  radioButtonOuterIconStyle: {
    color: 'black',
    marginBottom: 10,
  },
  radioButtonViewWOBorder: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH - 100,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  radioButtonTextIconStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
  },
  radioButtonTextStyle: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  radioButtonText: {
    paddingLeft: 9,
    color: '#44484E',
    fontSize: 16,
  },
  radioButtonTextSmall: {
    paddingLeft: 9,
    color: '#44484E',
    fontSize: 10,
  },
  radioButtonLabelStyle: {
    paddingLeft: 4,
    paddingRight: 4,
    color: '#44484E',
  },
  radioButtonDes: {
    borderWidth: 1,
    color: '#00DB8D',
  },
  numericInputButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH - 100,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
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
    color: 'black',
    marginBottom: 10,
  },
  numericInputButtonText: {
    marginTop: 5,
    paddingLeft: 9,
    paddingRight: 10,
    color: '#44484E',
    fontSize: 16,
  },
  numericInputButtonTextSmall: {
    marginTop: 5,
    paddingLeft: 9,
    paddingRight: 10,
    color: '#44484E',
    fontSize: 10,
  },
  numberPickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  numberPickerIconStyle: {
    color: 'white',
  },
  numberPickerButtonDes: {
    color: 'black',
    backgroundColor: '#00DB8D',
  },
});

export {styles};
