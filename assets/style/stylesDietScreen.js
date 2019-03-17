import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#28292B"
  },
  viewContainer: {
    //flex: 1,
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
    //flex: 1,
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingLeft: 20
  },
  buttonContainer: {
    width: SCREEN_WIDTH,
    height: 60,
    paddingLeft: 20
  },
  nextButtonContainerStyle: {
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
    color: "#00DB8D"
  },
  nextButtonIconStyle: {
    color: "#00DB8D",
    paddingTop: 0,
    paddingLeft: 2
  },
  dropdownContainer: {
    width: 120,
    paddingVertical: 10,
  },
  dropdownBaseColor: {
    color: "white"
  },
  dropdownTextColor: {
    color: "white"
  },
  dropdownOffset: {
    top: 0,
    left: 0,
    color: "white"
  },
  dropdownPickerStyle: {
    backgroundColor: "white"
  },
  subHeaderContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    //backgroundColor: "white",
    backgroundColor: "#36373A",
    alignSelf: "stretch",
    height: 55
  },
  subHeaderComponents: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 5,
    marginLeft: 20,
    borderBottomWidth: 7,
    borderColor: "lightgrey"
  },
  activeSubHeaderComponents: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 5,
    marginLeft: 20,
    borderBottomWidth: 7,
    borderColor: "#00DB8D"
  },
  subHeaderMenuItems: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  sortLabel: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingRight: 5,
    color: "white"
  },
  listViewContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch"
  }
});

export { styles };
