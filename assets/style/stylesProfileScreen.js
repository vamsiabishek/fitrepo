import {StyleSheet, Platform} from 'react-native';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon,
  fontsCommon,
  DEVICE_NAME,
  BG_COLOR,
} from './stylesCommonValues';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: BG_COLOR,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: styleCommon.secondaryColor //"pink"
  },
  contactUsAnimationContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'blue',
  },
  actionsHeaderContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: DEVICE_NAME.includes('iPhone 11') ? 40 : 20,
    //backgroundColor: "blueviolet"
  },
  actionsButtonContainerStyle: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionsButtonStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //backgroundColor: "burlywood"
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  actionsButtonTitleStyle: {
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font18,
  },
  bannerHeaderContainer: {
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  bannerContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.15, //220
  },
  bannerImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.15,
  },
  bannergradientStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "white"
  },
  avatarAnimationStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 30, // 20
    width: SCREEN_WIDTH,
    height: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.35
      : SCREEN_HEIGHT * 0.3,
    //backgroundColor: "teal"
    marginBottom: 10,
    marginTop: 10,
    //marginLeft: -10,
  },
  avatarOverlayContainerStyle: {
    backgroundColor: styleCommon.unSelected,
  },
  avatarImagePropsStyle: {
    backgroundColor: styleCommon.unSelected,
  },
  profileBannerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    //backgroundColor: "green"
  },
  profileBannerHeaderTitleStyle: {
    textAlign: 'center',
    color: styleCommon.headerTitleColor,
    fontSize: fontsCommon.font28,
    fontWeight: 'bold',
  },
  profileBannerSubTitleStyle: {
    textAlign: 'center',
    color: styleCommon.headerTitleColor,
    fontSize: fontsCommon.font14,
  },
  profileBannerTitleStyle: {
    textAlign: 'center',
    color: styleCommon.headerTitleColor,
    fontSize: fontsCommon.font16,
  },
  profileSubBannerStyle: {
    flex: 1,
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.1,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    paddingVertical: 5,
    backgroundColor: styleCommon.panelSubHeaderBoxColor, //"rgba(8, 215, 226, .8)"
    //backgroundColor: "indigo"
  },
  profileSubBannerBoxStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    // backgroundColor: 'orange',
  },
  profileBannerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBannerTextStyle: {
    fontSize: fontsCommon.font14,
    color: styleCommon.secondaryColorNew,
    fontWeight: 'bold',
  },
  profileBannerSubTextStyle: {
    fontSize: fontsCommon.font12,
    color: styleCommon.secondaryColorNew,
  },
  profileStarColor: {
    color: '#f8bf45',
  },
  profileButtonIconStyle: {
    color: styleCommon.selectedButtonColor,
  },
  profileButtonStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "yellow"
  },
  scrollViewContainerStyle: {
    flex: 1,
    // backgroundColor: "orange"
  },
  scrollViewContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    marginVertical: SCREEN_HEIGHT * 0.01,
    padding: SCREEN_HEIGHT * 0.01,
    //backgroundColor: 'hotpink',
  },
  boxesStyle: {
    width: '100%',
  },
  boxHeaderContainerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 3,
    marginBottom: 3,
    //backgroundColor: 'green',
  },
  boxHeaderIconStyle: {
    paddingRight: 3,
    color: styleCommon.secondaryColorNew,
  },
  boxHeaderTextStyle: {
    fontSize: fontsCommon.font16,
    fontWeight: 'bold',
    color: styleCommon.secondaryColorNew,
  },
  boxContentRowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'stretch',
    //backgroundColor: 'purple',
  },
  boxContentIconStyle: {
    color: styleCommon.secondaryColorNew,
    //backgroundColor: "indigo"
  },
  boxContentTextStyle: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    padding: 10,
    //backgroundColor: "orange"
  },
  boxContentGoalTextStyle: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    padding: 10,
    //backgroundColor: "black"
  },
  boxTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 2,
    marginVertical: SCREEN_HEIGHT * 0.005,
    paddingHorizontal: 5,
    //backgroundColor: 'grey',
  },
  boxTextStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: fontsCommon.font14,
    fontWeight: 'bold',
    marginLeft: 5,
    color: styleCommon.secondaryColorNew,
  },
  avatarHumanOverlayStyle: {
    backgroundColor: 'transparent',
  },
  progressCircleColor: {
    color: styleCommon.textColor1,
  },
  progressCircleShadowColor: {
    color: styleCommon.unSelected,
  },
  progressCircleBgColor: {
    color: styleCommon.secondaryColor, //"#28292B"
  },
  progressBarBgColorComplete: {
    color: styleCommon.textColor1,
  },
  progressBarBgColor: {
    color: styleCommon.textColor1,
  },
  weightIconStyle: {
    marginTop: 5,
  },
  subHeaderButtonContainerStyle: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: SCREEN_WIDTH * 0.02,
  },
  subHeaderButtonStyle: {
    flexDirection: 'column',
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_HEIGHT * 0.08, //80,
    backgroundColor: 'rgba(0, 0, 0, .3)', //styleCommon.panelHeaderBoxColor,
    borderRadius: SCREEN_HEIGHT * 0.05,
    // borderWidth: 1,
    // borderColor: styleCommon.selectedButtonColor,
    // shadowColor: 'grey',
    // shadowOffset: {width: 2, height: 4},
    // shadowOpacity: 0.6,
    // shadowRadius: 2,
    //elevation: 5,
  },
  subHeaderButtonTitle: {
    fontWeight: '500',
    fontSize: fontsCommon.font13,
    color: styleCommon.secondaryColorNew,
  },
  iconImageStyle: {
    width: SCREEN_HEIGHT * 0.04,
    height: SCREEN_HEIGHT * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -5,
    //tintColor: styleCommon.selectedButtonColor,
  },
  buttonIcon: {
    marginTop: 3,
    height:
      Platform.OS === 'android' ? SCREEN_HEIGHT * 0.05 : SCREEN_HEIGHT * 0.04, //34,
  },
  animationStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 30, // 20
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
    //backgroundColor: "teal"
    marginBottom: -10,
    marginTop: -10,
    marginLeft: -10,
  },
  iconStyle: {
    color: styleCommon.textColor1,
    marginTop: 6,
    height:
      Platform.OS === 'android' ? SCREEN_HEIGHT * 0.03 : SCREEN_HEIGHT * 0.03,
    //backgroundColor: "red",
  },
  smallIconImageStyle: {
    width: SCREEN_HEIGHT * 0.03,
    height: SCREEN_HEIGHT * 0.03,
  },
});

export {styles};
