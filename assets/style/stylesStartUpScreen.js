import { Dimensions, StyleSheet } from "react-native";
import { styleCommon } from "./stylesCommonValues";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "transparent"
  },
  headerViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  logoText: {
    paddingHorizontal: 5,
    color: styleCommon.textColor3,
    letterSpacing: 1.5,
    fontSize: 50,
    fontWeight: "700"
  },
  textStyle: {
    paddingHorizontal: 5,
    color: "white",
    fontSize: 14
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
    marginTop: 40,
    padding: 10
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignContent: "flex-end",
    height: 250,
    margin: 10,
    padding: 10
  },
  buttonContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10
  },
  signUpButtonStyle: {
    width: SCREEN_WIDTH - 40,
    height: 50,
    borderColor: "transparent",
    borderRadius: 30,
    backgroundColor: styleCommon.secondaryButtonColor
  },
  signUpButtonTitleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
    color: styleCommon.secondaryButtonTextColor
  },
  loginButtonStyle: {
    width: SCREEN_WIDTH - 40,
    height: 50,
    borderColor: "transparent",
    borderRadius: 30,
    backgroundColor: styleCommon.transparentButtonColorRGBA
  },
  loginButtonTitleStyle: {
    fontSize: 16,
    letterSpacing: 1.5,
    color: styleCommon.primaryButtonTextColor
  }
});

export { styles };
