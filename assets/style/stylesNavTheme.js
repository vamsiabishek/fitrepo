import { StyleSheet } from "react-native";
import { styleCommon } from "./stylesCommonValues";

const styles = StyleSheet.create({
  bottomNavBar: {
    paddingVertical: 2,
    //backgroundColor: "#28292B",
    backgroundColor: styleCommon.primaryColor, // "#0a1915",
    //color: "#44484E"
    color: styleCommon.textColor1 //"#24443D"
  },
  iconSize: 28,
  activeTintColor: {
    // color: "white"
    // color: "#24443d"
    color: styleCommon.secondaryColor //"#00EF9A"
  },
  labelStyle: {
    paddingVertical: 4
  },
  headerStyle: {
    borderBottomWidth: 0,
    borderColor: styleCommon.secondaryColor, //"#0a1915",
    backgroundColor: styleCommon.secondaryColor //"#0a1915"
  },
  headerTitleStyle: {
    //color: "white",
    // color: "#24443d",
    color: styleCommon.textColor1, //"#00EF9A",
    fontSize: 20,
    fontWeight: "bold"
  },
  headerTextStyle: {
    //color: "#00DB8D",
    color: styleCommon.textColor1, //"#00EF9A",
    fontSize: 18
  },
  headerTIcolor: {
    //color: "#00DB8D"
    color: styleCommon.textColor1 //"#00EF9A"
  }
});

export { styles };
