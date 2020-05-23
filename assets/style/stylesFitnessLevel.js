import {StyleSheet, Platform} from 'react-native';
import {SCREEN_HEIGHT} from './stylesCommonValues';

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop:
      Platform.OS === 'android' ? SCREEN_HEIGHT * 0.055 : SCREEN_HEIGHT * 0.02,
    // backgroundColor: "oldlace"
  },
});
