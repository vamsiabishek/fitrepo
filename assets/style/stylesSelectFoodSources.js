import { StyleSheet, Dimensions } from "react-native";

const SCREE_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28292B"
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 30
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
  viewInputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREE_WIDTH - 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 20
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 30
  },
  inputLabel: {
    marginVertical: 15,
    marginHorizontal: 10,
    fontSize: 16
  },
  multiSelectDropdown: {
    width: 300,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40
  },
  nextButtonContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    height: 40
  },
  nextButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#00DB8D"
  },
  nextButtonTitleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  prevButtonContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    height: 40
  },
  prevButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#00DB8D"
  },
  prevButtonTitleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  }
});

export { styles };
