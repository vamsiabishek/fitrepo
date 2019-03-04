import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28292B"
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  titleContainer: {
    color: "white",
    fontFamily: "Billabong",
    fontSize: 60
  },
  textContainer: {
    color: "white"
  },
  macrosBarStyle: {
    flexDirection: "row",
    backgroundColor: "#36373A",
    justifyContent: "space-between",
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 15,
    marginTop: 0,
    width: "100%"
  },
  badgeLabel: {
    marginTop: 4,
    marginRight: 2,
    fontSize: 18,
    color: "white"
  }
});

export { styles };
