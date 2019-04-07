import { StyleSheet } from "react-native";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon
} from "../../assets/style/stylesCommonValues";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  flatListContainer: {
    flex: 1
  },
  flatListContentContainer: {
    justifyContent: "center",
    alignContent: "center"
  },
  returnViewContainer: { flex: 1, flexDirection: "row" },
  subContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  touchableContainerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  lineContainer: {
    height: 50,
    width: 50,
    marginLeft: 45,
    borderLeftWidth: 3,
    borderColor: styleCommon.secondaryButtonColor
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT * 0.15,
    width: SCREEN_HEIGHT * 0.15, //SCREEN_WIDTH * 0.32,
    backgroundColor: styleCommon.secondaryButtonColor,
    borderRadius: (SCREEN_HEIGHT * 0.15) / 2
  },
  iconImageStyle: {
    width: SCREEN_HEIGHT * 0.1 - 18,
    height: SCREEN_HEIGHT * 0.1,
    tintColor: "#004A94"
  },
  iconDataStyle: {
    height: SCREEN_HEIGHT * 0.12,
    width: SCREEN_HEIGHT * 0.12, //SCREEN_WIDTH * 0.27,
    alignItems: "center",
    justifyContent: "center"
  },
  iconTextStyle: {
    fontSize: 70
  },
  levelDecriptionContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10
  },
  levelTitleStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: styleCommon.secondaryButtonTextColor
  },
  levelDescriptionStyle: {
    width: SCREEN_WIDTH * 0.48, //180,
    fontSize: 13,
    color: styleCommon.secondaryButtonTextColor
  }
});
