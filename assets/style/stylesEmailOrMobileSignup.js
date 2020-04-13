import {StyleSheet} from 'react-native';
import {styleCommon, SCREEN_WIDTH, errorTextcolor} from './stylesCommonValues';

export const styles = StyleSheet.create({
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.73,
    marginHorizontal: 10,
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
    marginLeft: 10,
    color: styleCommon.textInputDarkColor,
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: errorTextcolor,
  },
});
