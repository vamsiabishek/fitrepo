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

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class PrivacyPolicy extends Component {
  state = {
    accepted: false,
  };

  render() {
    const {showCloseBtn = true, onCancel, showAcceptBtn} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            icon={
              <Icon
                name="arrow-left-thick"
                size={ICON_SIZE_MED}
                color={styleCommon.textColorWhite}
              />
            }
            type="clear"
            containerStyle={styles.headerBtnStyle}
            //containerStyle={styles.backButtonContainerStyle}
            //buttonStyle={styles.backButtonStyle}
            onPress={onCancel}
          />
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
              containerStyle={styles.headerBtnStyle}
            />
          )}
        </View>
        <Text style={styles.title}>Privacy Policy</Text>
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
            Welcome to our website. If you continue to browse and use this
            website, you are agreeing to comply with and be bound by the
            following terms and conditions of use, which together with our
            privacy policy govern [business name]’s relationship with you in
            relation to this website. If you disagree with any part of these
            terms and conditions, please do not use our website.
          </Text>
          <Text style={styles.tcP}>
            The term ‘[business name]’ or ‘us’ or ‘we’ refers to the owner of
            the website whose registered office is [address]. Our company
            registration number is [company registration number and place of
            registration]. The term ‘you’ refers to the user or viewer of our
            website.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} The content of the pages of this website is for your
            general information and use only. It is subject to change without
            notice.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} This website uses cookies to monitor browsing
            preferences. If you do allow cookies to be used, the following
            personal information may be stored by us for use by third parties:
            [insert list of information].
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} Neither we nor any third parties provide any warranty or
            guarantee as to the accuracy, timeliness, performance, completeness
            or suitability of the information and materials found or offered on
            this website for any particular purpose. You acknowledge that such
            information and materials may contain inaccuracies or errors and we
            expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} Your use of any information or materials on this website
            is entirely at your own risk, for which we shall not be liable. It
            shall be your own responsibility to ensure that any products,
            services or information available through this website meet your
            specific requirements.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} This website contains material which is owned by or
            licensed to us. This material includes, but is not limited to, the
            design, layout, look, appearance and graphics. Reproduction is
            prohibited other than in accordance with the copyright notice, which
            forms part of these terms and conditions.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} All trademarks reproduced in this website, which are not
            the property of, or licensed to the operator, are acknowledged on
            the website. Unauthorised use of this website may give rise to a
            claim for damages and/or be a criminal offence.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} From time to time, this website may also include links to
            other websites. These links are provided for your convenience to
            provide further information. They do not signify that we endorse the
            website(s). We have no responsibility for the content of the linked
            website(s).
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} Your use of this website and any dispute arising out of
            such use of the website is subject to the laws of England, Northern
            Ireland, Scotland and Wales.
          </Text>
          <Text style={styles.tcP}>
            The use of this website is subject to the following terms of use
          </Text>
        </ScrollView>
        {showAcceptBtn && (
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
        )}
      </View>
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
    paddingBottom: SCREEN_HEIGHT * 0.06,
    backgroundColor: BG_COLOR,
    paddingTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.06
      : SCREEN_HEIGHT * 0.03,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontsCommon.font24,
    color: styleCommon.textColorWhite,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  headerBtnStyle: {},
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

export default PrivacyPolicy;
