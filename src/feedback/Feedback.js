import React, {Component} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from '../components/MyButton';
import api from '../common/Api';
import {styles} from '../../assets/style/stylesFeedback';
import {
  styleCommon,
  ICON_SIZE_MED,
} from '../../assets/style/stylesCommonValues';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isLoading: false,
      showDetails: true,
      messageSent: {},
    };
  }

  onClickSend = async () => {
    const {details} = this.props;
    const {value} = this.state;
    const newDetails = {
      ...details,
      message: value,
    };
    this.setState({isLoading: true});
    const messageSent = await api.post('/sendMail', newDetails);
    if (messageSent.message !== 'success') {
      this.setState({isLoading: false, messageSent});
      messageSent.error &&
        Alert.alert(
          'Ooops!',
          'Looks like something went wrong while trying to send your feedback!. Please try again after sometime.',
        );
    } else {
      this.setState({isLoading: false, showDetails: false, messageSent});
    }
  };

  onClickClose = () => {
    const {onClose} = this.props;
    onClose();
  };

  render() {
    const {isVisible} = this.props;
    const {value, isLoading, showDetails} = this.state;
    return (
      <View>
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          isVisible={isVisible}
          backdropColor="black"
          backdropOpacity={0.5}>
          <View style={styles.modalOuterContainer}>
            <Button
              disabled={isLoading}
              icon={
                <Icon
                  name="close-circle"
                  size={ICON_SIZE_MED}
                  color={
                    isLoading
                      ? styleCommon.darkDisableColor
                      : styleCommon.textColor1
                  }
                />
              }
              type="clear"
              onPress={this.onClickClose}
              containerStyle={styles.closeButtonContainerStyle}
            />
            {isLoading ? (
              <View style={styles.modalContainer}>
                <Text style={styles.headerPurcahseText}>
                  Sending your feedback...
                </Text>
                <View style={styles.loadingAnimationContainer}>
                  <LottieView
                    source={require('../../assets/jsons/sending_feedback_animation.json')} // change the json
                    resizeMode="contain"
                    loop
                    autoPlay
                    enableMergePathsAndroidForKitKatAndAbove
                  />
                </View>
              </View>
            ) : showDetails ? (
              <DismissKeyboard>
                <KeyboardAvoidingView
                  keyboardVerticalOffset={Platform.OS === 'android' && -500}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  style={styles.modalContainer}
                  contentContainerStyle={styles.modalContainer}>
                  <Text style={styles.headerPurcahseText}>
                    Please Give Your Feedback
                  </Text>
                  <View style={styles.purchaseAnimationContainer}>
                    <LottieView
                      source={require('../../assets/jsons/feedback_animation.json')}
                      resizeMode="contain"
                      loop
                      autoPlay
                      enableMergePathsAndroidForKitKatAndAbove
                    />
                  </View>
                  <Text style={styles.labelText}>
                    Let us know how you felt about the last week's diet plan.
                  </Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      placeholder="Enter your feedback here !"
                      placeholderTextColor={styleCommon.darkDisableColor}
                      multiline
                      numberOfLines={4}
                      editable
                      keyboardAppearance="default"
                      maxLength={250}
                      value={value}
                      onChangeText={(newValue) =>
                        this.setState({value: newValue})
                      }
                      style={styles.textInputStyle}
                      textAlignVertical="top"
                    />
                  </View>
                  <MyButton
                    label={'SEND'}
                    onButtonClick={this.onClickSend}
                    containerStyle={styles.targetButtonContainer}
                  />
                </KeyboardAvoidingView>
              </DismissKeyboard>
            ) : (
              <View style={styles.modalContainer}>
                <Text style={styles.headerPurchaseDoneText}>
                  Feedback Sent !
                </Text>
                <View style={styles.doneAnimationContainer}>
                  <LottieView
                    source={require('../../assets/jsons/done_animation.json')}
                    resizeMode="cover"
                    autoPlay
                    enableMergePathsAndroidForKitKatAndAbove
                  />
                </View>
                <View style={styles.donePurchaseText}>
                  <Text style={styles.labelText}>
                    You have successfully sent your feedback for the current
                    diet plan.
                  </Text>
                </View>
                <MyButton
                  label={'DONE'}
                  onButtonClick={this.onClickClose}
                  containerStyle={styles.targetButtonContainer}
                />
              </View>
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

export default Feedback;
