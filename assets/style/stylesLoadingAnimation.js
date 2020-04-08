import {StyleSheet} from 'react-native';
import {
  styleCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  fontsCommon,
} from '../../assets/style/stylesCommonValues';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    //backgroundColor: "orangered"
  },
  watermelonAnimationStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 30, // 20
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.615,
    //backgroundColor: "teal"
  },
  textViewContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.37,
    //backgroundColor: "cornsilk"
  },
  textStyle: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: fontsCommon.font30,
    fontWeight: '700',
    color: styleCommon.textColor1,
  },
});
