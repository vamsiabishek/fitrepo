import React, { Component } from "react";
import { Picker, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import { styles } from "../../../assets/style/stylesNumberPicker";

export default class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNumber:
        this.props.selectedNum !== undefined
          ? this.props.selectedNum
          : this.props.numberArray[0]
    };
    this.selectedValue = this.props.selectedNum;
  }
  _resetNumberAndArray = () => {
    this.setState({
      selectedNumber:
        this.props.selectedNum !== undefined
          ? this.props.selectedNum
          : this.props.numberArray[0]
    });
  };

  componentDidMount = () => {
    const { selectedNumber } = this.state;
    if (selectedNumber !== this.props.selectedNum) {
      this.setState({
        selectedNumber: this.props.selectedNum
      });
    }
  };
  _handleConfirm = () => {
    this.confirmed = true;
    this.props.onConfirm(this.state.selectedNumber);
    this._resetNumberAndArray();
  };
  _handleCancel = () => {
    this.confirmed = false;
    this.props.onCancel();
    this.selectedValue = this.props.selectedNum;
    this._resetNumberAndArray();
  };
  _handleOnValueChange = value => {
    this.selectedValue = value;
    this.setState({ selectedNumber: value });
  };
  render() {
    const { numberArray, isVisible, unit } = this.props;
    return (
      <View>
        <Modal
          isVisible={isVisible}
          backdropColor="black"
          backdropOpacity={0.5}
          style={styles.modalStyle}
        >
          <View style={styles.modalViewContainer}>
            <View style={styles.modalViewInnerComponent}>
              <View style={styles.modalHeaderView}>
                <Text style={styles.modalHeaderText}>
                  Pick a number ({unit})
                </Text>
              </View>
              <Picker
                selectedValue={this.selectedValue}
                onValueChange={itemValue =>
                  this._handleOnValueChange(itemValue)
                }
              >
                {numberArray.map(number => (
                  <Picker.Item
                    key={number}
                    label={number.toString()}
                    value={number}
                  />
                ))}
              </Picker>
              <View>
                <Button
                  title="Confirm"
                  containerStyle={styles.modalConfirmContainer}
                  buttonStyle={styles.modalButtonStyle}
                  titleStyle={styles.modalButtonTextStyle}
                  type="clear"
                  onPress={this._handleConfirm}
                />
              </View>
            </View>
            <View style={styles.modalCancelContainer}>
              <Button
                title="Cancel"
                buttonStyle={styles.modalButtonStyle}
                titleStyle={styles.modalCancelButtonTextStyle}
                type="clear"
                onPress={this._handleCancel}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
