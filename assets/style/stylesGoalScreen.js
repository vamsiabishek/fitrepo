import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    //backgroundColor: "#12231f", // Like "#0a1915" //  "#1D3642" // "#402142" // "#1C194C" //"#384245"
    backgroundColor: "#0a1915"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  goToHomeButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  goToHomeButton: {
    borderRadius: 50,
    width: SCREEN_WIDTH - 40,
    height: 40,
    //backgroundColor: "#00DB8D", //"#3dc0ff" // "#64D8A1" // "#32CCAE" // "#00DB8D"
    //backgroundColor: "#34d100",
    backgroundColor: "#00ef9a"
    //opacity: 0.5
  },
  goToHomeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    //color: "white"
    //color: "#15211d"
    //color: "#6a7773"
    //color: "#acc1bb"
    //color: "#777777"
    //color: "#d1cfcf"
    color: "#414c47"
  },
  goToHomeButtonIcon: {
    paddingLeft: 5,
    //color: "white"
    //color: "#15211d"
    //color: "#6a7773"
    //color: "#acc1bb"
    //color: "#777777"
    //color: "#d1cfcf"
    color: "#414c47"
  }
});

export { styles };
