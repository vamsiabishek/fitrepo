import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet
} from "react-native";
import {
  styleCommon,
  fontsCommon
} from "../../assets/style/stylesCommonValues";

class AnglePositionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewPosition: {
        x: 0,
        y: 0
      } // inits to zero
    };
    this.animatedValue = new Animated.Value();
  }
  componentDidMount = () => {
    /*const { containerSize, viewSize, angle, label } = this.props;
    const angleRad = this.degToRad(angle);
    const radius = containerSize / 2;
    const center = radius;
    // Calculate symbol position
    // Subtract half of symbol size to center it on the circle
    this.state.viewPosition.x =
      radius * Math.cos(angleRad) + center - viewSize / 2;
    this.state.viewPosition.y =
      radius * Math.sin(angleRad) + center - viewSize / 2;
    Animated.spring(
      this.animatedValue, // Auto-multiplexed
      {
        toValue: { x: this.state.viewPosition.x, y: this.state.viewPosition.y }
      }
    ).start(); */
  };
  degToRad = deg => {
    return (deg * Math.PI) / 180;
  };
  render() {
    const {
      containerSize,
      viewSize,
      angle,
      label,
      isSelected,
      onSelect,
      value
    } = this.props;
    const angleRad = this.degToRad(angle);
    const radius = containerSize / 2;
    const center = radius;
    // Calculate symbol position
    // Subtract half of symbol size to center it on the circle
    const x = radius * Math.cos(angleRad) + center - viewSize / 2;
    const y = radius * Math.sin(angleRad) + center - viewSize / 2;
    /* const animatedStyle = {
      transform: [
        {
          scale: this.animatedValue.interpolate({
            inputRange: [-50, 300],
            outputRange: [-50, 300]
          })
        },
        {
          translateX: this.animatedValue.interpolate({
            inputRange: [-50, 300],
            outputRange: [0, x]
          })
        },
        {
          translateY: this.animatedValue.interpolate({
            inputRange: [-50, 300],
            outputRange: [0, y]
          })
        }
      ]
    };*/
    return (
      <View
        style={[
          {
            width: viewSize,
            height: viewSize,
            borderRadius: viewSize / 2,
            left: x,
            top: y
          },
          styles.picker,
          isSelected ? styles.selectedPicker : {}
        ]}
      >
        <TouchableOpacity style={[{ width: viewSize,
            height: viewSize, justifyContent: "center",
            alignItems: "center"}]}
          onPress={() => onSelect(value)}
        >
          <Text
            style={[styles.textStyle, isSelected ? styles.selectedText : {}]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AnglePositionView;

const styles = StyleSheet.create({
  picker: {
    //borderWidth: 1,
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styleCommon.secondaryColorNew
  },
  selectedPicker: {
    backgroundColor: styleCommon.selectedButtonColor
  },
  textStyle: {
    fontWeight: "600",
    fontSize: fontsCommon.font15,
    textAlign: 'center',
    color: styleCommon.textColor1
  },
  selectedText: {
    color: styleCommon.textColor2
  }
});
