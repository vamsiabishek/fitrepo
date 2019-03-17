import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mealItemHeaderView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    textAlign: "left",
    fontSize:16,
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: -3, height: 2},
    textShadowRadius: 20,
    color: "#00DB8D"
  },
  list: {
    //flex: 1,
    marginTop:20,
    marginLeft:-15,
    marginRight: 40,
  },
  descriptionContainer:{
    flexDirection: "column",
    paddingRight: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#719A70", //"#E08702",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#003300"
  },
  headerText: {
    alignItems: "flex-start",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
   // color: "#36373A",
  },
  headerIcon: {
    alignItems: "flex-end",
    color: "white",
    opacity: 0.6,
    paddingHorizontal: 2
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
  mealContainer: {
    flex: 1,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  mealItem: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    paddingVertical: 3,
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
    textDecorationLine: "underline",
    color: "white"
  }
});
