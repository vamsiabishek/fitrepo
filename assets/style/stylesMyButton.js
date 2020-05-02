import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH, fontsCommon, styleCommon} from './stylesCommonValues';

export const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGradiant: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.77,
    // width: 110,
    height: 40, // 110
    borderRadius: 20, // 60,
  },
  buttonTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    color: styleCommon.textColor2,
    fontWeight: '700',
    fontSize: fontsCommon.font16, //  fontsCommon.font16
    letterSpacing: fontsCommon.letterSpacingOneFive,
  },
  navButtonIcon: {
    position: 'absolute',
    right: 20,
  },
});
