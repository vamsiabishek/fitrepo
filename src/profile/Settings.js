import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  BG_COLOR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  ICON_SIZE,
} from '../../assets/style/stylesCommonValues';
import {Button} from 'react-native-elements';
import TermsAndConditions from '../documents/TermsAndConditions';
import PrivacyPolicy from '../documents/PrivacyPolicy';
import PrivacyAndTerms from '../documents/PrivacyAndTerms';
import Modal from 'react-native-modal';

const options = [
  {
    id: 'privacyAndTerms',
    name: 'Privacy & Terms',
  },
  {
    id: 'privacyPolicy',
    name: 'Privacy Policy',
  },
  {
    id: 'termsAndConditions',
    name: 'Terms & Conditions',
  },
];

class Settings extends Component {
  state = {
    showTermsAndConditions: false,
    showPrivacyPolicy: false,
    showPrivacyTerms: false,
  };
  showOptionPage = (id) => {
    const {navigate} = this.props.navigation;
    if (id === 'privacyAndTerms') {
      this.setShowPrivacyTerms();
    }
    if (id === 'termsAndConditions') {
      this.setShowTermsAndConditions();
      // navigate('TermsAndConditions', {
      //   showAcceptButton: false,
      // });
    } else if (id === 'privacyPolicy') {
      this.setShowPrivacyPolicy();
    }
  };
  renderOptions = ({item}) => {
    const {id, name} = item;
    return (
      <View style={styles.optionItem}>
        <TouchableOpacity onPress={() => this.showOptionPage(id)}>
          <Text style={styles.optionText}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  setShowPrivacyPolicy = () => {
    this.setState({showPrivacyPolicy: true});
  };

  closePrivacyPolicy = () => {
    this.setState({showPrivacyPolicy: false});
  };

  setShowTermsAndConditions = () => {
    this.setState({showTermsAndConditions: true});
  };

  closeTermsAndConditions = () => {
    this.setState({showTermsAndConditions: false});
  };

  setShowPrivacyTerms = () => {
    this.setState({showPrivacyTerms: true});
  };

  closePrivacyTerms = () => {
    this.setState({showPrivacyTerms: false});
  };

  render() {
    const {
      showTermsAndConditions,
      showPrivacyPolicy,
      showPrivacyTerms,
    } = this.state;
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Button
          icon={{
            name: 'arrow-left-thick',
            size: ICON_SIZE,
            color: styleCommon.headerIconsColor,
            type: 'material-community',
          }}
          containerStyle={styles.backButtonStyle}
          buttonStyle={styles.backButtonStyle}
          onPress={() => navigation.navigate('Profile')}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <FlatList
          data={options}
          renderItem={this.renderOptions}
          keyExtractor={(item) => item.id}
          style={styles.listContainer}
        />
        <Modal
          useNativeDriver={true}
          isVisible={showTermsAndConditions}
          backdropColor="black"
          backdropOpacity={0.5}
          style={styles.modalStyle}>
          <TermsAndConditions
            onBack={this.closeTermsAndConditions}
            onCancel={this.closeTermsAndConditions}
          />
        </Modal>
        <Modal
          useNativeDriver={true}
          isVisible={showPrivacyPolicy}
          backdropColor="black"
          backdropOpacity={0.5}
          style={styles.modalStyle}>
          <PrivacyPolicy
            onCancel={this.closePrivacyPolicy}
            onBack={this.closePrivacyPolicy}
          />
        </Modal>
        <PrivacyAndTerms
          showPrivacyTerms={showPrivacyTerms}
          onCancel={this.closePrivacyTerms}
          onBack={this.closePrivacyTerms}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  modalStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
    margin: 0,
  },
  backButtonStyle: {
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.05,
    //height: SCREEN_HEIGHT * 0.1,
  },
  title: {
    fontSize: fontsCommon.font30,
    color: styleCommon.textColorDesc,
  },
  listContainer: {
    //borderWidth: 1,
  },
  optionItem: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: styleCommon.textColor1,
    backgroundColor: styleCommon.secondaryColorNew,
    //paddingHorizontal: 10,
  },
  optionText: {
    fontSize: fontsCommon.font16,
    color: styleCommon.textColor1,
  },
});

export default Settings;
