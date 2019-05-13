import { StyleSheet } from "react-native";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon,
  fontsCommon
} from "./stylesCommonValues";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
    //backgroundColor: styleCommon.primaryColor
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center"
    //backgroundColor: styleCommon.secondaryColor //"pink"
  },
  bannerHeaderContainer: {
    justifyContent: "space-between",
    alignContent: "center"
  },
  bannerContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.15 //220
  },
  bannerImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.15
  },
  bannergradientStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 60,
    //backgroundColor: "firebrick"
  },
  avatarOverlayContainerStyle: {
    backgroundColor: styleCommon.unSelected
  },
  avatarImagePropsStyle: {
    backgroundColor: styleCommon.unSelected
  },
  profileBannerStyle: {
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10
    //backgroundColor: "green"
  },
  profileBannerTitleStyle: {
    textAlign: "center",
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font28,
    fontWeight: "bold"
  },
  profileBannerSubTitleStyle: {
    textAlign: "center",
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font14
  },
  profileSubBannerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    paddingVertical: 5
    //backgroundColor: "indigo"
  },
  profileSubBannerBoxStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  profileBannerTextStyle: {
    fontSize: fontsCommon.font14,
    color: styleCommon.textColor1
  },
  profileStarColor: {
    color: "#f8bf45"
  },
  profileButtonIconStyle: {
    color: styleCommon.textColor1
  },
  profileButtonStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "yellow"
  },
  scrollViewContainerStyle: {
    flex: 1
    //backgroundColor: "orange"
  },
  scrollViewContentContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  boxesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    margin: 3,
    //backgroundColor: "rgba(102,255,255,.2)"
    //backgroundColor: "hotpink"
  },
  boxesStyle: {
    width: "98%",
    height: SCREEN_HEIGHT * 0.21,
    borderWidth: 1,
    borderColor: "transparent",
    marginVertical: 3,
    marginHorizontal: 3,
   // backgroundColor: styleCommon.secondaryColor //"transparent"
  },
  boxHeaderContainerView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 3
    //backgroundColor: "green"
  },
  boxHeaderIconStyle: {
    paddingRight: 3,
    color: styleCommon.textColor1
  },
  boxHeaderTextStyle: {
    fontSize: fontsCommon.font15,
    fontWeight: "bold",
    color: styleCommon.textColor1
  },
  boxContentRowContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "stretch",
    padding: 3
    //backgroundColor: "yellow"
  },
  boxContentColumnContainerStyle: {
    justifyContent: "space-evenly",
    alignContent: "stretch",
    padding: 3
    //backgroundColor: "purple"
  },
  boxContentIconStyle: {
    color: "#53C19A"
    //backgroundColor: "indigo"
  },
  boxContentTextStyle: {
    justifyContent: "flex-start",
    alignContent: "center",
    padding: 10
    //backgroundColor: "black"
  },
  boxContentGoalTextStyle: {
    justifyContent: "flex-start",
    alignContent: "center",
    padding: 10
    //backgroundColor: "black"
  },
  boxTextStyle: {
    paddingBottom: 5,
    fontSize: fontsCommon.font13,
    fontWeight: "bold",
    color: styleCommon.textColor1
  },
  avatarHumanOverlayStyle: {
    backgroundColor: "transparent"
  },
  progressCircleColor: {
    color: styleCommon.textColor1
  },
  progressCircleShadowColor: {
    color: styleCommon.unSelected
  },
  progressCircleBgColor: {
    color: styleCommon.secondaryColor //"#28292B"
  },
  progressBarBgColorComplete: {
    color: styleCommon.textColor1
  },
  progressBarBgColor: {
    color: styleCommon.textColor1
  }
});

export { styles };
