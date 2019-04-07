import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, styleCommon, SCREEN_HEIGHT } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT * 0.12, //80,
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
    height: SCREEN_HEIGHT * 0.12, //80,
    backgroundColor: styleCommon.selectedButtonColor,
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
    color: styleCommon.secondaryButtonTextColor,
    fontWeight: "600"
  },
  activeButtonTitle: {
    color: styleCommon.textColor2,
    fontWeight: "600"
  },

  buttonIcon: {
    position: "absolute",
    left: 45
  }
});
