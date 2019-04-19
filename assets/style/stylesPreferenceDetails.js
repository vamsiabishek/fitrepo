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
    backgroundColor: styleCommon.secondaryButtonColor,
    borderRadius: 10,
    borderBottomWidth: 0,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5
  },
  contentBoxHeaderStyle: {
    width: SCREEN_WIDTH * 0.8, //300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    //backgroundColor: "red",
    padding: 5
  },
  headerTextStyle: {
    padding: 5,
    textAlign: "left",
    color: styleCommon.secondaryButtonTextColor,
    fontSize: fontsCommon.font15
  },
  headerIconStyle: {
    paddingRight: 5,
    color: styleCommon.selectedButtonColor
  },
  contentBoxMainStyle: {
    width: SCREEN_WIDTH * 0.8,
    marginTop: 10
    //backgroundColor: "purple"
  },
  buttonGroupTextStyle: {
    fontSize: fontsCommon.font14
  },
  buttonGroupSelectedTextStyle: {
    fontSize: fontsCommon.font15,
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
    paddingHorizontal: 10
  },
  nonVeg: {
    backgroundColor: styleCommon.selectedButtonColor,
    borderRadius: 30,
    width: "110%",
    alignItems: "center",
    paddingHorizontal: 10
  }
});
