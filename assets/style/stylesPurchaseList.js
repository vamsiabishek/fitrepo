import { StyleSheet } from "react-native";
import { styleCommon } from "./stylesCommonValues";

export const styles = StyleSheet.create({
  container: {
    borderColor: styleCommon.textColor1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    //backgroundColor: "pink"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginTop: 8,
    elevation: 2
  },
  rowContainerHeader: {
    borderBottomColor: styleCommon.textColor1,
    borderBottomWidth: 1
  },
  rowContainerTextHeader: {
    color: styleCommon.textColor1,
    padding: 2,
    fontWeight: "600"
    //backgroundColor: "grey"
  },
  rowContainerText: {
    color: styleCommon.textColor1,
    padding: 2
    //backgroundColor: "grey"
  }
});
