import { StyleSheet } from "react-native";
import {
  styleCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  fontsCommon
} from "./stylesCommonValues";

export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "lightpink"
  },
  innerView: {
    flex: 1
  },
  innerViewContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "yellow"
  },
  contentBoxStyle: {
    padding: 10,
    backgroundColor: "transparent"
    /*shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5*/
  },
  contentBoxHeaderStyle: {
    width: SCREEN_WIDTH * 0.8, //300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
    //backgroundColor: "red",
  },
  headerTextStyle: {
    padding: 5,
    textAlign: "left",
    alignItems: "center",
    color: styleCommon.secondaryButtonTextColor,
    fontSize: fontsCommon.font15
  },
  headerIconStyle: {
    paddingRight: 10,
    marginRight: 10,
    height: 40, 
    color: styleCommon.selectedButtonColor
  },
  contentBoxMainStyle: {
    width: SCREEN_WIDTH * 0.8,
    marginTop: 10
    //backgroundColor: "purple"
  },
  buttonGroupTextStyle: {
    textAlign: "center",
    fontSize: fontsCommon.font13
  },
  buttonGroupSelectedTextStyle: {
    textAlign: "center",
    fontSize: fontsCommon.font14,
    fontWeight: "bold",
    color: styleCommon.primaryButtonTextColor
  },
  vegButtonGroup: {
    height: SCREEN_HEIGHT * 0.074, //60,
    borderRadius: 30,
    borderWidth: 0,
    backgroundColor: styleCommon.disableColor
  },
  veg: {
    backgroundColor: styleCommon.selectedButtonColor,
    borderRadius: 30,
    width: "110%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  mealsNumber: {
    width: 25,
    height: 25,
    backgroundColor: styleCommon.selectedButtonColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  }
});
