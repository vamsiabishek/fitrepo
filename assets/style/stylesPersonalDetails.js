import { StyleSheet } from "react-native";
import {
  styleCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  fontsCommon
} from "./stylesCommonValues";

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "moccasin"
  },
  buttonStyle: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT * 0.097, //65,
    backgroundColor: styleCommon.secondaryButtonColor,
    borderRadius: 10,
    borderBottomWidth: 0,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5
  },
  activeButtonStyle: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT * 0.097, //65,
    backgroundColor: styleCommon.secondaryButtonColor, //styleCommon.selectedButtonColor,
    borderRadius: 10,
    borderBottomWidth: 0,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5
  },
  buttonTitle: {
    flex: 1,
    textAlign: "left",
    color: styleCommon.secondaryButtonTextColor,
    fontSize: fontsCommon.font15,
    fontWeight: "300"
  },
  activeButtonTitle: {
    flex: 1,
    textAlign: "left",
    color: styleCommon.secondaryButtonTextColor,
    fontWeight: "500"
  },
  buttonIcon: {
    position: "absolute",
    right: 10,
    color: styleCommon.secondaryButtonTextColor
  },
  activeButtonIcon: {
    position: "absolute",
    right: 10,
    color: styleCommon.selectedButtonColor
  }
});
