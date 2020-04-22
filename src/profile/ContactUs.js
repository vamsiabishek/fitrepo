import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  DEVICE_NAME,
  ICON_SIZE_MED,
} from '../../assets/style/stylesCommonValues';
import {GMAIL_ICON, FACEBOOK_ICON, INSTAGRAM_ICON} from '../common/Common';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

class ContactUs extends Component {
  render() {
    const {showContactUs, onCancel} = this.props;
    return (
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        isVisible={showContactUs}
        backdropColor="black"
        backdropOpacity={0.5}>
        <View style={styles.modalContainer}>
          <Button
            icon={
              <Icon
                name="close-circle"
                size={ICON_SIZE_MED}
                color={styleCommon.textColor1}
              />
            }
            type="clear"
            onPress={onCancel}
            containerStyle={styles.closeButtonContainerStyle}
          />
          <Text style={styles.modalTitle}>
            Thankyou for reaching out to us.
          </Text>
          <LottieView
            source={require('../../assets/jsons/contact_us.json')}
            autoPlay
            loop
            style={styles.animationStyle}
            enableMergePathsAndroidForKitKatAndAbove
          />
          <Text style={styles.modalSubTitle}>
            Please leave your queries/feedback through the below sources...
          </Text>
          <View style={styles.contactDetailsContainer}>
            <Image source={GMAIL_ICON} style={styles.socialIconImageStyle} />
            <Text style={styles.contactDetailsText}>fitrepo@gmail.com</Text>
          </View>
          <View style={styles.contactDetailsContainer}>
            <Image source={FACEBOOK_ICON} style={styles.socialIconImageStyle} />
            <Text style={styles.contactDetailsText}>FitRepo</Text>
          </View>
          <View style={styles.contactDetailsContainer}>
            <Image
              source={INSTAGRAM_ICON}
              style={styles.socialIconImageStyle}
            />
            <Text style={styles.contactDetailsText}>fitrepository</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: SCREEN_WIDTH * 0.1,
    // width: SCREEN_WIDTH * 0.95,
    marginTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.1
      : SCREEN_WIDTH * 0.01,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.2
      : SCREEN_WIDTH * 0.05,
  },
  closeButtonContainerStyle: {
    position: 'relative',
    top: -(SCREEN_WIDTH * 0.1),
    left: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.7
      : Platform.OS === 'android'
      ? SCREEN_WIDTH * 0.7
      : SCREEN_WIDTH * 0.63,
    width: 40,
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font26
      : fontsCommon.font30,
    // textAlign: 'center',
    color: styleCommon.textColor1,
  },
  modalSubTitle: {
    fontWeight: '400',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font16
      : Platform.OS === 'android'
      ? fontsCommon.font18
      : fontsCommon.font20,
    marginTop: 10,
    color: styleCommon.textColor1,
  },
  animationStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 30, // 20
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
    //backgroundColor: "teal"
    marginBottom: -10,
    marginTop: -10,
    marginLeft: -10,
  },
  contactDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  contactDetailsText: {
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font16
      : fontsCommon.font20,
    marginLeft: 10,
    color: styleCommon.textColor1,
  },
  socialIconImageStyle: {
    width: SCREEN_WIDTH * 0.13,
    height: SCREEN_WIDTH * 0.13, // SCREEN_HEIGHT * 0.06,
    borderRadius: SCREEN_HEIGHT * 0.06,
  },
});

export default ContactUs;
