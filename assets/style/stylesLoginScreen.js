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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
    marginVertical: 20
    //backgroundColor: "cadetblue"
  },
  loginView: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.89,
    marginTop: SCREEN_HEIGHT * 0.15,
    marginBottom: 20
    //backgroundColor: "pink"
  },
  logoContainer: {
    marginBottom: SCREEN_HEIGHT * 0.15,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 2, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 4.5
    //backgroundColor: "brown"
  },
  logoText: {
    padding: 5,
    letterSpacing: fontsCommon.letterSpacingOneFive,
    fontWeight: "700",
    fontSize: fontsCommon.font30,
    color: styleCommon.textColor1
    //backgroundColor: "firebrick"
  },
  loginInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.7,
    margin: 5
    //backgroundColor: "chocolate"
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
    //backgroundColor: "crimson"
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
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
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
  socialMediaLoginBtn: {
    width: SCREEN_WIDTH * 0.35
  },
  loginButtonText: {
    fontSize: fontsCommon.font16,
    fontWeight: "bold",
    color: styleCommon.textColor2
  },
  loginButtonIcon: {
    paddingLeft: 5,
    color: styleCommon.textColor2
  },
  loginButtonDes: {
    color: styleCommon.textColor1
  },
  signUpHereContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5
    // shadowOffset: { width: 2, height: 8 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3
    //backgroundColor: "coral"
  },
  newUserText: {
    fontSize: fontsCommon.font16,
    color: styleCommon.textColor2
  },
  signUpButtonTitle: {
    color: styleCommon.secondaryColor,
    fontSize: fontsCommon.font15,
    fontWeight: "bold"
  }
});
