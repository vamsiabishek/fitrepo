import {StyleSheet} from 'react-native';
import {
  styleCommon,
  fontsCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  container: {
    borderColor: styleCommon.textColor1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    width: SCREEN_WIDTH * 0.8,
    //backgroundColor: "pink"
  },
  table: {
    maxHeight: SCREEN_HEIGHT * 0.4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingTop: 12,
    elevation: 2,
    backgroundColor: '#009699',
  },
  rowContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingTop: 12,
    elevation: 2,
    borderBottomColor: styleCommon.textColor1,
    borderBottomWidth: 1,
    backgroundColor: styleCommon.textColor1,
  },
  rowContainerTextHeader: {
    color: styleCommon.textColorWhite,
    padding: 2,
    fontWeight: '600',
    fontSize: fontsCommon.font15,
    //backgroundColor: "grey"
  },
  rowContainerText: {
    color: styleCommon.textColorWhite,
    padding: 2,
    fontSize: fontsCommon.font14,
    //backgroundColor: "grey"
  },
});
