import { StyleSheet } from "react-native";
import { styleCommon, SCREEN_HEIGHT } from "./stylesCommonValues";

const styles = StyleSheet.create({
  container: {
    flex: 1
    /*justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28292B"*/
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 70
  },
  titleContainer: {
    color: "white", //"#717173",
    fontFamily: "Billabong",
    fontSize: 60
  },
  textContainer: {
    color: "white"
  },
  weeklyBarStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
    marginTop: 0,
    backgroundColor: "#36373A"
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
    justifyContent: "space-evenly",
    height: Math.round(SCREEN_HEIGHT * 0.06)
    //backgroundColor: "#36373A"
  },
  activeDayButton: {
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: styleCommon.selectedButtonColor
  },
  dayButton: {
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: styleCommon.disableColor
  },
  activeDayButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  dayButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  weekText: {
    fontSize: 18,
    fontWeight: "bold",
    color: styleCommon.textColor1
  }
});

export { styles };
