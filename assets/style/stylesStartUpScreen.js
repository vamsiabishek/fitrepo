import { StyleSheet } from "react-native";
import {
  styleCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  fontsCommon
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
    alignContent: "center",
    margin: 20
  },
  overlaySubContainerstyle: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center"
    //backgroundColor: "orange"
  },
  headerViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5
    //backgroundColor: "blue"
  },
  textStyle: {
    padding: 5,
    color: styleCommon.textColor2,
    fontSize: fontsCommon.font14
    //backgroundColor: "firebrick"
  },
  logoText: {
    padding: 5,
    letterSpacing: fontsCommon.letterSpacingOneFive,
    fontWeight: "700",
    fontSize: fontsCommon.font50,
    color: styleCommon.textColor3
    //backgroundColor: "pink"
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignContent: "center",
    margin: 5
    //backgroundColor: "lightgreen"
  },
  buttonContainerStyle: {
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10
    //backgroundColor: "black"
  },
  signUpButtonStyle: {
    width: SCREEN_WIDTH * 0.81,
    height: 50,
    borderColor: "transparent",
    borderRadius: 30,
    backgroundColor: styleCommon.secondaryButtonColor
  },
  signUpButtonTitleStyle: {
    fontSize: fontsCommon.font16,
    fontWeight: "bold",
    letterSpacing: fontsCommon.letterSpacingOneFive,
    color: styleCommon.textColor2
  },
  loginButtonStyle: {
    width: SCREEN_WIDTH * 0.81,
    height: 50,
    borderColor: "transparent",
    borderRadius: 30,
    backgroundColor: styleCommon.transparentButtonColorRGBA // Use RGBA when you want a transparent button.
  },
  loginButtonTitleStyle: {
    fontSize: fontsCommon.font16,
    letterSpacing: fontsCommon.letterSpacingOneFive,
    color: styleCommon.primaryButtonTextColor
  }
});

export { styles };
