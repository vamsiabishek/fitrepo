import { Platform, StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, styleCommon } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT * 0.12,
    padding: 10
  },
  headerTitle: {
    textAlign: "center",
    fontSize: SCREEN_HEIGHT > 700 ? 30 : 25,
    fontWeight: "bold",
    color: styleCommon.secondaryButtonTextColor
  },
  backHeaderContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: Platform.OS === "ios" ? 40 : 10,
    paddingRight: 20
  },
  buttonContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.07,
    paddingRight: 20
  },
  backButtonContainerStyle: {
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginTop: 2,
    marginLeft: 10,
    height: 50
  },
  backButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "transparent"
  }
});
