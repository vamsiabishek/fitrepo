import {StyleSheet} from 'react-native';
import {
  styleCommon,
  SCREEN_WIDTH,
  fontsCommon,
  SCREEN_HEIGHT,
  DEVICE_NAME,
} from './stylesCommonValues';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "pink"
  },
  contentContainer: {
    paddingBottom: 20,
  },
  anotherContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 5,
    elevation: 2,
    //backgroundColor: "aquamarine",
    backgroundColor: styleCommon.secondaryColorNew,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    height: 100,
  },
  container_text: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginLeft: 7,
    padding: 2,
    //backgroundColor: "grey"
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: "orange"
  },
  title: {
    fontSize: fontsCommon.font15,
    fontWeight: '700',
    color: styleCommon.textColor1,
  },
  vegContainer: {
    backgroundColor: styleCommon.textColor3,
    marginLeft: 8,
    borderRadius: 4,
  },
  vegIcon: {
    height: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.0295
      : SCREEN_HEIGHT * 0.0359, //24,
    width: SCREEN_WIDTH * 0.066, //24,
    paddingLeft: 10,
  },
  descriptionContainer: {
    paddingVertical: 6,
    flexDirection: 'row',
  },
  description: {
    marginLeft: 4,
    fontSize: fontsCommon.font13,
    fontWeight: '500',
    color: styleCommon.textColor1,
  },
  likesContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  likesLabel: {
    textShadowColor: styleCommon.unSelected,
    textShadowOffset: {width: -3, height: 2},
    textShadowRadius: 30,
    fontSize: fontsCommon.font12,
    color: styleCommon.textColor1,
    padding: 3,
    fontWeight: '500',
  },
  timeStampContainer: {
    padding: 2,
  },
  timeStampLabel: {
    fontSize: fontsCommon.font12,
    color: styleCommon.textColor1,
  },
  rightIcon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    //backgroundColor: "yellow"
  },
  badgeContainer: {
    backgroundColor: styleCommon.badgeColor,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTitle: {
    fontSize: fontsCommon.font20,
    fontWeight: 'bold',
    color: styleCommon.textColorWhite,
  },
  badgeDescription: {
    marginTop: 5,
    fontSize: fontsCommon.font16,
    fontWeight: 'bold',
    color: styleCommon.textColorWhite,
  },
});
