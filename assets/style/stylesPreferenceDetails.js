import { StyleSheet } from "react-native";
import { styleCommon, SCREEN_HEIGHT, SCREEN_WIDTH } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputOuterViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.8,
    height: 200, //SCREEN_HEIGHT * 0.24,
    backgroundColor: styleCommon.secondaryButtonColor,
    borderRadius: 10,
    borderBottomWidth: 0,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5
  },
  buttonStyle: {
    width: SCREEN_WIDTH * 0.75,
    height: 65,
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
    height: 65,
    backgroundColor: styleCommon.selectedButtonColor, //styleCommon.selectedButtonColor,
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
    fontSize: 15,
    fontWeight: "300"
  },
  activeButtonTitle: {
    flex: 1,
    textAlign: "left",
    color: styleCommon.textColor2,
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
  },
  vegButtonGroup: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    borderWidth: 0,
    backgroundColor: styleCommon.disableColor // "#494b50"
  },
  veg: {
    backgroundColor: styleCommon.selectedButtonColor, //"#00EF9A",
    borderRadius: 30,
    width: "110%",
    alignItems: "center",
    paddingHorizontal: 10
  },
  nonVeg: {
    backgroundColor: styleCommon.selectedButtonColor, //"#00EF9A",
    borderRadius: 30,
    width: "110%",
    alignItems: "center",
    paddingHorizontal: 10
  },
  dropdownContainer: {
    width: 300,
    marginTop: 15
  },
  labelContainer: {
    flexDirection: "row",
    paddingBottom: 15
  },
  labelText: {
    fontSize: 15,
    color: styleCommon.textColor1
  },
  selectedOptionLabel: {
    fontSize: 15,
    color: styleCommon.textColor1
  },
  selectedButtonStyle: {
    backgroundColor: styleCommon.selectedButtonColor,
    alignItems: "center"
  }
});
