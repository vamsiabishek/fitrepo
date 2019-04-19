import { Platform, StyleSheet } from "react-native";
import {
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  DEVICE_NAME
} from "./stylesCommonValues";

export const styles = StyleSheet.create({
  backHeaderContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop:
      Platform.OS === "ios" ? (DEVICE_NAME.includes("iPhone X") ? 40 : 20) : 10
    //backgroundColor: "blueviolet"
  },
  buttonContainer: {
    width: SCREEN_WIDTH
    //backgroundColor: "chartreuse"
  },
  backButtonContainerStyle: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
    //backgroundColor: "burlywood"
  },
  backButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "transparent"
  },
  header: {
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "firebrick"
  },
  headerTitle: {
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontsCommon.font30,
    color: styleCommon.secondaryButtonTextColor
    //backgroundColor: "pink"
  }
});
