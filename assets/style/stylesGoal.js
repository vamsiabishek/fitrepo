import {StyleSheet} from 'react-native';
import {
  SCREEN_WIDTH,
  styleCommon,
  SCREEN_HEIGHT,
  fontsCommon,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.18, // 150
    // backgroundColor: "rosybrown"
  },
  buttonStyle: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT * 0.12, //80,
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 10,
    borderBottomWidth: 0,
    shadowColor: 'grey',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  activeButtonStyle: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT * 0.12, //80,
    backgroundColor: styleCommon.selectedButtonColor,
    borderRadius: 10,
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
    fontWeight: '600',
    fontSize: fontsCommon.font18,
    color: styleCommon.textColor1,
    //backgroundColor: "sandybrown"
  },
  activeButtonTitle: {
    fontWeight: '600',
    fontSize: fontsCommon.font18,
    color: styleCommon.textColor2,
    //backgroundColor: "sandybrown"
  },

  buttonIcon: {
    position: 'absolute',
    left: 45,
    //backgroundColor: "tomato"
  },
});
