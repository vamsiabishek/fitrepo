import { StyleSheet } from "react-native";
import {
  styleCommon,
} from "./stylesCommonValues";

export const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: "pink"
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: styleCommon.secondaryColor
  },
  container_text: {
    marginLeft: 7,
    padding: 2
    //backgroundColor: "grey"
  },
});
