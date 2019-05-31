import { StyleSheet } from "react-native";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
  errorTextcolor,
  BUTTON_HEIGHT_GENERAL,
  fontsCommon
} from "./stylesCommonValues";

export const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "center"
  },
  forgotPasswordViewWrapper: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    margin: 10,
    padding: 5
    // backgroundColor: "pink"
  },
  changePasswordInsWrapper: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    margin: 10,
    padding: 5
    // backgroundColor: "green"
  },
  changePasswordInsTextStyle: {
    textAlign: "center",
    fontSize: fontsCommon.font20,
    color: styleCommon.textColor1
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
    margin: 10,
    padding: 5
    // backgroundColor: "cyan"
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
    // backgroundColor: "crimson"
  },
  inputStyle: {
    marginLeft: 10,
    color: styleCommon.textColor1
  },
  errorInputStyle: {
    textAlign: "center",
    fontSize: fontsCommon.font12,
    color: errorTextcolor
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 10,
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 3
    //backgroundColor: "orange"
  },
  loginButtonContainerStyle: {
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "gold"
  },
  loginButtonStyle: {
    width: SCREEN_WIDTH * 0.73,
    height: BUTTON_HEIGHT_GENERAL,
    borderColor: "transparent",
    borderRadius: 30,
    backgroundColor: "transparent"
  },
  loginButtonText: {
    fontSize: fontsCommon.font16,
    fontWeight: "bold",
    color: styleCommon.textColor2
  }
});
