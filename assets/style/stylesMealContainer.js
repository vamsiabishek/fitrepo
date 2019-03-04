import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20
  },
  header: {
    backgroundColor: "#00DB8D",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "white"
  },
  headerText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  content: {
    padding: 20,
    backgroundColor: "#36373A"
  },
  active: {
    backgroundColor: "rgba(255,252,255,1)"
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
    fontSize: 16,
    color: "white"
  },
  mealItemQuantity: {
    width: "40%",
    fontSize: 16,
    color: "white"
  },
  mealItemQuantityLabel: {
    width: "40%",
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  }
});
