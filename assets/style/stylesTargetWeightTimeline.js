import {StyleSheet} from 'react-native';
import {
  styleCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  fontsCommon,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  modalInsideStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: SCREEN_WIDTH * 0.06,
  },
  closeButtonContainerStyle: {
    position: 'relative',
    top: -(SCREEN_WIDTH * 0.06),
    left: SCREEN_WIDTH * 0.4,
  },
  viewTargetsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetContainer: {
    width: SCREEN_WIDTH * 0.8,
    marginTop: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetButtonContainer: {
    width: SCREEN_WIDTH * 0.8,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: fontsCommon.font22,
    textAlign: 'center',
    color: styleCommon.textColor1,
  },
  labelText: {
    paddingBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    color: styleCommon.textColor1,
  },
  selectedOptionLabel: {
    fontSize: 15,
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
  animationStyle: {
    //margin: 30, // 20
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.2,
    //backgroundColor: 'teal',
  },
});
