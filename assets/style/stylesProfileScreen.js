import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    backgroundColor: "#28292B"
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  bannerHeaderContainer: {
    justifyContent: "flex-start",
    alignContent: "stretch",
    height: 1
  },
  bannerContainer: {
    width: SCREEN_WIDTH,
    height: 220
  },
  bannergradientStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120
  },
  avatarOverlayContainerStyle: {
    backgroundColor: "#636568"
  },
  avatarImagePropsStyle: {
    backgroundColor: "#636568"
  },
  profileBannerStyle: {
    justifyContent: "center",
    alignContent: "center",
    marginTop: 230,
    paddingVertical: 5,
    paddingHorizontal: 10
    //backgroundColor: "green"
  },
  profileBannerTitleStyle: {
    textAlign: "center",
    color: "white",
    fontSize: 28,
    fontWeight: "bold"
  },
  profileBannerSubTitleStyle: {
    textAlign: "center",
    color: "white",
    fontSize: 14
  },
  profileSubBannerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "space-between",
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#28292B",
    paddingHorizontal: 40,
    paddingVertical: 5
    //backgroundColor: "red"
  },
  profileSubBannerBoxStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  profileBannerTextStyle: {
    fontSize: 14,
    color: "white"
  },
  profileStarColor: {
    color: "#f8bf45"
  },
  profileButtonIconStyle: {
    color: "#00DB8D"
  },
  profileButtonStyle: {
    backgroundColor: "transparent"
  },
  scrollViewContainerStyle: {
    flex: 1,
    width: "100%",
    marginTop: 10
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
    margin: 3
    //backgroundColor: "blue"
  },
  boxesStyle: {
    width: "98%",
    height: 170,
    borderWidth: 1,
    borderColor: "transparent", //#36373A",
    marginVertical: 3,
    marginHorizontal: 3,
    backgroundColor: "transparent" //"#36373A",
  },
  boxHeaderContainerView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 3
    //backgroundColor: "green"
  },
  boxHeaderIconStyle: {
    paddingRight: 3,
    color: "white"
  },
  boxHeaderTextStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  },
  boxContentRowContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "stretch",
    padding: 3
    //backgroundColor: "pink"
  },
  boxContentColumnContainerStyle: {
    justifyContent: "space-evenly",
    alignContent: "stretch",
    padding: 3
    //backgroundColor: "purple"
  },
  boxContentIconStyle: {
    color: "#53C19A"
    //backgroundColor: "pink"
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
    fontSize: 13,
    fontWeight: "bold",
    color: "white"
  },
  avatarHumanOverlayStyle: {
    backgroundColor: "transparent"
  },
  progressCircleColor: {
    color: "#00DB8D"
  },
  progressCircleShadowColor: {
    color: "#999"
  },
  progressCircleBgColor: {
    color: "#28292B"
  },
  progressBarBgColorComplete: {
    color: "#00DB8D"
  },
  progressBarBgColor: {
    color: "#00DB8D"
  }
});

export { styles };
