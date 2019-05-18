import { StyleSheet } from "react-native";
import { styleCommon } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  lineContainer: {
    height: 3,
    borderTopWidth: 3,
    borderColor: styleCommon.disableColor,
    width: 55 //65 Make dynamic
  },
  iconStyle: {
    height: 25, //15, Make dynamic
    width: 25, //15, Make dynamic
    backgroundColor: styleCommon.disableColor,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  iconDataStyle: {
    height: 20, //10, Make dynamic
    width: 20, //10, Make dynamic
    alignItems: "center",
    justifyContent: "center"
  },
  iconTextStyle: {
    fontSize: 11,
    color: "#494b50"
  },
  labelContainer: {
    width: 30,
    height: 30,
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  labelText: {
    fontSize: 10,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
    color: styleCommon.textColor1,
  }
});
