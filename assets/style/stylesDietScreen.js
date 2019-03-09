import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28292B"
  },
  viewContainer: {
    flex: 1,
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
    alignContent:  "stretch",
    marginTop: 10,
    paddingLeft: 20,
    paddingTop: 20
  },
  buttonContainer: {
    width: SCREEN_WIDTH,
    height: 80,
    paddingLeft: 20
  },
  nextButtonContainerStyle: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    height: 40
  },
  nextButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "transparent",
    borderRadius: 20,
    paddingHorizontal: 10
  },
  nextButtonTitleStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00DB8D",
    textDecorationLine: "underline"
  },
  nextButtonIconStyle: { color: "#00DB8D", paddingHorizontal: 3 }
});

export { styles };
