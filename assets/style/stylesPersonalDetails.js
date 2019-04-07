import { StyleSheet } from "react-native";
import { styleCommon, SCREEN_HEIGHT, SCREEN_WIDTH } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    fontSize: 15,
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
  },
  modalInsideStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styleCommon.secondaryButtonColor,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 22
  },
  targetContainer: {
    width: 300,
    margin: 10,
    padding: 10
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: styleCommon.secondaryButtonTextColor
  },
  labelText: {
    paddingBottom: 15,
    textAlign: "center",
    fontSize: 15,
    color: styleCommon.textColor1
  },
  selectedOptionLabel: {
    fontSize: 15,
    color: styleCommon.textColor1
  },
  buttonGroupStyle: {
    height: 40,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: styleCommon.disableColor
  },
  selectedButtonStyle: {
    backgroundColor: styleCommon.selectedButtonColor,
    alignItems: "center"
  }
});
