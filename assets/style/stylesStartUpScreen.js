import { StyleSheet } from "react-native";
import {
  styleCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  DEVICE_ID
} from "./stylesCommonValues";

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "transparent"
  },
  overlayContainerstyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  overlaySubContainerstyle: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: DEVICE_ID.includes("iPhone10,6") === true ? 20 : 0,
    padding: 10
  },
  headerViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  textStyle: {
    paddingHorizontal: 5,
    color: "white",
    fontSize: 14
  },
  logoText: {
    paddingHorizontal: 5,
    color: styleCommon.textColor3,
    letterSpacing: 1.5,
    fontSize: 50,
    fontWeight: "700"
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignContent: "flex-end",
    height: SCREEN_HEIGHT * 0.31,
    margin: 10
  },
  buttonContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  signUpButtonStyle: {
    width: SCREEN_WIDTH * 0.81,
    height: 50,
    borderColor: "transparent",
    borderRadius: 30,
    backgroundColor: styleCommon.secondaryButtonColor
  },
  signUpButtonTitleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
    color: styleCommon.textColor2
  },
  loginButtonStyle: {
    width: SCREEN_WIDTH * 0.81,
    height: 50,
    borderColor: "transparent",
    borderRadius: 30,
    backgroundColor: styleCommon.transparentButtonColorRGBA // User RGBA when you want a transparent button.
  },
  loginButtonTitleStyle: {
    fontSize: 16,
    letterSpacing: 1.5,
    color: styleCommon.primaryButtonTextColor
  }
});

export { styles };
