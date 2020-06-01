import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Country from './country';
import Flags from './resources/flags';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  styleCommon,
  SCREEN_HEIGHT,
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
    this.countryList = Country.getAll();

    this.state = {
      buttonColor: this.props.buttonColor || '#007AFF',
      modalVisible: false,
      selectedCountry: this.props.selectedCountry || Country.getAll()[0],
      searchTerm: '',
      filteredCountries: this.countryList,
    };
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

  filterCountries = (searchTerm) => {
    let filteredCountries = [];
    this.countryList?.forEach((country) => {
      const parts = searchTerm
        .replace(/[\^$\\.*+?()[\]{}|]/g, '\\$&')
        .trim()
        .split(' ');
      const regex = new RegExp(`(${parts.join('|')})`, 'i');

      if (regex.test(country.name)) {
        filteredCountries.push(country);
      }
    });
    this.setState({searchTerm, filteredCountries});
  };

  render() {
    const {showCountryPicker} = this.props;
    const {searchTerm, filteredCountries} = this.state;
    const searchPlaceholderTextColor = 'white';
    const searchPlaceholderText = 'Search country';
    const searchSelectionColor = 'white'; //"rgba(0,0,0,0.2)";
    return (
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        isVisible={showCountryPicker}
        backdropColor="black"
        backdropOpacity={0.5}
        style={styles.countryPickerModal}>
        <View style={styles.basicContainer}>
          <View style={styles.searchBar}>
            <View style={{justifyContent: 'center'}}>
              <MaterialIcon
                name="search"
                size={18}
                style={{marginHorizontal: 15, color: 'white'}}
              />
            </View>
            <TextInput
              value={searchTerm}
              selectionColor={searchSelectionColor}
              onChangeText={(term) => this.filterCountries(term)}
              placeholder={searchPlaceholderText}
              autoFocus={false}
              selectTextOnFocus
              placeholderTextColor={searchPlaceholderTextColor}
              underlineColorAndroid="transparent"
              style={styles.searchTextInput}
            />
          </View>
          <TouchableOpacity
            style={styles.closeButtonContainerStyle}
            onPress={() => this.onPressCancel()}>
            <Icon
              name="close-circle"
              size={SCREEN_HEIGHT * 0.04}
              color={styleCommon.secondaryColorNew}
              style={{marginLeft: 1}}
            />
          </TouchableOpacity>
          <View style={styles.modalContainer}>
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
                data={filteredCountries}
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
