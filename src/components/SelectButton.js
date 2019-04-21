import React from "react";
import { Animated } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class SelectButton extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(1);
  }
  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.5
    }).start();
  };
  handlePressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3, //default 7
      tension: 40
    }).start();
  };
  render() {
    const {
      title,
      containerStyle,
      buttonStyle,
      titleStyle,
      buttonIcon,
      buttonIconColor,
      iconSize,
      iconName,
      onPress,
      iconLeft,
      value
    } = this.props;
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    };
    return (
      <Animated.View style={[containerStyle, animatedStyle]}>
        <Button
          buttonStyle={buttonStyle}
          titleStyle={titleStyle}
          title={title}
          icon={
            <Icon
              name={iconName}
              size={iconSize}
              color={buttonIconColor}
              style={buttonIcon}
            />
          }
          iconLeft = {iconLeft}
          onPressIn={() => this.handlePressIn()}
          onPressOut={() => this.handlePressOut()}
          onPress={() => onPress(value)}
        />
      </Animated.View>
    );
  }
}