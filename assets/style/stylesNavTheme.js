import { StyleSheet } from "react-native";
import { styleCommon } from "./stylesCommonValues";

const styles = StyleSheet.create({
  bottomNavBar: {
    paddingVertical: 2,
    backgroundColor: styleCommon.primaryColor,
    color: styleCommon.textColor1,
    tintColor: styleCommon.textColor1
  },
  activeTintColor: {
    color: styleCommon.secondaryColor
  },
  tintColor: {
    color: styleCommon.primaryColor
  },
  labelStyle: {
    paddingVertical: 4
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: "black", //styleCommon.btnGradientColorLeft,
    backgroundColor: styleCommon.btnGradientColorLeft,
    color: styleCommon.secondaryButtonTextColor
  },
  headerTitleStyle: {
    color: styleCommon.textColor1,
    fontSize: 20,
    fontWeight: "bold"
  },
  headerTextStyle: {
    color: styleCommon.textColor1,
    fontSize: 18
  },
  headerTIcolor: {
    color: styleCommon.textColor1
  }
});

export { styles };
