import {StyleSheet} from 'react-native';
import {styleCommon, fontsCommon} from './stylesCommonValues';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    width: fontsCommon.font80 * 2,
    height: fontsCommon.font80 * 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //backgroundColor: 'grey',
  },
  addButtonHighlight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: fontsCommon.font80,
    height: fontsCommon.font80,
    borderRadius: fontsCommon.font80 / 2,
    backgroundColor: styleCommon.selectedButtonColor,
  },
});

export {styles};
