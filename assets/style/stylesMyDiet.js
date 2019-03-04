import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
    /*justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28292B"*/
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 70
  },
  titleContainer: {
    color: "white", //"#717173",
    fontFamily: "Billabong",
    fontSize: 60
    //fontWeight: "bold",
    //fontStyle: "italic"
  },
  textContainer: {
    color: "white"
  },
  weeklyBarStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
    marginTop: 0,
    backgroundColor: "#36373A"
  },
  weeklyTouchableStyle: {
    flexDirection: "row",
    marginLeft: 10
  },
  weeklyTextStyle: {
    marginTop: 4,
    marginLeft: 2,
    fontSize: 18,
    color: "#00DB8D"
  },
  weeklyIconStyle: {
    color: "#00DB8D",
    paddingTop: 3
  },
  dayBarStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#36373A"
  },
  activeDayButton: {
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: "#009e65"
  },
  dayButton: {
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: "#00DB8D"
  },
  activeDayButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  dayButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 2
  }
});

export { styles };
