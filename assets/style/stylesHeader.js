import {Platform, StyleSheet} from 'react-native';
import {
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  DEVICE_NAME,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  backHeaderContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop:
      Platform.OS === 'ios'
        ? DEVICE_NAME.includes('iPhone 11')
          ? 40
          : 20
        : 10,
    //backgroundColor: "blueviolet"
  },
  buttonContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: "chartreuse"
  },
  backButtonContainerStyle: {
    justifyContent: 'flex-start',
    width: SCREEN_WIDTH / 2,
    alignItems: 'flex-start',
    //backgroundColor: "burlywood"
  },
  backButtonStyle: {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  cancelButtonContainerStyle: {
    justifyContent: 'flex-end',
    width: SCREEN_WIDTH / 2,
    alignItems: 'flex-end',
    //backgroundColor: "red"
  },
  cancelButtonStyle: {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  cancelTitleStyle: {
    color: styleCommon.textColor1,
    paddingBottom: 5,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "firebrick"
  },
  headerTitle: {
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontsCommon.font30,
    color: styleCommon.headerTitleColor,
    //backgroundColor: "pink"
  },
});
