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
    justifyContent: 'flex-end',
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
    height: SCREEN_HEIGHT * 0.3,
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
  profileBannerTitleStyle: {
    textAlign: 'center',
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font28,
    fontWeight: 'bold',
  },
  profileBannerSubTitleStyle: {
    textAlign: 'center',
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font14,
  },
  profileSubBannerStyle: {
    flex: 1,
    flexDirection: 'row',
    //height: SCREEN_HEIGHT,
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
    paddingHorizontal: 15,
  },
  profileBannerTextStyle: {
    fontSize: fontsCommon.font14,
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
    margin: 3,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: 'grey', //styleCommon.secondaryColorNew,
    //backgroundColor: styleCommon.secondaryColorNew,
    //backgroundColor: "hotpink"
  },
  boxesStyle: {
    width: '98%',
    height: SCREEN_HEIGHT * 0.21,
    borderWidth: 1,
    borderColor: 'transparent',
    //marginVertical: 3,
    //marginHorizontal: 3
    // backgroundColor: styleCommon.secondaryColor //"transparent"
  },
  boxHeaderContainerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 3,
    //backgroundColor: "green"
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
    padding: 3,
    //backgroundColor: "yellow"
  },
  boxContentColumnContainerStyle: {
    justifyContent: 'space-evenly',
    alignContent: 'stretch',
    padding: 3,
    //backgroundColor: "purple"
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
    borderWidth: 0.5,
    borderRadius: 2,
    padding: 3,
  },
  boxTextStyle: {
    padding: 5,
    fontSize: fontsCommon.font14,
    fontWeight: 'bold',
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
    height: SCREEN_HEIGHT * 0.07, //80,
    backgroundColor: 'rgba(0, 0, 0, .3)', //styleCommon.panelHeaderBoxColor,
    borderRadius: SCREEN_HEIGHT * 0.05,
    // borderWidth: 1,
    // borderColor: styleCommon.selectedButtonColor,
    shadowColor: 'grey',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.95,
    marginTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.1
      : SCREEN_WIDTH * 0.05,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.2
      : SCREEN_WIDTH * 0.1,
  },
  purchasesModalContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.95,
    // marginTop: DEVICE_NAME.includes('iPhone 11')
    //   ? SCREEN_HEIGHT * 0.1
    //   : SCREEN_HEIGHT * 0.02,
    marginTop: 100,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.1
      : SCREEN_HEIGHT * 0.05,
   // marginLeft: SCREEN_WIDTH * 0.1,
  },
  modalLoadingInsideStyle: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    //padding: DEVICE_NAME.includes('iPhone 11') ? SCREEN_WIDTH * 0.1 : 10,
    width: SCREEN_WIDTH * 0.9,
    // marginTop: DEVICE_NAME.includes('iPhone 11')
    //   ? SCREEN_WIDTH * 0.3
    //   : SCREEN_WIDTH * 0.25,
    // marginBottom: DEVICE_NAME.includes('iPhone 11')
    //   ? SCREEN_WIDTH * 0.2
    //   : SCREEN_WIDTH * 0.1,
  },
  closeButtonContainerStyle: {
    position: 'relative',
    top: -(SCREEN_WIDTH * 0.1),
    left: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.75
      : Platform.OS === 'ios'
      ? SCREEN_WIDTH * 0.69
      : SCREEN_WIDTH * 0.75,
    width: 40,
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  purchaseCloseButtonContainerStyle: {
    position: 'relative',
    top: -(SCREEN_WIDTH * 0.06),
    left: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.4
      : Platform.OS === 'ios'
      ? SCREEN_WIDTH * 0.38
      : SCREEN_WIDTH * 0.4,
    width: 40,
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font26
      : fontsCommon.font30,
    // textAlign: 'center',
    color: styleCommon.textColor1,
  },
  modalSubTitle: {
    fontWeight: '400',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font16
      : fontsCommon.font20,
    marginTop: 10,
    color: styleCommon.textColor1,
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
  contactDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  contactDetailsText: {
    fontWeight: '600',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font16
      : fontsCommon.font20,
    marginLeft: 10,
    color: styleCommon.textColor1,
  },
  socialIconImageStyle: {
    width: SCREEN_WIDTH * 0.13,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: SCREEN_HEIGHT * 0.06,
  },
  noPurchasesText: {
    fontWeight: '600',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font16
      : fontsCommon.font20,
    color: styleCommon.textColor1,
  },
});

export {styles};
