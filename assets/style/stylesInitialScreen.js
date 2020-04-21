import {StyleSheet, Platform} from 'react-native';
import {
  styleCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  fontsCommon,
  DEVICE_NAME,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.07,
    paddingBottom: SCREEN_WIDTH * 0.07,
    // backgroundColor: 'cyan',
  },
  modalLoadingInsideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    //padding: DEVICE_NAME.includes('iPhone 11') ? SCREEN_WIDTH * 0.1 : 10,
    width: SCREEN_WIDTH * 0.9,
    marginTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.3
      : SCREEN_WIDTH * 0.25,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.2
      : SCREEN_WIDTH * 0.1,
  },
  closeButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.05,
    width: -SCREEN_WIDTH * 0.1,
    backgroundColor: 'red',
  },
  closeButtonDoneContainerStyle: {
    position: 'relative',
    top: -(SCREEN_WIDTH * 0.1),
    left: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.72
      : SCREEN_WIDTH * 0.69,
    width: 40,
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  viewTargetsContainer: {
    backgroundColor: 'pink',
  },
  targetContainer: {
    width: SCREEN_WIDTH * 0.8,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  targetButtonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: fontsCommon.font80,
    height: fontsCommon.font80,
    borderRadius: fontsCommon.font80 / 2,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: fontsCommon.font32,
    textAlign: 'center',
    color: styleCommon.textColor1,
  },
  headerPurchaseDoneText: {
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font26
      : fontsCommon.font30,
    textAlign: 'center',
    color: styleCommon.textColor1,
  },
  headerPurcahseText: {
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font26
      : fontsCommon.font30,
    textAlign: 'center',
    color: styleCommon.textColor1,
  },
  priceText: {
    fontSize: fontsCommon.font40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: styleCommon.textColor1,
  },
  textualArea: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'cyan',
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.7,
    //backgroundColor: 'purple',
  },
  labelText: {
    // paddingBottom: 15,
    textAlign: 'center',
    fontSize: fontsCommon.font20,
    color: styleCommon.textColor1,
  },
  labelTextBold: {
    // paddingBottom: 15,
    textAlign: 'center',
    fontSize: fontsCommon.font22,
    fontWeight: 'bold',
    color: styleCommon.textColor1,
  },
  smallerLabelText: {
    textAlign: 'center',
    fontSize: fontsCommon.font13,
    color: styleCommon.textColor1,
  },
  selectedOptionLabel: {
    fontSize: fontsCommon.font15,
    color: styleCommon.textColor1,
  },
  buttonGroupStyle: {
    height: SCREEN_HEIGHT * 0.05, //40,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: styleCommon.disableColor,
  },
  selectedButtonStyle: {
    backgroundColor: styleCommon.selectedButtonColor,
    alignItems: 'center',
  },
});
