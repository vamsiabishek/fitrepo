import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT} from './stylesCommonValues';

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //backgroundColor: "navajowhite"
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "white"
  },
  imageContainer: {
    height: '50%',
    width: '50%',
    //backgroundColor: 'white',
  },
  iconImageStyle: {
    position: 'absolute',
    top: 30,
    width: SCREEN_HEIGHT * 0.1,
    height: SCREEN_HEIGHT * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    //tintColor: styleCommon.textColor1,
    //marginTop: 50,
    marginBottom: 50,
  },
  iconImageStylePerson: {
    width: SCREEN_HEIGHT * 0.07,
    height: SCREEN_HEIGHT * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    //tintColor: styleCommon.textColor1,
    marginRight: 8,
    marginTop: 50,
    marginBottom: 50,
  },
});
