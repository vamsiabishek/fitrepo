import {StyleSheet} from 'react-native';
import {
  styleCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  commonValues,
  fontsCommon,
} from '../../assets/style/stylesCommonValues';

export const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.3,
    marginBottom: SCREEN_HEIGHT * 0.4,
    // backgroundColor: 'brown',
  },
  contactUsAnimationContainer: {
    width: '100%',
    height: '70%',
    // backgroundColor: 'blue',
  },
  textViewContainer: {
    width: SCREEN_WIDTH,
    height: '30%',
    paddingHorizontal: 10,
    //backgroundColor: 'purple',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: fontsCommon.font30,
    fontWeight: '700',
    color: styleCommon.textColorDesc,
  },
});
