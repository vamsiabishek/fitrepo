import {StyleSheet, Platform} from 'react-native';
import {
  styleCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  DEVICE_NAME,
} from '../../assets/style/stylesCommonValues';

export const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.2, // 200
    // backgroundColor: "thistle"
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: SCREEN_WIDTH * 0.37, //140,
    height: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.35
      : SCREEN_HEIGHT * 0.42, //140,
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
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  activeButtonStyle: {
    width: SCREEN_WIDTH * 0.37, //140,
    height: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.35
      : SCREEN_HEIGHT * 0.42, //140,
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
  },
  buttonTitle: {
    color: styleCommon.secondaryButtonTextColor,
    fontWeight: '600',
  },
  activeButtonTitle: {
    color: styleCommon.textColor2,
    fontWeight: '600',
  },
  buttonIcon: {
    height:
      Platform.OS === 'android'
        ? SCREEN_HEIGHT * 0.68
        : DEVICE_NAME.includes('iPhone 11')
        ? SCREEN_HEIGHT * 0.28
        : SCREEN_HEIGHT * 0.38, // 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
