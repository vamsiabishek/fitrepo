import { StyleSheet } from "react-native";
import { styleCommon, SCREEN_WIDTH, SCREEN_HEIGHT } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20
  },
  modalInsideStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styleCommon.textColor2,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: SCREEN_WIDTH * 0.06
  },
  closeButtonContainerStyle: {
    position: "relative",
    top: -(SCREEN_WIDTH * 0.06),
    left: SCREEN_WIDTH * 0.4
  },
  viewTargetsContainer: {
    backgroundColor: "pink"
  },
  targetContainer: {
    width: SCREEN_WIDTH * 0.8,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  targetButtonContainer: {
    width: SCREEN_WIDTH * 0.8,
    marginHorizontal: 10,
    paddingHorizontal: 10
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    color: styleCommon.secondaryButtonTextColor
  },
  labelText: {
    paddingBottom: 15,
    textAlign: "center",
    fontSize: 17,
    color: styleCommon.textColor1
  },
  smallerLabelText: {
    textAlign: "center",
    fontSize: 12,
    color: styleCommon.textColor1
  },
  selectedOptionLabel: {
    fontSize: 15,
    color: styleCommon.textColor1
  },
  buttonGroupStyle: {
    height: SCREEN_HEIGHT * 0.05, //40,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: styleCommon.disableColor
  },
  selectedButtonStyle: {
    backgroundColor: styleCommon.selectedButtonColor,
    alignItems: "center"
  }
});
