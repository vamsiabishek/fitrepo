import {Platform, StyleSheet} from 'react-native';
import {
  DEVICE_NAME,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  bottomNav: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom:
      Platform.OS === 'ios'
        ? DEVICE_NAME.includes('iPhone 11')
          ? 40
          : 20
        : 10,
    //backgroundColor: "rebeccapurple"
  },
  navButtonActive: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.09,
    borderRadius: (SCREEN_HEIGHT * 0.09) / 2,
    opacity: 1,
  },
  navButtonDisabled: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.09,
    borderRadius: (SCREEN_HEIGHT * 0.09) / 2,
    opacity: 0.6,
  },
  activeButtonTitle: {
    fontWeight: '700',
    fontSize: fontsCommon.font20,
    color: styleCommon.textColor2,
  },
  buttonTitle: {
    fontWeight: '600',
    fontSize: fontsCommon.font20,
    color: styleCommon.textColor2,
  },
  navButtonIcon: {
    position: 'absolute',
    right: 20,
    color: styleCommon.textColor2,
  },
});
