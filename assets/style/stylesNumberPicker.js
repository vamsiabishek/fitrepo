import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    borderColor: "transparent",
    padding: 5
  },
  modalViewInnerComponent: {
    width: "100%",
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white"
  },
  modalHeaderView: {
    marginVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eaeaea",
    paddingVertical: 10
  },
  modalHeaderText: {
    fontSize: 14,
    color: "grey",
    textAlign: "center"
  },
  modalConfirmContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "#eaeaea"
  },
  modalCancelContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white"
  },
  modalButtonStyle: {
    height: 56
  },
  modalButtonTextStyle: {
    fontSize: 18
  },
  modalCancelButtonTextStyle: {
    fontWeight: "bold"
  }
});
