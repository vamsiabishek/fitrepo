import {StyleSheet, Platform} from 'react-native';
import {
  DEVICE_NAME,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon,
  fontsCommon,
} from './stylesCommonValues';

const styles = StyleSheet.create({
  modalOuterContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.2
      : SCREEN_WIDTH * 0.01,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.2
      : SCREEN_WIDTH * 0.05,
  },
  closeButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.05,
    width: -SCREEN_WIDTH * 0.1,
    // backgroundColor: 'red',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.07,
    paddingBottom: SCREEN_WIDTH * 0.07,
    // backgroundColor: 'cyan',
  },
  modalEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.07,
    paddingBottom: SCREEN_WIDTH * 0.07,
    // backgroundColor: 'cyan',
  },
  modalTitle: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font26
      : fontsCommon.font30,
    marginBottom: SCREEN_HEIGHT * 0.01,
    color: styleCommon.textColor1,
    // backgroundColor: 'pink',
  },
  contactUsAnimationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '110%',
    height: '100%',
    marginBottom: SCREEN_HEIGHT * 0.01,
    // backgroundColor: 'blue',
  },
  modalSubTitle: {
    width: '100%',
    fontWeight: '400',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font16
      : Platform.OS === 'android'
      ? fontsCommon.font18
      : fontsCommon.font20,
    marginBottom: SCREEN_HEIGHT * 0.02,
    color: styleCommon.textColor1,
    // backgroundColor: 'lightgrey',
  },
  contactDetailsWrapper: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    // backgroundColor: 'orange',
  },
  contactDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.02,
    // backgroundColor: 'green',
  },
  contactDetailsText: {
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font16
      : fontsCommon.font20,
    marginLeft: SCREEN_HEIGHT * 0.01,
    color: styleCommon.textColor1,
  },
  socialIconImageStyle: {
    width: SCREEN_WIDTH * 0.13,
    height: SCREEN_WIDTH * 0.13,
    borderRadius: SCREEN_HEIGHT * 0.06,
  },
  modalPurchasesTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font26
      : fontsCommon.font30,
    marginBottom: SCREEN_HEIGHT * 0.01,
    color: styleCommon.textColor1,
    //backgroundColor: 'pink',
  },
});

export {styles};