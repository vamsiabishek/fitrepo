import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from './stylesCommonValues';

export const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGradiant: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.77,
    height: 40,
    borderRadius: 20,
  },
  buttonTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  navButtonIcon: {
    position: 'absolute',
    right: 20,
  },
});
