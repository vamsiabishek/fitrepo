import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import AnimatedText from "./AnimatedText";
import { styles } from "../../assets/style/stylesLoading";

export default class Loading extends React.Component {
  render() {
    const { text, isTextBold } = this.props;
    let { textStyle } = styles;
    if (isTextBold === false) {
      textStyle = {
        ...textStyle,
        fontWeight: "normal"
      };
    }
    return (
      <View style={styles.mainContainer}>
        <LottieView
          source={require("../../assets/jsons/confettie_loading.json")}
          autoPlay
          loop
          style={styles.watermelonAnimationStyle}
        />
        <View style={styles.textViewContainer}>
          <AnimatedText text={text} textStyle={textStyle} />
        </View>
      </View>
    );
  }
}
