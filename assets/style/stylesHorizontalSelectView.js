import {StyleSheet} from 'react-native';
import {
  styleCommon,
  fontsCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  DEVICE_NAME,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineContainer: {
    height: 3,
    borderTopWidth: 3,
    borderColor: styleCommon.disableColor,
    width: 54, //65 Make dynamic
  },
  iconStyle: {
    height: 25, //15, Make dynamic
    width: 25, //15, Make dynamic
    backgroundColor: styleCommon.disableColor,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDataStyle: {
    height: 20, //10, Make dynamic
    width: 20, //10, Make dynamic
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextStyle: {
    fontSize: 11,
    color: styleCommon.textColor1,
  },
  labelContainer: {
    width: DEVICE_NAME.includes('iPhone 11') ? SCREEN_WIDTH * 0.07 : SCREEN_WIDTH * 0.08, //32,
    height: DEVICE_NAME.includes('iPhone 11') ? SCREEN_HEIGHT * 0.03 : SCREEN_HEIGHT * 0.04, //32,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: fontsCommon.font10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: styleCommon.textColorDesc,
  },
});
