import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import AnimatedText from "./AnimatedText";
import { styles } from "../../assets/style/stylesLoading";
import { SCREEN_HEIGHT } from "../../assets/style/stylesCommonValues";

export default class Loading extends React.Component {
  render() {
    const {
      text,
      isTextBold,
      isTextNotAvailable,
      animationStr,
      animationHeight,
      takeFullHeight
    } = this.props;
    let { mainContainer, watermelonAnimationStyle, textStyle } = styles;
    if (isTextBold === false) {
      textStyle = {
        ...textStyle,
        fontWeight: "normal"
      };
    }
    if (takeFullHeight) {
      mainContainer = {
        ...mainContainer,
        height: SCREEN_HEIGHT
      };
    }
    if (animationHeight !== undefined) {
      watermelonAnimationStyle = {
        ...watermelonAnimationStyle,
        height: animationHeight
      };
    }
    return (
      <View style={mainContainer}>
        <LottieView
          source={animationStr}
          autoPlay
          loop
          style={watermelonAnimationStyle}
        />
        {!isTextNotAvailable ? (
          <View style={styles.textViewContainer}>
            <AnimatedText text={text} textStyle={textStyle} />
          </View>
        ) : (
          undefined
        )}
      </View>
    );
  }
}
