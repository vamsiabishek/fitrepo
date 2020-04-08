import React, {Component} from 'react';
import {Picker, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import {styles} from '../../../assets/style/stylesNumberPicker';

export default class StringPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedString:
        this.props.selectedStr !== undefined
          ? this.props.selectedStr
          : this.props.stringArray[0],
    };
    this.selectedValue = this.props.selectedStr;
  }

  _resetStringAndArray = () => {
    this.setState({
      selectedString:
        this.props.selectedStr !== undefined
          ? this.props.selectedStr
          : this.props.stringArray[0],
    });
  };

  componentDidMount = () => {
    const {selectedString} = this.state;
    if (selectedString !== this.props.selectedStr) {
      this.setState({
        selectedString: this.props.selectedStr,
      });
    }
  };

  _handleConfirm = () => {
    this.confirmed = true;
    this.props.onConfirm(this.state.selectedString);
    this._resetStringAndArray();
  };

  _handleCancel = () => {
    this.confirmed = false;
    this.props.onCancel();
    this.selectedValue = this.props.selectedStr;
    this._resetStringAndArray();
  };
  _handleOnValueChange = (value) => {
    this.selectedValue = value;
    this.setState({selectedString: value});
  };
  render() {
    const {stringArray, isVisible, pickerHeading} = this.props;
    return (
      <View>
        <Modal
          isVisible={isVisible}
          backdropColor="black"
          backdropOpacity={0.5}
          style={styles.modalStyle}>
          <View style={styles.modalViewContainer}>
            <View style={styles.modalViewInnerComponent}>
              <View style={styles.modalHeaderView}>
                <Text style={styles.modalHeaderText}>
                  {pickerHeading ? pickerHeading : 'Pick an option'}
                </Text>
              </View>
              <Picker
                selectedValue={this.selectedValue}
                onValueChange={(itemValue) =>
                  this._handleOnValueChange(itemValue)
                }>
                {stringArray.map((str) => (
                  <Picker.Item key={str} label={str.toString()} value={str} />
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
