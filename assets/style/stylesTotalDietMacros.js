import { StyleSheet } from "react-native";
import { styleCommon } from "./stylesCommonValues";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "#28292B"
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
    color: styleCommon.textColor1,
    fontFamily: "Billabong",
    fontSize: 60
  },
  textContainer: {
    color: styleCommon.textColor1
  },
  macrosBarStyle: {
    flexDirection: "row",
    //backgroundColor: "#36373A",
    backgroundColor: "#0099cc",
    justifyContent: "space-between",
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 15,
    marginTop: 0,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6
  },
  badgeLabel: {
    marginTop: 2,
    marginRight: 2,
    fontSize: 16,
    color: styleCommon.secondaryColor
  },
  totalCaloriesBadge: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "rgba(153, 255, 102, .4)"
  },
  totalCaloriesValue: {
    color: "white",
    fontSize: 15,
    fontWeight: "600"
  }
});

export { styles };
