import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import AnimatedText from "./AnimatedText";
import { styles } from "../../assets/style/stylesLoading";

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <LottieView
          source={require("../../assets/jsons/glow_loading.json")}
          autoPlay
          loop
          style={styles.watermelonAnimationStyle}
        />
        <View style={styles.textViewContainer}>
          <AnimatedText
            text={"Signing you up with Fitrepo ..."}
            textStyle={styles.textStyle}
          />
        </View>
      </View>
    );
  }
}
