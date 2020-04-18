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
    height: SCREEN_HEIGHT * 0.4,
    // backgroundColor: 'grey',
  },
  watermelonAnimationStyle: {
    height: SCREEN_HEIGHT * 0.25,
    // backgroundColor: "teal",
  },
  textViewContainer: {
    //justifyContent: 'center',
    //alignItems: 'center',
    width: SCREEN_WIDTH,
    //backgroundColor: 'purple',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: fontsCommon.font30,
    fontWeight: '700',
    color: styleCommon.textColorDesc,
  },
});
