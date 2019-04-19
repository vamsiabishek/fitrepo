import React from "react";
import { Animated, Easing, Image, View, Text } from "react-native";

export default class AnimatedText extends React.Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear
    }).start(() => this.spin());
  };

  componentDidMount() {
    this.spin();
  }

  render() {
    const { text, textStyle } = this.props;
    const textSize = this.spinValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [
        textStyle.fontSize,
        textStyle.fontSize + 3,
        textStyle.fontSize
      ]
    });
    return (
      <Animated.Text style={{ ...textStyle, fontSize: textSize }}>
        {text}
      </Animated.Text>
    );
  }
}
