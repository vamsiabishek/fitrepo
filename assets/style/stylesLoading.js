import {StyleSheet} from 'react-native';
import {
  styleCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  fontsCommon,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.49,
    //backgroundColor: styleCommon.secondaryColor
  },
  watermelonAnimationStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.25,
    //backgroundColor: "teal"
  },
  textViewContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: fontsCommon.font30,
    fontWeight: '700',
    color: styleCommon.textColor1,
  },
});
