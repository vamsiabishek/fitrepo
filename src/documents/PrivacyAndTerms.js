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
  btnGradientColorRight,
  modalBtnGradientColorRight,
} from '../../assets/style/stylesCommonValues';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
import LottieView from 'lottie-react-native';
import Loading from '../components/Loading';

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
    isLoading: false,
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

  onAcceptPolicy = async () => {
    console.log('inside onAcceptPolict method');
    const {onAccept, navigation, disableShowPrivacy} = this.props;
    this.setState({isLoading: true, showCloseBtn: false});
    const acceptedAndSaved = await onAccept();
    console.log('acceptedAndSaved: ', acceptedAndSaved);
    if (acceptedAndSaved) {
      this.setState({isLoading: false});
      navigation.navigate('Signup', {fromLogin: true});
    } else {
      this.setState({isLoading: false});
      disableShowPrivacy();
    }
  };

  render() {
    const {
      showPrivacyTerms,
      showCloseBtn = true,
      onCancel,
      onAccept,
    } = this.props;
    const {
      showBothTermsAndPolicy,
      showTermsAndConditions,
      showPrivacyPolicy,
      isLoading,
    } = this.state;
    console.log('state in policy: ', this.state);
    return (
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
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
            {isLoading ? (
              <Loading
                text={'Signing you up with DietRepo...'}
                animationStr={require('../../assets/jsons/user_animation_4.json')}
                isTextBold={true}
                takeFullHeight={false}
              />
            ) : (
              <React.Fragment>
                <Text style={styles.title}>Privacy & Terms</Text>
                <LottieView
                  source={require('../../assets/jsons/terms_and_conditions.json')}
                  autoPlay
                  loop
                  style={styles.animationStyle}
                  enableMergePathsAndroidForKitKatAndAbove
                />
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
                    </Text>
                  </Text>
                  <Text style={styles.tcP}>
                    In addition, when you create an account, we process your
                    information safe and secure as described in our{' '}
                    <Text
                      style={styles.textLink}
                      onPress={this.onPrivacyPolicy}>
                      Privacy Policy
                    </Text>
                    .
                  </Text>
                </ScrollView>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => (onAccept ? this.onAcceptPolicy() : {})}>
                    <LinearGradient
                      colors={[
                        btnGradientColorRight,
                        modalBtnGradientColorRight,
                      ]}
                      style={styles.buttonGradiant}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}>
                      <Text style={styles.buttonTitle}>I ACCEPT</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
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
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: BG_COLOR,
    paddingTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.09
      : SCREEN_HEIGHT * 0.05,
  },
  title: {
    fontSize: fontsCommon.font26,
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
    fontSize: fontsCommon.font20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: fontsCommon.font18,
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
    marginBottom: SCREEN_HEIGHT * 0.06,
  },

  buttonStyle: {
    height: SCREEN_HEIGHT * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonGradiant: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.77,
    height: SCREEN_HEIGHT * 0.07, // 110
    borderRadius: SCREEN_HEIGHT * 0.07, // 60,
  },

  buttonTitle: {
    fontSize: fontsCommon.font14,
    fontWeight: 'bold',
    color: styleCommon.textColorWhite,
    alignSelf: 'center',
  },
  animationStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 30, // 20
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
    //backgroundColor: "teal"
  },
});

export default PrivacyAndTerms;
