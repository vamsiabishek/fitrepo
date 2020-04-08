import {StyleSheet} from 'react-native';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon,
  fontsCommon,
} from '../../assets/style/stylesCommonValues';

export const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    // backgroundColor: "pink"
  },
  flatListContentContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    // backgroundColor: "purple"
  },
  returnViewContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: "firebrick"
  },
  subContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineContainer: {
    height: SCREEN_HEIGHT * 0.093, //62
    width: SCREEN_WIDTH * 0.13, //50,
    marginLeft: 45,
    borderLeftWidth: 3,
    borderColor: styleCommon.secondaryButtonColor,
    //backgroundColor: "magenta"
  },
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT * 0.15,
    width: SCREEN_HEIGHT * 0.15, //SCREEN_WIDTH * 0.32,
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: (SCREEN_HEIGHT * 0.15) / 2,
  },
  iconImageStyle: {
    width: SCREEN_HEIGHT * 0.1 - 19,
    height: SCREEN_HEIGHT * 0.1,
    tintColor: styleCommon.textColor1,
  },
  iconDataStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT * 0.12,
    width: SCREEN_HEIGHT * 0.12, //SCREEN_WIDTH * 0.27,
  },
  iconTextStyle: {
    fontSize: fontsCommon.font70,
  },
  levelDecriptionContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  levelTitleStyle: {
    fontSize: fontsCommon.font15,
    fontWeight: 'bold',
    color: styleCommon.textColorDesc,
  },
  levelDescriptionStyle: {
    width: SCREEN_WIDTH * 0.48, //180,
    fontSize: fontsCommon.font13,
    color: styleCommon.textColorDesc,
  },
});
