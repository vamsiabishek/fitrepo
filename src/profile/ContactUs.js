import React, {Component} from 'react';
import {Linking, View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../assets/style/stylesContactUs';
import {
  styleCommon,
  ICON_SIZE_MED,
} from '../../assets/style/stylesCommonValues';
import {GMAIL_ICON, FACEBOOK_ICON, INSTAGRAM_ICON} from '../common/Common';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import Feedback from '../feedback/Feedback';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFeedback: false,
    };
  }

  changeToFeedback = () => {
    this.setState({showFeedback: true});
  };

  render() {
    const {showFeedback} = this.state;
    const {showContactUs, onCancel, details} = this.props;
    const newDetails = {
      ...details,
      fromContactUs: true,
    };
    // console.log('newdetails: ', newDetails);
    return (
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        isVisible={showContactUs}
        backdropColor="black"
        backdropOpacity={0.5}>
        <View style={styles.modalOuterContainer}>
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
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Reach out to Us</Text>
            <View style={styles.contactUsAnimationContainer}>
              <LottieView
                source={require('../../assets/jsons/contact_us.json')}
                autoPlay
                loop
                enableMergePathsAndroidForKitKatAndAbove
              />
            </View>
            <Text style={styles.modalSubTitle}>
              Please leave your queries/feedback through the below sources...
            </Text>
            <View style={styles.contactDetailsWrapper}>
              <TouchableOpacity
                onPress={this.changeToFeedback}
                style={styles.contactDetailsContainer}>
                <Image
                  source={GMAIL_ICON}
                  style={styles.socialIconImageStyle}
                />
                <Text style={styles.contactDetailsText}>
                  dietrepository@gmail.com
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.facebook.com/dietrepo/')
                }
                style={styles.contactDetailsContainer}>
                <Image
                  source={FACEBOOK_ICON}
                  style={styles.socialIconImageStyle}
                />
                <Text style={styles.contactDetailsText}>DietRepo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.instagram.com/dietrepo/')
                }
                style={styles.contactDetailsContainer}>
                <Image
                  source={INSTAGRAM_ICON}
                  style={styles.socialIconImageStyle}
                />
                <Text style={styles.contactDetailsText}>dietrepository</Text>
              </TouchableOpacity>
            </View>
            <Feedback
              isVisible={showFeedback}
              onClose={() => {
                this.setState({showFeedback: false});
              }}
              details={newDetails}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default ContactUs;
