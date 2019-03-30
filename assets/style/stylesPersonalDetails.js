import { Dimensions, StyleSheet } from "react-native";
import { styleCommon } from "./stylesCommonValues";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50
  },
  inputOuterViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "transparent",
    borderRadius: 50,
    margin: 10,
    padding: 10
    //backgroundColor: "pink"
  },
  inputViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    borderColor: "transparent",
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 8
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 100,
    borderBottomWidth: 1,
    borderBottomColor: styleCommon.textColor1,
    marginVertical: 10
  },
  inputStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: styleCommon.textColor1,
    fontSize: 16
  },
  inputIconStyle: {
    color: styleCommon.textColor1
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: "center",
    color: "#F44336"
  }
});

export { styles };
