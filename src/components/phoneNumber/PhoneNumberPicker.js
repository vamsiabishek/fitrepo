import React, {Component} from 'react';
import {Image, TextInput, TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import Country from './country';
import Flags from './resources/flags';
import PhoneNumber from './phoneNumber';
import styles from './styles';
import CountryPicker from './CountryPicker';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ICON_SIZE_MED,
  ICON_SIZE,
  styleCommon,
  ICON_SIZE_SMALL,
} from '../../../assets/style/stylesCommonValues';

export default class PhoneInput extends Component {
  static setCustomCountriesData(json) {
    Country.setCustomCountriesData(json);
  }

  constructor(props, context) {
    super(props, context);

    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.getFlag = this.getFlag.bind(this);
    this.getISOCode = this.getISOCode.bind(this);

    const {countriesList, disabled, initialCountry} = this.props;

    if (countriesList) {
      Country.setCustomCountriesData(countriesList);
    }
    const countryData = PhoneNumber.getCountryDataByCode(initialCountry);

    this.state = {
      iso2: initialCountry,
      disabled,
      numberWithCode: countryData ? `+${countryData.dialCode}` : '',
      value: null,
      inputValue: '',
      countryCode: countryData ? `+${countryData.dialCode}` : '',
      showCountryPicker: false,
      isValidNumber: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let {inputValue} = state;
    const {phoneNumber, countryCode} = props;
    if (inputValue === '' && phoneNumber !== '') {
      return {
        inputValue: phoneNumber,
        numberWithCode: `${countryCode}${phoneNumber}`,
      };
    }
    return null;
  }

  onChangePhoneNumber = (number) => {
    const {countryCode} = this.state;
    const numberWithCode = `${countryCode}${number}`;
    this.setState({inputValue: number, numberWithCode});
  };

  onPressFlag = () => {
    this.setState({showCountryPicker: true});
  };

  getFlag = (iso2) => {
    return Flags.get(iso2);
  };

  getDialCode = () => {
    return PhoneNumber.getDialCode(this.state.formattedNumber);
  };

  getValue = () => {
    return this.state.formattedNumber.replace(/\s/g, '');
  };

  getNumberType = () => {
    return PhoneNumber.getNumberType(
      this.state.formattedNumber,
      this.state.iso2,
    );
  };

  getISOCode = () => {
    return this.state.iso2;
  };

  selectCountry = (iso2) => {
    if (this.state.iso2 !== iso2) {
      const {inputValue} = this.state;
      const countryData = PhoneNumber.getCountryDataByCode(iso2);
      if (countryData) {
        const {dialCode} = countryData;
        const numberWithCode = `+${dialCode}${inputValue}`;
        this.setState({
          iso2,
          countryCode: `+${countryData.dialCode}`,
          showCountryPicker: false,
          numberWithCode,
        });
        this.inputPhone.focus();
      }
    }
  };

  onCountryPickerClose = () => {
    this.setState({showCountryPicker: false});
  };

  isValidPhoneNumber = () => {
    let isValid = true;
    const {inputValue, numberWithCode, iso2, isValidNumber} = this.state;
    // console.log(inputValue, numberWithCode, iso2);
    if (inputValue.length < 3) {
      isValid = false;
    } else {
      isValid = PhoneNumber.isValidNumber(numberWithCode, iso2);
    }
    if (isValidNumber !== isValid) {
      this.setState({isValidNumber: isValid});
    }
    return isValid;
  };

  onPhoneNumberEnter = () => {
    if (this.isValidPhoneNumber()) {
      const {sendCodeToPhone} = this.props;
      const {numberWithCode, inputValue, countryCode} = this.state;
      sendCodeToPhone({
        phoneNumber: numberWithCode,
        phNumWithoutCountryCode: inputValue,
        countryCode,
      });
    }
  };

  format = (text) => {
    return this.props.autoFormat
      ? PhoneNumber.format(text, this.state.iso2)
      : text;
  };

  render() {
    const {
      iso2,
      disabled,
      showCountryPicker,
      countryCode,
      isValidNumber,
      inputValue,
    } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Enter your phone number</Text>
        </View>
        <View style={styles.phoneNumberContainer}>
          <TouchableOpacity
            onPress={this.onPressFlag}
            disabled={disabled}
            style={styles.countryCodeContainer}>
            <Image
              source={Flags.get(iso2)}
              style={[styles.flag, this.props.flagStyle]}
            />
            <Text style={{paddingLeft: 5}}>{countryCode}</Text>
            <Icon
              name="menu-down"
              color={styleCommon.iconColorDark}
              size={ICON_SIZE_SMALL}
            />
          </TouchableOpacity>

          <View>
            <Input
              placeholder="Phone Number"
              placeholderTextColor={styleCommon.textColor1}
              leftIcon={
                <Icon
                  name="phone"
                  color={styleCommon.iconColor}
                  size={ICON_SIZE_MED}
                />
              }
              containerStyle={styles.inputViewContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errorStyle={styles.errorInputStyle}
              keyboardAppearance="light"
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={true}
              returnKeyType="done"
              onChangeText={(text) => this.onChangePhoneNumber(text)}
              value={inputValue}
              ref={(input) => (this.inputPhone = input)}
              onSubmitEditing={() => {
                this.onPhoneNumberEnter();
              }}
              errorMessage={isValidNumber ? null : 'Invalid phone number!'}
            />
          </View>
        </View>

        <CountryPicker
          selectedCountry={iso2}
          onSubmit={this.selectCountry}
          buttonColor={this.props.pickerButtonColor}
          buttonTextStyle={this.props.pickerButtonTextStyle}
          cancelText={this.props.cancelText}
          cancelTextStyle={this.props.cancelTextStyle}
          confirmText={this.props.confirmText}
          confirmTextStyle={this.props.confirmTextStyle}
          pickerBackgroundColor={this.props.pickerBackgroundColor}
          itemStyle={this.props.pickerItemStyle}
          onPressCancel={this.onCountryPickerClose}
          onPressConfirm={this.props.onPressConfirm}
          showCountryPicker={showCountryPicker}
        />
      </View>
    );
  }
}

const styleType = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);

PhoneInput.propTypes = {
  textComponent: PropTypes.func,
  initialCountry: PropTypes.string,
  onChangePhoneNumber: PropTypes.func,
  value: PropTypes.string,
  style: styleType,
  flagStyle: styleType,
  textStyle: styleType,
  offset: PropTypes.number,
  textProps: PropTypes.object,
  onSelectCountry: PropTypes.func,
  onPressCancel: PropTypes.func,
  onPressConfirm: PropTypes.func,
  pickerButtonColor: PropTypes.string,
  pickerBackgroundColor: PropTypes.string,
  pickerItemStyle: styleType,
  countriesList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      iso2: PropTypes.string,
      dialCode: PropTypes.string,
      priority: PropTypes.number,
      areaCodes: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  cancelText: PropTypes.string,
  cancelTextStyle: styleType,
  confirmText: PropTypes.string,
  confirmTextTextStyle: styleType,
  disabled: PropTypes.bool,
  allowZeroAfterCountryCode: PropTypes.bool,
};

PhoneInput.defaultProps = {
  initialCountry: 'in',
  disabled: false,
  allowZeroAfterCountryCode: true,
};
