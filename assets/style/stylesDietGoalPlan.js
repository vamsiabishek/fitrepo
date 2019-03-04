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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  titleContainer: {
    color: "white", //"#717173",
    fontFamily: "Billabong",
    fontSize: 60
  },
  textContainer: {
    color: "white"
  },
  viewDDContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10
  },
  dropdownContainer: {
    width: 300,
    padding: 10
  },
  dropdownBaseColor: {
    color: "black"
  },
  dropdownOffset: {
    top: 20,
    left: 0
  },
  dropdownPickerStyle: {
    backgroundColor: "white"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 30
  },
  inputLabel: {
    marginVertical: 15,
    marginHorizontal: 30,
    fontSize: 16
  },
  numberPickerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30
  },
  inputStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  nextButtonContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    height: 40
  },
  nextButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#00DB8D"
  },
  nextButtonTitleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  }
});

export { styles };
