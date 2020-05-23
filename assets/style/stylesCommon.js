import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT, BG_COLOR} from './stylesCommonValues';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    //backgroundColor: 'cyan',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: BG_COLOR,
  },
  subContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export {commonStyles};
