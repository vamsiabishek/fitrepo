import {StyleSheet} from 'react-native';
import {styleCommon, fontsCommon} from './stylesCommonValues';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleCommon.panelSubHeaderBoxColor,
    //borderBottomWidth: 0.3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  macrosBarStyle: {
    flexDirection: 'row',
    backgroundColor: styleCommon.panelHeaderBoxColor,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 0,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,
  },
  badgeLabel: {
    marginTop: 2,
    marginRight: 2,
    fontSize: fontsCommon.font16,
    color: styleCommon.textColor2,
  },
  totalCaloriesBadge: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: styleCommon.badgeColor, // 'rgba(153, 255, 102, .4)',
  },
  totalCaloriesValue: {
    color: styleCommon.textColor2,
    fontSize: fontsCommon.font15,
    fontWeight: '600',
  },
});

export {styles};