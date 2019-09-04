import { StyleSheet } from "react-native";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon,
  fontsCommon,
  DEVICE_NAME
} from "../../assets/style/stylesCommonValues";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "#28292B"
  },
  supplementContainer: {
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "#28292B"
  },
  backHeaderContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: DEVICE_NAME.includes("iPhone X") ? 40 : 20
    //backgroundColor: "blueviolet"
  },
  backButtonContainerStyle: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  backButtonStyle: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    //backgroundColor: "burlywood"
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "transparent"
  },
  backButtonTitleStyle: {
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font18
  },
  pageTitleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30
  },
  pageTitle: {
    fontSize: fontsCommon.font20,
    fontWeight: "bold",
    color: styleCommon.secondaryButtonTextColor
  },
  flatListContainer: {
    flex: 1,
    width: SCREEN_WIDTH * 0.95
  },
  flatListContentContainer: {
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: 20
  },
  returnViewContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: (SCREEN_HEIGHT * 0.1) / 2,
    backgroundColor: "white"
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    // borderRadius: (SCREEN_HEIGHT * 0.10) / 2,
    width: SCREEN_WIDTH * 0.28, //180,
    borderTopLeftRadius: (SCREEN_HEIGHT * 0.1) / 2,
    borderBottomLeftRadius: (SCREEN_HEIGHT * 0.1) / 2
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
    borderColor: styleCommon.secondaryButtonColor
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
    width: SCREEN_HEIGHT * 0.1 - 38,
    height: SCREEN_HEIGHT * 0.1
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
    borderColor: "grey"
  },
  supplementName: {
    fontSize: fontsCommon.font18,
    fontWeight: "bold",
    color: "#00aeef"
  },
  supplementDesc: {
    width: SCREEN_WIDTH * 0.6, //180,
    fontSize: fontsCommon.font14,
    color: styleCommon.secondaryButtonTextColor
  },
  supplementDetailedDesc: {
    width: SCREEN_WIDTH * 0.65, //180,
    fontSize: fontsCommon.font14,
    fontWeight: "500",
    marginTop: 5,
    color: "#004d4d"
  },
  consumeDesc: {
    width: SCREEN_WIDTH * 0.4, //180,
    fontSize: fontsCommon.font13,
    color: styleCommon.secondaryButtonTextColor
  },
  timingsLabel: {
    fontSize: fontsCommon.font13,
    fontWeight: "500",
    marginTop: 5,
    backgroundColor: "#04CD5E",
    borderBottomRightRadius: 20
  },
  timingsLabelText: {
    fontSize: fontsCommon.font14,
    padding: 5,
    fontWeight: "600",
    color: "white"
  },
  timingsOptions: {
    padding: 3,
    paddingLeft: 4,
    fontWeight: "400",
    fontSize: fontsCommon.font13,
    color: "white"
  }
});
