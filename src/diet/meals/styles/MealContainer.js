import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20
  },
  header: {
    backgroundColor: "#5D6D7E",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "white"
  },
  headerText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500"
  },
  content: {
    padding: 20,
    backgroundColor: "#fff"
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)"
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)"
  },
  mealItem: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    paddingVertical: 3
  },
  mealItemName: {
    width: "60%",
    fontSize: 16
  },
  mealItemQuantity: {
    width: "40%",
    fontSize: 16
  },
  mealItemQuantityLabel: {
    width: "40%",
    fontSize: 16,
    fontWeight: "bold"
  }
});
