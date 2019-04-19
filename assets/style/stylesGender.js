import { StyleSheet } from "react-native";
import {
  styleCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH
} from "../../assets/style/stylesCommonValues";

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "thistle"
  },
  buttonStyle: {
    width: SCREEN_WIDTH * 0.37, //140,
    height: SCREEN_HEIGHT * 0.21, //140,
    backgroundColor: styleCommon.secondaryColor,
    borderRadius: 20,
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
    width: SCREEN_WIDTH * 0.37, //140,
    height: SCREEN_HEIGHT * 0.21, //140,
    backgroundColor: styleCommon.selectedButtonColor,
    borderRadius: 20,
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
    justifyContent: "center",
    alignItems: "center"
  }
});
