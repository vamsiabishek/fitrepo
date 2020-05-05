import {StyleSheet} from 'react-native';
import {
  styleCommon,
  fontsCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  DEVICE_NAME,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  mealItemHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRowContainer: {
    height: DEVICE_NAME.includes('iPhone 11') ? 70 : 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'blue',
  },
  bottomButtonContainerStyle: {
    // height: SCREEN_HEIGHT * 0.08,
    // width: SCREEN_WIDTH * 0.1,
    borderRadius: 100,
    marginTop: 5,
    marginHorizontal: 50,
    backgroundColor: styleCommon.iconColor,
  },
  titleContainer: {
    textAlign: 'left',
    backgroundColor: styleCommon.badgeColor,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    fontSize: fontsCommon.font18,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingBottom: 10,
    //marginLeft: 10,
    padding: 10,
    // textShadowColor: styleCommon.primaryColor,
    // textShadowOffset: { width: -3, height: 5 },
    // textShadowRadius: 20,
    //color: "#00DB8D"
    color: styleCommon.textColorWhite,
  },
  list: {
    //flex: 1,
    marginTop: 0,
    marginLeft: -15,
    marginRight: 40,
    // backgroundColor: 'purple',
  },
  descriptionContainer: {
    flexDirection: 'column',
    paddingBottom: 10,
    marginLeft: 10,
    padding: 10,
  },
  active: {
    backgroundColor: 'rgba(255,252,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  mealContainer: {
    flex: 1,
    width: '95%',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  mealItem: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    paddingVertical: 3,
  },
  mealItemName: {
    width: '60%',
    fontSize: fontsCommon.font14,
    color: styleCommon.textColor1,
  },
  mealItemQuantity: {
    width: '40%',
    fontSize: fontsCommon.font14,
    color: styleCommon.textColor1,
  },
  mealItemQuantityLabel: {
    width: '40%',
    fontSize: fontsCommon.font14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: styleCommon.textColor1,
  },
});

export const stylesExtended = StyleSheet.create({
  bottomHeartButtonContainerStyle: {
    ...styles.bottomButtonContainerStyle,
    backgroundColor: styleCommon.iconColor,
  },
});
