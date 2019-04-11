import { StyleSheet } from "react-native";
import { styleCommon } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  iconsWrapper: {
    flexDirection: "row"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: "grey"
  },
  iconStyle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 10,
    borderRightWidth: 0,
    borderColor: "#66ffff"
  },
  overlapOne: {
    borderRightWidth: 0
  },
  overlapTwo: {
    borderRightWidth: 0,
    position: "relative",
    left: -10
  },
  overlapThree: {
    position: "relative",
    left: -20
  },
  textColor: {
    color: styleCommon.textColor1
  }
});
