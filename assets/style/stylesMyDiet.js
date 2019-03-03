import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  activeDayButton: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#00b272",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row"
  },
  dayButton: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#00DB8D",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row"
  },
  activeDayButtonText: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 5,
    fontWeight: "bold"
  },
  dayButtonText: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 5
  }
});

export { styles };
