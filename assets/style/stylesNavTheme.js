import { StyleSheet } from "react-native";
import { styleCommon, fontsCommon } from "./stylesCommonValues";

const styles = StyleSheet.create({
  bottomNavBar: {
    paddingVertical: 2,
    backgroundColor: styleCommon.primaryColor,
    color: styleCommon.textColor1,
    tintColor: styleCommon.unSelected
  },
  activeTintColor: {
    color: styleCommon.textColor1
  },
  tintColor: {
    color: styleCommon.unSelected
  },
  labelStyle: {
    fontSize: fontsCommon.font14,
    fontWeight: "bold",
    paddingVertical: 4
  },
  headerStyle: {
    height: 35,
    //borderBottomWidth: 1,
    //borderColor: "black", //styleCommon.btnGradientColorLeft,
    backgroundColor: styleCommon.primaryColor,
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
