import { Platform, StyleSheet } from "react-native";
import { DEVICE_ID, SCREEN_HEIGHT, SCREEN_WIDTH } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  bottomNav: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom:
      Platform.OS === "ios"
        ? DEVICE_ID.includes("iPhone10,6") === true
          ? 40
          : 20
        : 10
  },
  navButtonActive: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.09, //60,
    borderRadius: (SCREEN_HEIGHT * 0.09) / 2 //30
  },
  navButtonDisabled: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.09, //60,
    borderRadius: (SCREEN_HEIGHT * 0.09) / 2, //30,
    opacity: 0.6
  },
  activeButtonTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 20
  },
  buttonTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 20
  },
  navButtonIcon: {
    position: "absolute",
    right: 20,
    color: "white"
  }
});
