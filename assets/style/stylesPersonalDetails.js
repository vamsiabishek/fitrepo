import {StyleSheet, Platform} from 'react-native';
import {
  styleCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  fontsCommon,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "moccasin"
  },
  buttonStyle: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT * 0.097, //65,
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 10,
    borderBottomWidth: 0,
    shadowColor: 'grey',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  activeButtonStyle: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT * 0.097, //65,
    backgroundColor: styleCommon.secondaryColorNew, //styleCommon.selectedButtonColor,
    borderRadius: 10,
    borderBottomWidth: 0,
    shadowColor: 'grey',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonTitle: {
    flex: 1,
    textAlign: 'left',
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font16,
    fontWeight: '400',
  },
  activeButtonTitle: {
    flex: 1,
    textAlign: 'left',
    color: styleCommon.textColor1,
    fontWeight: '700',
  },
  buttonIcon: {
    color: styleCommon.textColor1,
    height: Platform.OS === 'android' ? 50 : 40,
    marginRight: 15,
    //backgroundColor: "red",
  },
  activeButtonIcon: {
    color: styleCommon.selectedButtonColor,
    height: Platform.OS === 'android' ? 50 : 40,
    marginRight: 15,
    //backgroundColor: "red",
  },
  iconImageStyle: {
    width: SCREEN_HEIGHT * 0.05,
    height: SCREEN_HEIGHT * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    //tintColor: styleCommon.textColor1,
  },
});
