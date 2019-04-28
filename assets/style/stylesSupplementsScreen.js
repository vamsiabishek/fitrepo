import { StyleSheet } from "react-native";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon,
  fontsCommon
} from "../../assets/style/stylesCommonValues";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#28292B"
  },
  supplementContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#28292B"
  },
  pageTitleContainer: {
    borderColor: 'grey',
    borderBottomWidth: 0.2,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: fontsCommon.font20,
    fontWeight: "bold",
    color: styleCommon.secondaryButtonTextColor,
    marginBottom: 3,
  },
  flatListContainer: {
    flex: 1,
    marginTop: 20,
    width: SCREEN_WIDTH * 0.95,
  },
  flatListContentContainer: {
    justifyContent: "center",
    alignContent: "center"
  },
  returnViewContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: (SCREEN_HEIGHT * 0.10) / 2,
    backgroundColor: styleCommon.textColor3,
  },
  subContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  touchableContainerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  lineContainer: {
    height: SCREEN_HEIGHT * 0.093, //62
    width: SCREEN_WIDTH * 0.13, //50,
    marginLeft: 45,
    borderLeftWidth: 3,
    borderColor: styleCommon.secondaryButtonColor,
    //backgroundColor: "magenta"
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT * 0.15,
    width: SCREEN_HEIGHT * 0.15, //SCREEN_WIDTH * 0.32,
    backgroundColor: styleCommon.secondaryButtonColor,
    borderRadius: (SCREEN_HEIGHT * 0.15) / 2
  },
  iconImageStyle: {
    width: SCREEN_HEIGHT * 0.1 - 18,
    height: SCREEN_HEIGHT * 0.1,
    //tintColor: styleCommon.textColor1
  },
  iconDataStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT * 0.12,
    width: SCREEN_HEIGHT * 0.12 //SCREEN_WIDTH * 0.27,
  },
  iconTextStyle: {
    fontSize: fontsCommon.font70
  },
  supplementDescContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 5,
    paddingLeft: 5,
    borderLeftWidth: 0.2,
    borderColor: "grey",
  },
  supplementName: {
    fontSize: fontsCommon.font18,
    fontWeight: "bold",
    color: styleCommon.secondaryButtonTextColor
  },
  supplementDesc: {
    width: SCREEN_WIDTH * 0.60, //180,
    fontSize: fontsCommon.font14,
    color: styleCommon.secondaryButtonTextColor
  },
  supplementDetailedDesc: {
    width: SCREEN_WIDTH * 0.60, //180,
    fontSize: fontsCommon.font14,
    fontWeight:"500",
    marginTop: 5,
    color: "#004d4d"
  },
  consumeDesc: {
    width: SCREEN_WIDTH * 0.40, //180,
    fontSize: fontsCommon.font13,
    color: styleCommon.secondaryButtonTextColor
  },
  timingsLabel: {
    fontSize: fontsCommon.font13,
    fontWeight:"500",
    marginTop: 5,
    backgroundColor: "#ff6600",
    borderBottomRightRadius: 20,
  },
  timingsLabelText: {
    fontSize: fontsCommon.font14,
    padding: 5,
    fontWeight:"600",
    color: "white",
  },
  timingsOptions: {
    padding: 3,
    paddingLeft: 4,
    fontWeight:"400",
    fontSize: fontsCommon.font13,
    color: "white",
  }
});
