import {StyleSheet} from 'react-native';
import {
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  SCREEN_HEIGHT,
} from '../../assets/style/stylesCommonValues';

export const styles = StyleSheet.create({
  sourceContainer: {
    width: SCREEN_WIDTH * 0.8,
    marginVertical: 10,
    marginHorizontal: SCREEN_WIDTH * 0.13, //50,
    borderBottomWidth: 1,
    borderColor: 'grey',
    //backgroundColor: "orange"
  },
  sourceSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  sourceSelectorLabel: {
    fontSize: fontsCommon.font22,
    fontWeight: '600',
    color: styleCommon.textColorDesc,
    //backgroundColor: "red"
  },
  selectedSourcesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 2,
    marginBottom: 5,
  },
  selectedSourceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleCommon.selectedButtonColor,
    height: SCREEN_HEIGHT * 0.044,
    borderRadius: (SCREEN_HEIGHT * 0.044) / 2,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginTop: 5,
  },
  selectedSourceCancel: {
    paddingHorizontal: 3,
  },
  selectedSourceLabel: {
    fontWeight: '500',
    color: styleCommon.textColor2,
  },
  iconStyle: {
    color: styleCommon.iconColor,
  },
});
