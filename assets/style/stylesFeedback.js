import {StyleSheet} from 'react-native';
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
      : SCREEN_WIDTH * 0.1,
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
    //backgroundColor: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingBottom: SCREEN_WIDTH * 0.07,
    // backgroundColor: 'cyan',
  },
  modalLoadingContiner: {
    flex: 1,
    width: '80%',
    justifyContent: 'space-evenly',
    // backgroundColor: 'yellow',
  },
  purchaseAnimationContainer: {
    width: '110%',
    height: '30%',
    marginBottom: SCREEN_HEIGHT * 0.02,
    //backgroundColor: 'blue',
  },
  doneAnimationContainer: {
    width: '110%',
    height: '40%',
    marginBottom: SCREEN_HEIGHT * 0.02,
    //backgroundColor: 'blue',
  },
  loadingAnimationContainer: {
    width: '110%',
    height: '50%',
    //backgroundColor: 'pink',
  },
  modalLoadingOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.08
      : SCREEN_WIDTH * 0.01,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.08
      : SCREEN_WIDTH * 0.05,
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
    justifyContent: 'center',
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
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  headerPurcahseText: {
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font26
      : fontsCommon.font28,
    textAlign: 'center',
    color: styleCommon.textColor1,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  priceText: {
    fontSize: fontsCommon.font40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: styleCommon.textColor1,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  donePurchaseText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    // backgroundColor: 'pink',
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
    fontSize: fontsCommon.font18,
    color: styleCommon.textColor1,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  labelTextBold: {
    // paddingBottom: 15,
    textAlign: 'center',
    fontSize: fontsCommon.font20,
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
  textInputContainer: {
    height: '30%',
    width: '100%',
    backgroundColor: styleCommon.textColor2,
    borderColor: styleCommon.textColor1,
    borderRadius: 10,
    borderWidth: 2,
  },
  textInputStyle: {
    margin: 10,
    height: '90%',
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font15,
    // backgroundColor: 'yellow',
  },
});
