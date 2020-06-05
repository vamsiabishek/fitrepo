import {StyleSheet} from 'react-native';
import {
  styleCommon,
  fontsCommon,
  DEVICE_NAME,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  BG_COLOR,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  mealItemHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRowContainer: {
    height: DEVICE_NAME.includes('iPhone 11') ? 80 : 70,
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
  bottomTitleStyle: {
    color: styleCommon.textColor1,
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font18
      : fontsCommon.font16,
    fontWeight: '600',
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
    marginRight: 20,
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
  mealItemQuantityContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealItemQuantity: {
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
  modalOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#1D9A6C', //styleCommon.secondaryColorNew,
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.6
      : SCREEN_WIDTH * 0.5,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.6
      : SCREEN_WIDTH * 0.5,
  },
  closeButtonContainerStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -12,
    right: -12,
    height: SCREEN_HEIGHT * 0.04,
    width: SCREEN_HEIGHT * 0.04,
    backgroundColor: BG_COLOR, //styleCommon.secondaryColorNew,
    borderRadius: SCREEN_HEIGHT * 0.04,
  },
  popUpImageContainer: {
    position: 'absolute',
    top: -SCREEN_HEIGHT * 0.05,
    left: SCREEN_WIDTH * 0.3,
    width: SCREEN_HEIGHT * 0.15,
    height: SCREEN_HEIGHT * 0.15,
    borderRadius: SCREEN_HEIGHT * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleCommon.textColorWhite, //styleCommon.secondaryColorNew,
    borderWidth: 5,
    borderColor: '#CB9257',
    overflow: 'hidden',
  },
  popUpImage: {
    width: SCREEN_HEIGHT * 0.11,
    height: SCREEN_HEIGHT * 0.09,
  },
  popUpTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpTitle: {
    position: 'relative',
    top: '25%',
    fontSize: fontsCommon.font25,
    fontWeight: 'bold',
    // marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    color: styleCommon.textColorWhite,
  },
  modalHeader: {
    //flex: 1,
    flexDirection: 'row',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    //paddingHorizontal: SCREEN_WIDTH * 0.05,
    //paddingBottom: SCREEN_WIDTH * 0.07,
    backgroundColor: styleCommon.secondaryColorNew,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalDescription: {
    width: '100%',
  },
  infoItem: {
    paddingHorizontal: 20,
  },
  infoLabel: {
    marginVertical: 10,
    fontSize: fontsCommon.font20,
    fontWeight: 'bold',
    color: styleCommon.textColor1,
  },
  infoValue: {
    fontSize: fontsCommon.font16,
    fontWeight: 'bold',
    color: styleCommon.textColor1,
  },
});

export const stylesExtended = StyleSheet.create({
  bottomHeartButtonContainerStyle: {
    ...styles.bottomButtonContainerStyle,
    backgroundColor: styleCommon.iconColor,
  },
});
