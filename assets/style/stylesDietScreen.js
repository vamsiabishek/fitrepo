import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  styleCommon,
  SCREEN_WIDTH,
  DEVICE_NAME,
  fontsCommon,
  SCREEN_HEIGHT
} from "./stylesCommonValues";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styleCommon.primaryColor
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  titleContainer: {
    color: "white",
    fontFamily: "Billabong",
    fontSize: 60
  },
  textContainer: {
    color: "white"
  },
  buttonHeaderContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: DEVICE_NAME.includes("iPhone X") ? 40 : 30
    //backgroundColor: "crimson"
  },
  buttonContainer: {
    width: SCREEN_WIDTH
    //backgroundColor: "floralwhite"
  },
  nextButtonContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  nextButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "transparent"
  },
  nextButtonTitleStyle: {
    fontSize: fontsCommon.font16,
    fontWeight: "600",
    color: styleCommon.textColor1
  },
  nextButtonIconStyle: {
    color: styleCommon.textColor1,
    fontWeight: "600",
    paddingTop: 0,
    paddingLeft: 2
  },
  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignSelf: "stretch",
    height: SCREEN_HEIGHT * 0.068,
    backgroundColor: styleCommon.panelHeaderBoxColor
  },
  subHeaderComponents: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginLeft: 20,
    borderBottomWidth: 7,
    borderColor: styleCommon.textColor3
    //backgroundColor: "orange"
  },
  activeSubHeaderComponents: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginLeft: 20,
    borderBottomWidth: 7,
    borderColor: styleCommon.selectedButtonColor
  },
  subHeaderMenuItems: {
    fontSize: fontsCommon.font18,
    fontWeight: "bold",
    color: styleCommon.textColor2
    // backgroundColor: "orange"
  },
  sortContainerStyle: {
    flexDirection: "row",
    height: SCREEN_HEIGHT * 0.068,
    marginRight: 10
    //backgroundColor: "orange"
  },
  sortLabel: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingHorizontal: 5,
    color: styleCommon.textColor2
    //backgroundColor: "black"
  },
  dropdownContainer: {
    width: SCREEN_WIDTH * 0.3,
    paddingVertical: 10
  },
  dropdownBaseColor: {
    color: styleCommon.textColor2
  },
  dropdownTextColor: {
    color: styleCommon.textColor2
  },
  dropdownOffset: {
    top: 0,
    left: 0,
    color: styleCommon.textColor2
  },
  dropdownPickerStyle: {
    backgroundColor: styleCommon.panelHeaderBoxColor,
    position: "absolute",
    alignItems: "center",
    top: 300,
    left: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.8,
    justifyContent: "center"
  },
  listViewContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 5
    //backgroundColor: "pink"
  },
  filterButtonContainerStyle: {
    justifyContent: "center",
    alignContent: "center"
  },
  filterButtonStyle: {
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
    backgroundColor: styleCommon.secondaryColor
  },
  activeFilterButtonStyle: {
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
    backgroundColor: styleCommon.selectedButtonColor
  },
  filterButtonTitle: {
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font15,
    fontWeight: "bold"
  },
  activeFilterButtonTitle: {
    color: styleCommon.textColor2,
    fontSize: fontsCommon.font15,
    fontWeight: "bold"
  },
  filterButtonIcon: {
    paddingLeft: 5,
    color: styleCommon.textColor1
  },
  activeFilterButtonIcon: {
    paddingLeft: 5,
    color: styleCommon.textColor2
  }
});

export { styles };
