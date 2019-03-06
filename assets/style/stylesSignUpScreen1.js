import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  motherContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: "#28292B",
    alignItems: "center",
    justifyContent: "center"
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  signUpText: {
    justifyContent: "center",
    alignContent: "center",
    color: "white",
    fontSize: 60,
    fontFamily: "Billabong"
  },
  userTypesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
    alignItems: "center",
    paddingTop: 10
  },
  userTypeItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    opacity: 1
  },
  userTypeItemContainerSelected: {
    opacity: 1
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100
  },
  userTypeLabel: {
    color: "white",
    fontSize: 11
  },
  inputOuterViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 40,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 40,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "white"
  },
  inputViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
    marginHorizontal: 10
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 100,
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginVertical: 10,
    paddingHorizontal: 8
  },
  inputStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    color: "#44484E",
    fontSize: 16
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336"
  },
  signUpButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  signUpButton: {
    borderRadius: 50,
    width: SCREEN_WIDTH - 40,
    height: 45,
    backgroundColor: "#00DB8D"
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  loginHereContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  alreadyAccountText: {
    fontSize: 14,
    color: "#717173"
  },
  loginButtonStyle: {
    paddingHorizontal: 2
  },
  loginHereText: {
    color: "#00DB8D", //Green Button
    fontSize: 13,
    fontWeight: "bold"
  }
});

export { styles };
