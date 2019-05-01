import { StyleSheet, Platform } from "react-native";
import {
  styleCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  fontsCommon,
  DEVICE_NAME
} from "./stylesCommonValues";

const styles = StyleSheet.create({
  container: {
    flex: 1
    /*alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH*/
  },
  backHeaderContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop:
      Platform.OS === "ios" ? (DEVICE_NAME.includes("iPhone X") ? 40 : 20) : 10
    //backgroundColor: "blueviolet"
  },
  buttonContainer: {
    width: SCREEN_WIDTH
    //backgroundColor: "chartreuse"
  },
  backButtonContainerStyle: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
    //backgroundColor: "burlywood"
  },
  backButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "transparent"
  },
  backButtonTitleStyle: {
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font18
  },
  weeklyBarStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 10,
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.8,
    //shadowRadius: 2,
    elevation: 10,
    zIndex: 1
  },
  weeklyTouchableStyle: {
    flexDirection: "row"
  },
  weeklyTextStyleCenter: {
    marginTop: 4,
    marginLeft: 2,
    fontSize: 20,
    color: "#00DB8D"
  },
  weeklyTextStyle: {
    marginTop: 4,
    marginLeft: 2,
    fontSize: 18,
    color: "#009E65"
  },
  weeklyIconStyle: {
    paddingTop: 3,
    paddingHorizontal: 3,
    color: "#009E65"
  },
  dayBarStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: Math.round(SCREEN_HEIGHT * 0.06)
    //backgroundColor: "#36373A"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  activeDayButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 2,
    height: "100%",
    borderRadius: 0,
    backgroundColor: styleCommon.selectedButtonColor
  },
  dayButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 2,
    height: "100%",
    borderRadius: 0,
    backgroundColor: styleCommon.disableColor
  },
  activeDayButtonText: {
    fontSize: fontsCommon.font16,
    fontWeight: "bold",
    color: "white"
  },
  dayButtonText: {
    fontSize: fontsCommon.font14,
    fontWeight: "bold",
    color: styleCommon.unSelected
  },
  buttonIconStyle: {
    padding: 5
  },
  weekContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15
  },
  weekContainerLeftStyle: { justifyContent: "flex-start" },
  weekContainerIconStyle: { paddingHorizontal: 10 },
  weekContainerCenterStyle: { justifyContent: "center" },
  weekContainerRightStyle: { justifyContent: "flex-end" },
  weekText: {
    fontSize: fontsCommon.font18,
    fontWeight: "bold",
    color: styleCommon.textColor1
  }
});

export { styles };
