import React, {Component} from 'react';
import {View, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import {styles} from '../../../assets/style/stylesNumberPicker';

export default class DatetimeAndroidPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate:
        this.props.date !== undefined ? this.props.date : new Date(),
    };
    this.selectedValue = this.props.date;
  }

  componentDidMount = () => {
    const {selectedDate} = this.state;
    if (selectedDate !== this.props.date) {
      this.setState({
        selectedDate: this.props.date,
      });
    }
  };

  _handleConfirm = () => {
    this.confirmed = true;
    this.props.onConfirm(this.state.selectedDate);
  };

  _handleCancel = () => {
    this.confirmed = false;
    this.props.onCancel();
    this.selectedValue = this.props.date;
  };

  _handleOnDateChange = (value) => {
    this.selectedValue = value;
    this.setState({selectedDate: value});
  };

  render() {
    const {isVisible, minDate, maxDate} = this.props;
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
                <Text style={styles.modalHeaderText}>Pick a date</Text>
              </View>
              <DatePicker
                mode="date"
                minimumDate={minDate}
                maximumDate={maxDate}
                date={this.selectedValue}
                onDateChange={(newDate) => this._handleOnDateChange(newDate)}
              />
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
