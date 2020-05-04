import React, {Component} from 'react';
import {View, Animated, StyleSheet, TouchableOpacity} from 'react-native';

const createStyles = ({totalWidth, eachCountWidth, height}) => {
  return StyleSheet.create({
    container: {
      width: totalWidth,
      height,
      borderRadius: height / 2,
      backgroundColor: '#f1f2f6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    slideView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FA8072',
      width: eachCountWidth,
      height,
      borderRadius: height / 2,
    },
    numberContainer: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    number: {
      height,
      width: eachCountWidth,
      justifyContent: 'center',
    },
    selectedNumber: {
      height,
      width: eachCountWidth,
      borderRadius: height / 2,
      backgroundColor: 'white',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      justifyContent: 'center',
    },
  });
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.count = props.displayValues.length;
    this.totalWidth = props.width;
    this.eachCountWidth = this.totalWidth / this.count;
    this.height = this.eachCountWidth;
    const selectedIndex = props.displayValues.findIndex(
      (value) => value === props.value,
    );
    this.state = {
      animationValue: new Animated.Value(0),
      value: props.value,
      selectedIndex,
    };
    this.styles = createStyles(this);
  }

  componentDidUpdate = () => {
    this.count = this.props.displayValues.length;
    this.totalWidth = this.props.width;
    this.eachCountWidth = this.totalWidth / this.count;
    this.height = this.eachCountWidth;
    if (this.props.value !== this.state.value) {
      const selectedIndex = this.props.displayValues.findIndex(
        (value) => value === this.props.value,
      );
      this.setState({
        animationValue: new Animated.Value(-100),
        value: this.props.value,
        selectedIndex,
      });
      this.styles = createStyles(this);
    }
  };

  slide = () => {
    Animated.timing(this.state.animationValue, {
      toValue: this.eachCountWidth,
      timing: 1500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.state.animationValue, {
        toValue: 0,
        timing: 2500,
        useNativeDriver: true,
      }).start();
    });
  };

  selectValue = (value, index) => {
    //this.setState({value, selectedIndex: index});
    const {onValueChange} = this.props;
    onValueChange(value);
  };

  render() {
    const {selectedIndex} = this.state;
    const {displayValues, fontSize} = this.props;
    const {container, numberContainer, selectedNumber, number} = this.styles;
    let {slideView} = this.styles;
    this.slide();
    const animatedtyle = {
      transform: [{translateX: this.state.animationValue}],
    };
    slideView = {
      ...slideView,
      width: this.eachCountWidth * (selectedIndex + 1),
    };
    return (
      <View style={container}>
        <Animated.View style={[animatedtyle, slideView]} />
        <View style={numberContainer}>
          {displayValues.map((num, i) => {
            const {value} = this.state;
            const color =
              num === value ? 'black' : num < value ? 'white' : 'grey';
            return (
              <View
                key={i}
                style={[{flex: 1}, num === value ? selectedNumber : {}]}>
                <TouchableOpacity
                  style={number}
                  onPress={() => this.selectValue(num, i)}>
                  <Animated.Text style={{color, textAlign: 'center', fontSize}}>
                    {`${num}`}
                  </Animated.Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

Slider.defaultProps = {
  width: 300,
  displayValues: [4, 8, 12, 16], // [1, 2, 3, 4, 5],
  value: 8, // 4
  fontSize: 15,
};

export default Slider;
