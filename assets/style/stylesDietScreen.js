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
    paddingTop:
      Platform.OS === "ios" ? (DEVICE_NAME.includes("iPhone X") ? 40 : 20) : 10
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
    paddingVertical: 10,
    marginTop: 5,
    marginLeft: 20,
    borderBottomWidth: 7,
    borderColor: styleCommon.textColor3
    //backgroundColor: "orange"
  },
  activeSubHeaderComponents: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 5,
    marginLeft: 20,
    borderBottomWidth: 7,
    borderColor: styleCommon.selectedButtonColor
    //backgroundColor: "orange"
  },
  subHeaderMenuItems: {
    fontSize: fontsCommon.font16,
    fontWeight: "bold",
    color: styleCommon.textColor2
  },
  sortContainerStyle: {
    flexDirection: "row",
    height: SCREEN_HEIGHT * 0.068
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
    backgroundColor: styleCommon.panelHeaderBoxColor
  },
  listViewContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch"
    //backgroundColor: "pink"
  }
});

export { styles };
