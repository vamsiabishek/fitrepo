import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  motherContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10
    //backgroundColor: "#28292B"
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
  signUpText: {
    justifyContent: "center",
    alignContent: "center",
    color: "white",
    fontSize: 60,
    fontFamily: "Billabong"
  },
  inputOuterViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 40,
    borderWidth: 5,
    borderColor: "transparent",
    borderRadius: 50,
    marginVertical: 5,
    padding: 10,
    backgroundColor: "white",
    opacity: 0.6
  },
  inputGradientContainer: {
    borderColor: "transparent",
    borderRadius: 60,
    marginBottom: 5
  },
  inputViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    borderColor: "transparent",
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: "white"
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 100,
    //height: 45,
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
    color: "black", // "#44484E",
    fontSize: 16
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336"
  },
  goToMedicalIDButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  goToMedicalIDButton: {
    borderRadius: 50,
    width: SCREEN_WIDTH - 40,
    height: 45,
    backgroundColor: "#00DB8D"
  },
  goToMedicalIDButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  goToMedicalIDButtonIcon: {
    paddingLeft: 5,
    color: "white"
  },
  radioButtonView: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: SCREEN_WIDTH - 60,
    marginBottom: 8,
    paddingVertical: 5,
    paddingHorizontal: 10
    //backgroundColor: "pink"
  },
  radioButtonTextIconStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 18
  },
  radioButtonTextStyle: {
    flexDirection: "row",
    marginLeft: 35,
    paddingTop: 5,
    paddingHorizontal: 5
    //backgroundColor: "blue"
  },
  radioButtonOuterIconStyle: {
    color: "black"
  },
  radioButtonText: {
    paddingLeft: 9,
    color: "black",
    fontSize: 16
  },
  radioButtonWrapStyle: {
    marginLeft: 20
  },
  radioButtonTextSmall: {
    paddingLeft: 9,
    color: "#44484E",
    fontSize: 10
  },
  radioButtonLabelStyle: {
    paddingLeft: 4,
    paddingRight: 4,
    color: "#44484E"
  },
  radioButtonDes: {
    borderWidth: 1,
    color: "#00DB8D"
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
  vegButtonGroup: {
    //width: SCREEN_WIDTH - 100,
    height: 35,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white"
  }
});

export { styles };
