import { StyleSheet } from "react-native";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon,
  fontsCommon
} from "./stylesCommonValues";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
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
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font15
  },
  inputDisableStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    color: styleCommon.darkDisableColor,
    fontSize: fontsCommon.font15
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
    color: styleCommon.textColor1
    //backgroundColor: "blue"
  },
  radioButtonWrapStyle: {
    marginLeft: 40
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
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font15
  },
  radioButtonLabelStyle: {
    marginRight: 15,
    paddingLeft: 4,
    paddingRight: 4,
    color: styleCommon.textColor1
    //backgroundColor: "red"
  },
  levelRadioButtonLabelStyle: {
    marginRight: 5,
    paddingLeft: 4,
    paddingRight: 4,
    color: styleCommon.textColor1
    //backgroundColor: "red"
  },
  radioButtonDes: {
    borderWidth: 1,
    color: styleCommon.textColor1
  },
  errorInputStyle2: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336",
    fontSize: fontsCommon.font12
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
    color: styleCommon.textColor1,
    marginBottom: 10
  },
  numericInputButtonText: {
    marginTop: 5,
    paddingLeft: 9,
    paddingRight: 10,
    color: styleCommon.textColor1,
    fontSize: fontsCommon.font15
  },
  numericInputButtonTextSmall: {
    marginTop: 5,
    paddingLeft: 9,
    paddingRight: 10,
    color: "#44484E",
    fontSize: fontsCommon.font10
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
    color: styleCommon.textColor2,
    backgroundColor: styleCommon.textColor1
  },
  btsButtonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  btsButtonStyle: {
    width: SCREEN_WIDTH * 0.81,
    height: 50,
    borderColor: "transparent",
    borderRadius: 30,
    backgroundColor: styleCommon.secondaryButtonColor
  },
  btsButtonDisableStyle: {
    width: SCREEN_WIDTH * 0.81,
    height: 50,
    borderColor: "transparent",
    borderRadius: 30,
    backgroundColor: styleCommon.secondaryButtonColor,
    opacity: 0.6
  },
  btsButtonText: {
    fontSize: fontsCommon.font15,
    fontWeight: "bold",
    letterSpacing: fontsCommon.letterSpacingOneFive,
    color: styleCommon.textColor2
  },
  btsButtonDisableText: {
    fontSize: fontsCommon.font15,
    fontWeight: "700",
    letterSpacing: fontsCommon.letterSpacingOneFive,
    color: styleCommon.textColor2
  },
  btsButtonIconStyle: {
    position: "absolute",
    left: 20,
    color: styleCommon.textColor2
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
    fontSize: fontsCommon.font15,
    fontWeight: "bold",
    color: styleCommon.textColor1
  },
  profileButtonIconStyle: {
    color: styleCommon.textColor1,
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
