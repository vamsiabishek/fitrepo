import React from 'react';
import {Animated, Image} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Emoji from 'react-native-emoji';

export default class SelectButton extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(1);
  }
  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.5,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
      useNativeDriver: true,
    }).start();
  };
  handlePressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3, //default 7
      tension: 40,
      useNativeDriver: true,
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
      iconRight,
      value,
      shouldUseEmoji,
      shouldUseImage,
      imageUrl,
      iconImageStyle,
    } = this.props;
    const animatedStyle = {
      transform: [{scale: this.animatedValue}],
    };
    const renderIcon = () => {
      if (shouldUseEmoji) {
        return (
          <Icon style={buttonIcon} size={iconSize}>
            <Emoji name={iconName} />
          </Icon>
        );
      } else if (shouldUseImage) {
        return (
          <Icon style={buttonIcon} size={iconSize}>
            <Image source={imageUrl} style={iconImageStyle} />
          </Icon>
        );
      }
      return (
        <Icon
          name={iconName}
          size={iconSize}
          color={buttonIconColor}
          style={buttonIcon}
        />
      );
    };
    return (
      <Animated.View style={[containerStyle, animatedStyle]}>
        <Button
          buttonStyle={buttonStyle}
          titleStyle={titleStyle}
          title={title}
          icon={renderIcon()}
          iconRight={iconRight}
          onPressIn={() => this.handlePressIn()}
          onPressOut={() => this.handlePressOut()}
          onPress={() => onPress(value)}
        />
      </Animated.View>
    );
  }
}
