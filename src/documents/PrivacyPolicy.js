import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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
    const date = new Date('2020-05-30');
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
            DietRepo built this app as a Commercial app. This SERVICE is
            provided by DietRepo and is intended for use as is. This page is
            used to inform visitors regarding the policies with the collection,
            use, and disclosure of Personal Information if anyone decided to use
            this Service.
          </Text>
          <Text style={styles.tcP}>
            If you choose to use this Service, then you agree to the collection
            and use of information in relation to this policy. The Personal
            Information that we collect is used for providing and improving the
            Service. We will not use or share your information with anyone
            except as described in this Privacy Policy.
          </Text>
          <Text style={styles.tcP}>
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which is accessible at DietRepo unless
            otherwise defined in this Privacy Policy.
          </Text>
          <Text style={styles.tcPH}>Information Collection and Use</Text>
          <Text style={styles.tcP}>
            For a better experience, while using our Service, we may require you
            to provide us with certain personally identifiable information,
            including but not limited to Name, gender, email, birthday, weight,
            height, food choice. The information that we request will be
            retained on your device and is not collected by us in any way.
          </Text>
          <Text style={styles.tcP}>
            The app does use third party services that may collect information
            used to identify you.
          </Text>
          <View>
            <Text style={styles.tcL}>{'\u2022'} Google Play Services</Text>
            <Text style={styles.tcL}>
              {'\u2022'} Google Analytics for Firebase
            </Text>
            <Text style={styles.tcL}>{'\u2022'} Facebook</Text>
          </View>
          <Text style={styles.tcPH}>Log Data</Text>
          <Text style={styles.tcP}>
            We want to inform you that whenever you use this Service, in a case
            of an error in the app we collect data and information (through
            third party products) on your phone called Log Data. This Log Data
            may include information such as your device Internet Protocol (“IP”)
            address, device name, operating system version, the configuration of
            the app when utilizing this Service, the time and date of your use
            of the Service, and other statistics.
          </Text>
          <Text style={styles.tcPH}>Cookies</Text>
          <Text style={styles.tcP}>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device's internal
            memory.
          </Text>
          <Text style={styles.tcP}>
            This Service does not use these “cookies” explicitly. However, the
            app may use third party code and libraries that use “cookies” to
            collect information and improve their services. You have the option
            to either accept or refuse these cookies and know when a cookie is
            being sent to your device. If you choose to refuse our cookies, you
            may not be able to use some portions of this Service.
          </Text>
          <Text style={styles.tcPH}>Service Providers</Text>
          <Text style={styles.tcP}>
            We may employ third-party companies and individuals due to the
            following reasons:
          </Text>
          <View>
            <Text style={styles.tcL}>
              {'\u2022'} To facilitate our Service;
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} To provide the Service on our behalf;
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} To perform Service-related services; or
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} To assist us in analyzing how our Service is used.
            </Text>
          </View>
          <Text style={styles.tcP}>
            We want to inform users of this Service that these third parties
            have access to your Personal Information. The reason is to perform
            the tasks assigned to them on our behalf. However, they are
            obligated not to disclose or use the information for any other
            purpose.
          </Text>
          <Text style={styles.tcPH}>Service Providers</Text>
          <Text style={styles.tcP}>
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot cannot guarantee its absolute security.
          </Text>
          <Text style={styles.tcPH}>Links to Other Sites</Text>
          <Text style={styles.tcP}>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise
            you to review the Privacy Policy of these websites. we have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </Text>
          <Text style={styles.tcPH}>Children’s Privacy</Text>
          <Text style={styles.tcP}>
            These Services do not address anyone under the age of 15. We do not
            knowingly collect personally identifiable information from children
            under 15. In the case we discover that a child under 15 has provided
            us with personal information, we immediately delete this from our
            servers. If you are a parent or guardian and you are aware that your
            child has provided us with personal information, please contact us
            so that we will be able to do necessary actions.
          </Text>
          <Text style={styles.tcPH}>Changes to This Privacy Policy</Text>
          <Text style={styles.tcP}>
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy on this
            page.
          </Text>
          <Text style={styles.tcP}>
            This policy is effective as of {date.toDateString()}.
          </Text>
          <Text style={styles.tcPH}>Contact Us</Text>
          <Text style={styles.tcP}>
            If you have any questions or suggestions about this Privacy Policy,
            do not hesitate to contact us at dietrepository@gmail.com.
          </Text>
        </ScrollView>
        {showAcceptBtn && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={!this.state.accepted}
              onPress={() =>
                Alert.alert('Success', 'You have accepted the Privacy policy.')
              }
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
  tcPH: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: fontsCommon.font11,
    fontWeight: '700',
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
