import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28292B"
  },
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  loginView: {
    width: 250,
    height: 400,
    marginTop: 150,
    backgroundColor: "transparent"
  },
  loginTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  plusText: {
    color: "white",
    fontSize: 30,
    fontWeight: "normal"
  },
  loginInput: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    marginVertical: 10
  },
  inputStyle: {
    marginLeft: 10,
    color: "white"
  },
  errorInputStyle: {
    textAlign: "center",
    fontSize: 12,
    color: "#F44336"
  },
  loginButtonContainer: {
    marginTop: 10
  },
  loginButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 250,
    borderWidth: 2,
    borderColor: "#00DB8D",
    borderRadius: 30,
    backgroundColor: "#00DB8D"
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  signUpHereContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  newUserText: {
    fontSize: 16,
    color: "white"
  },
  signUpButtonStyle: {
    paddingHorizontal: 2
  },
  signUpButtonTitle: {
    color: "#00DB8D",
    fontSize: 15,
    fontWeight: "bold"
  }
});

export { styles };
