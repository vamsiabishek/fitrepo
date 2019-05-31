import { StyleSheet, Platform } from "react-native";
import {
  styleCommon,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  fontsCommon,
  DEVICE_NAME
} from "./stylesCommonValues";
console.log("Screen height: ", SCREEN_HEIGHT);

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
    paddingTop: DEVICE_NAME.includes("iPhone X") ? 40 : 20
    //backgroundColor: "blueviolet"
  },
  backButtonContainerStyle: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  backButtonStyle: {
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
    paddingBottom: 10
    // shadowOffset: { width: 2, height: 10 },
    // shadowOpacity: 0.8,
    //shadowRadius: 2,
    // elevation: 10,
    // zIndex: 1
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
    height: Math.round(
      DEVICE_NAME.includes("iPhone X")
        ? SCREEN_HEIGHT * 0.062
        : SCREEN_HEIGHT * 0.075
    ),
    backgroundColor: "#36373A"
  },
  buttonContainer: {
    width: SCREEN_WIDTH / 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0
    // backgroundColor: "yellow"
  },
  activeDayButton: {
    width: SCREEN_WIDTH / 2,
    height: "100%",
    borderRadius: 0,
    backgroundColor: styleCommon.selectedButtonColor
  },
  dayButton: {
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
