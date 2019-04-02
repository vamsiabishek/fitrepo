import React, { Component } from "react";
import { Picker, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import { styles } from "../../../assets/style/stylesNumberPicker";

export default class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNumber: this.props.numberArray[0]
    };
  }

  _resetNumberAndArray = () => {
    this.setState({
      selectedNumber: this.props.numberArray[0]
    });
  };

  _handleConfirm = () => {
    this.confirmed = true;
    this.props.onConfirm(this.state.selectedNumber);
    this._resetNumberAndArray();
  };

  _handleCancel = () => {
    this.confirmed = false;
    this.props.onCancel();
    this._resetNumberAndArray();
  };
  render() {
    const { numberArray, isVisible, unit } = this.props;
    const { selectedNumber } = this.state;
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
                selectedValue={selectedNumber}
                onValueChange={itemValue => {
                  this.setState({ selectedNumber: itemValue });
                }}
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

{
  /*style={styles.container}*/
}
