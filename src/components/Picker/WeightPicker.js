import React, { Component } from "react";
import { Picker, PickerIOS, View } from "react-native";
import ReactNativeModal from "react-native-modal";

export default class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberArray: []
    };
  }
  componentDidMount = () => {
    const { numberArray } = this.state;
    const { minNumber, maxNumber } = this.props;
    const newNumberArray = [...numberArray];
    for (let x = 0; x < maxNumber; x++) {
      newNumberArray.push(minNumber + x * 0.5);
    }
    this.setState({
      ...numberArray,
      numberArray: newNumberArray
    });
  };
  render() {
    const { numberArray } = this.state;
    const { visible } = this.props;
    return (
      <ReactNativeModal
        animationType="slide"
        transparent={false}
        visible={visible}
        backdropOpacity={0.4}
        style={{
          justifyContent: "flex-end",
          margin: 10,
          height: 812
        }}
      >
        <Picker shouldRasterizeIOS={true}>
          {numberArray.map(number => (
            <Picker.Item
              key={number}
              label={number.toString()}
              value={number}
            />
          ))}
        </Picker>
      </ReactNativeModal>
    );
  }
}
