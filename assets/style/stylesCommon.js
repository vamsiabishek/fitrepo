import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
   // alignItems: "center",
    //justifyContent: "center",
  },
  bgImage: {
    //flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
})

export { commonStyles };