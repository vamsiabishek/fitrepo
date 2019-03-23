import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28292B"
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
    //backgroundColor: "white"
  },
  subScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  scrollViewContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: 10
    //backgroundColor: "purple"
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputOuterViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 10,
    marginHorizontal: 5,
    paddingVertical: 10
    //backgroundColor: "red"
  },
  inputViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 50,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "transparent"
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 120,
    height: 40,
    borderBottomWidth: 1,
    marginVertical: 10
    //backgroundColor: "purple"
  },
  inputStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    color: "#b0b3b7",
    fontSize: 18
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336"
  },
  radioButtonView: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: SCREEN_WIDTH - 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "transparent" // "white"
  },
  radioButtonWrapStyle: {
    marginLeft: 40
  },
  radioButtonTextIconStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 18
  },
  radioButtonOuterIconStyle: {
    color: "#00DB8D"
    //backgroundColor: "blue"
  },
  radioButtonTextStyle: {
    flexDirection: "row",
    marginLeft: 35,
    paddingTop: 5,
    paddingHorizontal: 5
    //backgroundColor: "blue"
  },
  radioButtonsWrapperStyle: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 36,
    padding: 5
    //backgroundColor: "pink"
  },
  levelRadioButtonsWrapperStyle: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 0,
    padding: 5
    //backgroundColor: "blue"
  },
  radioButtonText: {
    paddingLeft: 9,
    color: "#b0b3b7",
    fontSize: 16
  },
  radioButtonLabelStyle: {
    marginRight: 15,
    paddingLeft: 4,
    paddingRight: 4,
    color: "#b0b3b7"
    //backgroundColor: "red"
  },
  levelRadioButtonLabelStyle: {
    marginRight: 5,
    paddingLeft: 4,
    paddingRight: 4,
    color: "#b0b3b7"
    //backgroundColor: "red"
  },
  radioButtonDes: {
    borderWidth: 1,
    color: "#00DB8D"
  },
  errorInputStyle2: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336",
    fontSize: 12
  },
  numericInputButtonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: SCREEN_WIDTH - 50,
    borderBottomColor: "transparent",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 5
    //backgroundColor: "white"
  },
  numericInputButtonTextIconStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 18
  },
  numericInputButtonTextStyle: {
    flexDirection: "row",
    paddingTop: 5,
    marginLeft: 8
  },
  numericInputButtonIconStyle: {
    color: "#00DB8D",
    marginBottom: 10
  },
  numericInputButtonText: {
    marginTop: 5,
    paddingLeft: 9,
    paddingRight: 10,
    color: "#b0b3b7",
    fontSize: 16
  },
  numericInputButtonTextSmall: {
    marginTop: 5,
    paddingLeft: 9,
    paddingRight: 10,
    color: "#44484E",
    fontSize: 10
  },
  numberPickerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30
  },
  numberPickerIconStyle: {
    color: "#28292B"
  },
  numberPickerButtonDes: {
    color: "#b0b3b7",
    backgroundColor: "#00DB8D"
  },
  groupButtonViewContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginTop: 15,
    padding: 10
    //backgroundColor: "blue"
  },
  btsButtonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  btsButtonStyle: {
    width: SCREEN_WIDTH - 40,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "#00DB8D"
  },
  btsButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  btsButtonIconStyle: {
    color: "white",
    marginTop: 1,
    padding: 2
  },
  profileButtonHeaderContainer: {
    justifyContent: "flex-start",
    alignContent: "stretch",
    marginTop: 10,
    paddingTop: 20,
    paddingLeft: 20
    //backgroundColor: "orange"
  },
  profileButtonContainer: {
    width: SCREEN_WIDTH,
    height: 80
    //backgroundColor: "pink"
  },
  profileButtonContainerStyle: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  profileButtonStyle: {
    backgroundColor: "transparent"
  },
  profileButtonTitleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00DB8D"
  },
  profileButtonIconStyle: {
    color: "#00DB8D",
    paddingTop: 2
  },
  avatarOverlayContainerStyle: {
    backgroundColor: "#636568"
  },
  avatarImagePropsStyle: {
    backgroundColor: "#636568"
  }
});

export { styles };
