import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  motherContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28292B"
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
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
  scrollViewContainer: {
    maxWidth: SCREEN_WIDTH - 60,
    maxHeight: 510,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    marginLeft: 10
  },
  scrollViewContentContainer: {
    justifyContent: "center",
    alignItems: "center"
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
  radioButtonView: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: SCREEN_WIDTH - 100,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginVertical: 10,
    paddingHorizontal: 8
  },
  radioButtonTextIconStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20
  },
  radioButtonTextStyle: {
    flexDirection: "row",
    marginLeft: 17
  },
  radioButtonText: {
    paddingLeft: 9,
    color: "#44484E",
    fontSize: 16
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336"
  },
  errorInputStyle2: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336",
    fontSize: 12
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
