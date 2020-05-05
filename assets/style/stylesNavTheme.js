import {StyleSheet} from 'react-native';
import {styleCommon, fontsCommon} from './stylesCommonValues';

const styles = StyleSheet.create({
  bottomNavBar: {
    paddingVertical: 2,
    backgroundColor: styleCommon.primaryButtonColor,
    color: styleCommon.textColor1,
    tintColor: styleCommon.textColor1, //styleCommon.unSelected
  },
  activeTintColor: {
    color: styleCommon.unSelected,
  },
  tintColor: {
    color: styleCommon.unSelected, //styleCommon.unSelected
  },
  labelStyle: {
    fontSize: fontsCommon.font12,
    fontWeight: 'bold',
    //backgroundColor: "red"
  },
  headerStyle: {
    height: 35,
    backgroundColor: styleCommon.primaryColor,
    color: styleCommon.secondaryButtonTextColor,
  },
  headerTitleStyle: {
    color: styleCommon.textColor1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTextStyle: {
    color: styleCommon.textColor1,
    fontSize: 18,
  },
  headerTIcolor: {
    color: styleCommon.textColor1,
  },
});

export {styles};
