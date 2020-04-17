import {StyleSheet} from 'react-native';
import {styleCommon, SCREEN_HEIGHT} from './stylesCommonValues';

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.2,
    //backgroundColor: "oldlace"
  },
  iconsWrapper: {
    flexDirection: 'row',
    //backgroundColor: "black"
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: 'grey',
  },
  iconStyle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 10,
    borderRightWidth: 0,
    borderColor: styleCommon.primaryColor,
  },
  overlapOne: {
    borderRightWidth: 0,
  },
  overlapTwo: {
    borderRightWidth: 0,
    position: 'relative',
    left: -10,
  },
  overlapThree: {
    position: 'relative',
    left: -20,
  },
  textColor: {
    color: styleCommon.textColorDesc,
  },
});
