import { Dimensions, StyleSheet } from "react-native";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
  errorTextcolor
} from "./stylesCommonValues";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: styleCommon.primaryColor
  },
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  loginView: {
    width: 250,
    height: 400,
    marginTop: 150,
    backgroundColor: "transparent"
  },
  loginTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
    color: styleCommon.textColor2,
    fontSize: 30,
    fontWeight: "bold"
  },
  textStyle: {
    color: styleCommon.textColor2,
    fontSize: 18,
    fontWeight: "normal"
  },
  loginInputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    marginVertical: 10
  },
  inputStyle: {
    marginLeft: 10,
    color: styleCommon.textColor2
  },
  errorInputStyle: {
    textAlign: "center",
    fontSize: 12,
    color: errorTextcolor
  },
  loginButtonContainer: {
    marginTop: 10
  },
  loginButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 250,
    borderWidth: 2,
    borderColor: "#00DB8D",
    borderRadius: 30,
    backgroundColor: "#00DB8D"
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: styleCommon.textColor2
  },
  loginButtonIcon: {
    paddingLeft: 5,
    color: styleCommon.textColor2
  },
  loginButtonDes: {
    color: styleCommon.textColor2
  },
  signUpHereContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  newUserText: {
    fontSize: 16,
    color: styleCommon.textColor2
  },
  signUpButtonStyle: {
    paddingHorizontal: 2
  },
  signUpButtonTitle: {
    color: styleCommon.secondaryColor,
    fontSize: 15,
    fontWeight: "bold"
  }
});

export { styles };
