import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {Button} from 'react-native-elements';
import Country from './country';
import Flags from './resources/flags';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  styleCommon,
  ICON_SIZE_MED,
} from '../../../assets/style/stylesCommonValues';

const propTypes = {
  buttonColor: PropTypes.string,
  labels: PropTypes.array,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  itemStyle: PropTypes.object,
  onSubmit: PropTypes.func,
  onPressCancel: PropTypes.func,
  onPressConfirm: PropTypes.func,
};

export default class CountryPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: this.props.buttonColor || '#007AFF',
      modalVisible: false,
      selectedCountry: this.props.selectedCountry || Country.getAll()[0],
    };
    this.countryList = Country.getAll();
  }

  onPressCancel = () => {
    if (this.props.onPressCancel) {
      this.props.onPressCancel();
    }
  };

  onPressSubmit = () => {
    if (this.props.onPressConfirm) {
      this.props.onPressConfirm();
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selectedCountry);
    }
  };

  onValueChange = (selectedCountry) => {
    this.props.onSubmit(selectedCountry.iso2);
  };

  renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onValueChange(item)}
          style={styles.countryCodeListContainer}>
          <Text style={styles.countryName}>{item.name}</Text>
          <Image source={Flags.get(item.iso2)} style={styles.flag} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {showCountryPicker} = this.props;
    return (
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        isVisible={showCountryPicker}
        backdropColor="black"
        backdropOpacity={0.5}
        style={styles.countryPickerModal}>
        <View style={styles.basicContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.buttonView}>
              <Button
                icon={
                  <Icon
                    name="close-circle"
                    size={ICON_SIZE_MED}
                    color={styleCommon.textColor1}
                  />
                }
                type="clear"
                onPress={this.onPressCancel}
                containerStyle={styles.closeBtnStyle}
              />
            </View>

            <View style={styles.mainBox}>
              {/* <Picker
                style={styles.bottomPicker}
                selectedValue={this.state.selectedCountry}
                onValueChange={country => this.onValueChange(country)}
                itemStyle={itemStyle}
                mode="dialog">
                {Country.getAll().map((country, index) =>
                  this.renderItem(country, index),
                )}
              </Picker> */}
              <FlatList
                data={this.countryList}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.iso2}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

CountryPicker.propTypes = propTypes;
