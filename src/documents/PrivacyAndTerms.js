import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  BG_COLOR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  DEVICE_NAME,
  ICON_SIZE_MED,
} from '../../assets/style/stylesCommonValues';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class PrivacyAndTerms extends Component {
  state = {
    accepted: false,
    showBothTermsAndPolicy: true,
    showTermsAndConditions: false,
    showPrivacyPolicy: false,
  };

  onTermsAndConditions = () => {
    this.setState({
      showTermsAndConditions: true,
      showBothTermsAndPolicy: false,
    });
    //setShowTermsAndConditions();
    console.log('terms and conditions pressed');
  };

  closeTermsAndConditions = () => {
    this.setState({
      showTermsAndConditions: false,
      showBothTermsAndPolicy: true,
    });
  };

  onPrivacyPolicy = () => {
    this.setState({
      showPrivacyPolicy: true,
      showBothTermsAndPolicy: false,
    });
    console.log('Privacy Policy pressed');
  };

  closePrivacyPolicy = () => {
    this.setState({
      showPrivacyPolicy: false,
      showBothTermsAndPolicy: true,
    });
  };

  render() {
    const {showPrivacyTerms, showCloseBtn = true, onCancel} = this.props;
    const {
      showBothTermsAndPolicy,
      showTermsAndConditions,
      showPrivacyPolicy,
    } = this.state;
    return (
      <Modal
        useNativeDriver={true}
        isVisible={showPrivacyTerms}
        backdropColor="black"
        backdropOpacity={0.5}
        style={styles.modalStyle}>
        {showBothTermsAndPolicy && (
          <View style={styles.container}>
            {showCloseBtn && (
              <Button
                icon={
                  <Icon
                    name="close-circle"
                    size={ICON_SIZE_MED}
                    color={styleCommon.textColorWhite}
                  />
                }
                type="clear"
                onPress={onCancel}
                containerStyle={styles.closeBtnStyle}
              />
            )}
            <Text style={styles.title}>Privacy & Terms</Text>
            <ScrollView
              style={styles.tcContainer}
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  this.setState({
                    accepted: true,
                  });
                }
              }}>
              <Text style={styles.tcP}>
                To create DietRepo account you need to agree the{' '}
                <Text
                  style={styles.textLink}
                  onPress={this.onTermsAndConditions}>
                  Terms and conditions
                </Text>{' '}
                below.
              </Text>
              <Text style={styles.tcP}>
                In addition, when you create an account, we process your
                information as described in our{' '}
                <Text style={styles.textLink} onPress={this.onPrivacyPolicy}>
                  Privacy Policy
                </Text>
                .
              </Text>
              <Text style={styles.tcP}>
                The term ‘[business name]’ or ‘us’ or ‘we’ refers to the owner
                of the website whose registered office is [address]. Our company
                registration number is [company registration number and place of
                registration]. The term ‘you’ refers to the user or viewer of
                our website.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} The content of the pages of this website is for your
                general information and use only. It is subject to change
                without notice.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} This website uses cookies to monitor browsing
                preferences. If you do allow cookies to be used, the following
                personal information may be stored by us for use by third
                parties: [insert list of information].
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} Neither we nor any third parties provide any warranty
                or guarantee as to the accuracy, timeliness, performance,
                completeness or suitability of the information and materials
                found or offered on this website for any particular purpose. You
                acknowledge that such information and materials may contain
                inaccuracies or errors and we expressly exclude liability for
                any such inaccuracies or errors to the fullest extent permitted
                by law.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} Your use of any information or materials on this
                website is entirely at your own risk, for which we shall not be
                liable. It shall be your own responsibility to ensure that any
                products, services or information available through this website
                meet your specific requirements.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} This website contains material which is owned by or
                licensed to us. This material includes, but is not limited to,
                the design, layout, look, appearance and graphics. Reproduction
                is prohibited other than in accordance with the copyright
                notice, which forms part of these terms and conditions.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} All trademarks reproduced in this website, which are
                not the property of, or licensed to the operator, are
                acknowledged on the website. Unauthorised use of this website
                may give rise to a claim for damages and/or be a criminal
                offence.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} From time to time, this website may also include
                links to other websites. These links are provided for your
                convenience to provide further information. They do not signify
                that we endorse the website(s). We have no responsibility for
                the content of the linked website(s).
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} Your use of this website and any dispute arising out
                of such use of the website is subject to the laws of England,
                Northern Ireland, Scotland and Wales.
              </Text>
              <Text style={styles.tcP}>
                The use of this website is subject to the following terms of use
              </Text>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={!this.state.accepted}
                onPress={() => alert('Privacy policy accepted')}
                style={
                  this.state.accepted ? styles.button : styles.buttonDisabled
                }>
                <Text style={styles.buttonLabel}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {showTermsAndConditions && (
          <TermsAndConditions
            onBack={this.closeTermsAndConditions}
            onCancel={this.closeTermsAndConditions}
          />
        )}
        {showPrivacyPolicy && (
          <PrivacyPolicy
            onBack={this.closePrivacyPolicy}
            onCancel={this.closePrivacyPolicy}
          />
        )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
    margin: 0,
  },
  container: {
    flex: 1,
    //paddingTop: SCREEN_HEIGHT * 0.1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: BG_COLOR,
    paddingTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.09
      : SCREEN_HEIGHT * 0.05,
  },
  title: {
    fontSize: fontsCommon.font24,
    color: styleCommon.textColorWhite,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  closeBtnStyle: {
    position: 'relative',
    top: -(SCREEN_WIDTH * 0.06),
    left: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.85
      : Platform.OS === 'ios'
      ? SCREEN_WIDTH * 0.8
      : SCREEN_WIDTH * 0.75,
    width: 40,
    alignItems: 'center',
    marginBottom: -(SCREEN_HEIGHT * 0.02),
    //backgroundColor: 'red',
  },
  textLink: {
    fontSize: fontsCommon.font12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: fontsCommon.font11,
    color: styleCommon.textColorWhite,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    // marginBottom: 10,
    fontSize: fontsCommon.font11,
    color: styleCommon.textColorWhite,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 25,
    //height: SCREEN_HEIGHT * 0.5,
    backgroundColor: BG_COLOR,
  },

  buttonContainer: {
    marginBottom: SCREEN_HEIGHT * 0.05,
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },

  buttonLabel: {
    fontSize: fontsCommon.font14,
    color: '#FFF',
    alignSelf: 'center',
  },
});

export default PrivacyAndTerms;
