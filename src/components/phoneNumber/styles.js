import { StyleSheet, Dimensions } from 'react-native';
import {
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  DEVICE_NAME,
  errorTextcolor,
} from '../../../assets/style/stylesCommonValues';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 16,
    paddingTop: 10,
    color: styleCommon.headerTitleColor,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
  },
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
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
    width: SCREEN_WIDTH * 0.60,
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
});
