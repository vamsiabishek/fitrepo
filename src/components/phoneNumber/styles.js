import {StyleSheet} from 'react-native';
import {
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  SCREEN_HEIGHT,
} from '../../../assets/style/stylesCommonValues';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SCREEN_HEIGHT * 0.3,
    // borderWidth:1,
  },
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 25,
    paddingTop: 10,
    color: styleCommon.headerTitleColor,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeContainer: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: SCREEN_WIDTH * 0.04,
    padding: 8,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: styleCommon.textInputColor,
  },
  basicContainer: {
    //flex: 1,
    //justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH * 0.9,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  countryPickerModal: {
    flex: 1,
    marginTop: SCREEN_HEIGHT * 0.1,
    marginBottom: SCREEN_HEIGHT * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleCommon.secondaryColorNew,
  },
  buttonView: {
    flex: 1,
    width: SCREEN_WIDTH * 0.9,
    padding: 8,
    borderTopColor: 'lightgrey',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  bottomPicker: {
    width: SCREEN_WIDTH,
  },
  flag: {
    height: 20,
    width: 30,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#cecece',
    backgroundColor: '#cecece',
  },
  text: {
    height: 20,
    margin: 15,
    justifyContent: 'center',
    borderBottomWidth: 1,
    color: 'black',
  },

  inputViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.6,
    marginBottom: 8,
  },
  inputContainer: {
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    color: styleCommon.textInputDarkColor,
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: 'white',
  },
  mainBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: SCREEN_HEIGHT * 0.7,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeListContainer: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SCREEN_WIDTH * 0.03,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingVertical: SCREEN_WIDTH * 0.05,
  },
  countryName: {
    fontSize: fontsCommon.font18,
  },
  headerButtons: {
    fontSize: fontsCommon.font15,
  },
  buttonContainer: {
    marginTop: SCREEN_HEIGHT * 0.01,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },

  buttonStyle: {
    height: SCREEN_HEIGHT * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonGradiant: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.82,
    height: SCREEN_HEIGHT * 0.06, // 110
    borderRadius: SCREEN_HEIGHT * 0.07, // 60,
  },

  buttonTitle: {
    fontSize: fontsCommon.font16,
    fontWeight: 'bold',
    color: styleCommon.textColorWhite,
    alignSelf: 'center',
  },
});
