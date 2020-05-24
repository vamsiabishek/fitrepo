import React from 'react';
import {Alert, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  purchaseOfferings,
  makePurchase,
  getPurchaserInfoAndActiveEntitlements,
} from '../../common/PurchaseUtils';
import Modal from 'react-native-modal';
import MyButton from '../MyButton';
import {styles} from '../../../assets/style/stylesInitialScreen';
import {
  styleCommon,
  ICON_SIZE_MED,
} from '../../../assets/style/stylesCommonValues';
import {getGoalString} from '../../common/Util';
import LottieView from 'lottie-react-native';
import api from '../../common/Api';

export default class PurchaseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPurchaseSummary: false,
      purchaseSummary: undefined,
    };
  }

  savePurchase = async () => {
    const {
      purchaserInfo,
      activeEntitlements,
    } = await getPurchaserInfoAndActiveEntitlements();
    console.log('purchaserInfo', purchaserInfo);
    console.log('activeEntitlements', activeEntitlements);
  };

  handlePaymentProcess = async (purchasePackage) => {
    const {dietId} = this.props;
    this.setState({isLoading: true});
    try {
      const {purchaserInfo, productIdentifier} = await makePurchase(
        purchasePackage,
      );
      this.savePurchase();
      //console.log('Purchase Made of product identifier: ', productIdentifier);
      const activeEntitlements = purchaserInfo.entitlements.active;
      if (activeEntitlements.standard_role) {
        const purchaseDate =
          activeEntitlements.standard_role.originalPurchaseDate;
        const purchaseDetails = {
          dietId,
          productIdentifier,
          purchaseDate,
        };
        await api.post('/savePurchase', purchaseDetails);
        this.setState({
          isLoading: false,
          showPurchaseSummary: true,
          purchaseSummary: activeEntitlements,
        });
      }
    } catch (e) {
      if (!e.userCancelled) {
        this.setState({isLoading: false});
        console.error('Error occurred while handling payment: ', e);
        api.post('/printClientLogs', {
          type: 'error',
          logObject: {
            message: 'Error occurred while handling payment: ',
            error: e,
          },
        });
      } else {
        this.setState({isLoading: false});
        Alert.alert('Payment Cancelled', 'The user cancelled this payment.');
      }
    }
  };

  renderLoadingElement = () => {
    return (
      <View style={styles.modalLoadingOuterContainer}>
        <View style={styles.modalLoadingContiner}>
          <Text style={styles.headerText}>
            Processing Your{'\n'} Payment...
          </Text>
          <View style={styles.loadingAnimationContainer}>
            <LottieView
              source={require('../../../assets/jsons/purchase_loading_animation.json')}
              resizeMode={'cover'}
              autoPlay
              enableMergePathsAndroidForKitKatAndAbove
            />
          </View>
        </View>
      </View>
    );
  };

  renderFailureElement = () => {
    const {onClose} = this.props;
    return (
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
          onPress={() => onClose(false)}
          containerStyle={styles.closeButtonContainerStyle}
        />
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>Oops !</Text>
          <View style={styles.doneAnimationContainer}>
            <LottieView
              source={require('../../../assets/jsons/fail_animation.json')}
              resizeMode={'cover'}
              autoPlay
              enableMergePathsAndroidForKitKatAndAbove
            />
          </View>
          <Text style={styles.labelTextBold}>Something went wrong !</Text>
          <Text style={styles.labelText}>
            Looks like something went wrong while fetching our details, kindly
            try after sometime.
          </Text>
        </View>
      </View>
    );
  };

  renderSuccessElement = () => {
    const {
      selectedGoal,
      selectedProgram,
      onClose,
      packageToPurchase,
    } = this.props;
    const {purchaseSummary} = this.state;
    let donePurchase = '';
    if (purchaseSummary) {
      donePurchase = purchaseSummary.standard_role
        ? new Date(purchaseSummary.standard_role.originalPurchaseDate)
        : '';
    }
    return (
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
          onPress={() => onClose(true)}
          containerStyle={styles.closeButtonContainerStyle}
        />
        <View style={styles.modalContainer}>
          <Text style={styles.headerPurchaseDoneText}>Purchase Success</Text>
          <View style={styles.doneAnimationContainer}>
            <LottieView
              source={require('../../../assets/jsons/done_animation.json')}
              resizeMode="cover"
              autoPlay
              enableMergePathsAndroidForKitKatAndAbove
            />
          </View>
          <Text style={styles.priceText}>
            {packageToPurchase.product.price_string}
          </Text>
          <View style={styles.donePurchaseText}>
            <Text style={styles.labelText}>
              You have successfully bought the
            </Text>
            <Text style={styles.labelTextBold}>
              {selectedProgram}-Week {getGoalString(selectedGoal)} Diet
            </Text>
            <Text style={styles.labelText}>
              on {donePurchase.toDateString()} at {donePurchase.getHours()}:
              {donePurchase.getMinutes()}
            </Text>
          </View>
          <MyButton
            label={'DONE'}
            onButtonClick={() => onClose(true)}
            containerStyle={styles.targetButtonContainer}
          />
        </View>
      </View>
    );
  };

  renderDetailsPaymentElement = () => {
    const {
      onClose,
      selectedProgram,
      selectedGoal,
      packageToPurchase,
      trialDaysLeft,
      dietTrialEndDate,
    } = this.props;
    return (
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
          onPress={() => onClose(false)}
          containerStyle={styles.closeButtonContainerStyle}
        />
        <View style={styles.modalContainer}>
          <Text style={styles.headerPurcahseText}>
            One Step Away From Viewing Your Meals
          </Text>
          <View style={styles.purchaseAnimationContainer}>
            <LottieView
              source={require('../../../assets/jsons/purchase_animation.json')}
              loop
              autoPlay
              enableMergePathsAndroidForKitKatAndAbove
            />
          </View>
          <View>
            <Text style={styles.labelText}>Click below to buy the</Text>
            <Text style={styles.labelTextBold}>
              {selectedProgram}-Week {getGoalString(selectedGoal)} Diet Plan
            </Text>
          </View>
          <MyButton
            label={'PAY ' + packageToPurchase.product.price_string}
            onButtonClick={() => this.handlePaymentProcess(packageToPurchase)}
            containerStyle={styles.targetButtonContainer}
          />
          {trialDaysLeft !== undefined && dietTrialEndDate !== undefined && (
            <View>
              {trialDaysLeft > 0 ? (
                <React.Fragment>
                  <Text style={styles.smallerLabelText}>
                    You have {trialDaysLeft} days left in your trial week!
                  </Text>
                  <Text style={styles.smallerLabelText}>
                    Trial ends on {dietTrialEndDate.toDateString()}
                  </Text>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Text style={styles.smallerLabelText}>
                    Looks like your trial week has expired !
                  </Text>
                  <Text style={styles.smallerLabelText}>
                    Please pay to see the rest of the program's diet.
                  </Text>
                </React.Fragment>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  render() {
    const {isLoading, showPurchaseSummary} = this.state;
    const {isVisible, packageToPurchase} = this.props;
    return (
      <View>
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          isVisible={isVisible}
          backdropColor="black"
          backdropOpacity={0.5}>
          {!isLoading
            ? purchaseOfferings
              ? !showPurchaseSummary && packageToPurchase
                ? this.renderDetailsPaymentElement()
                : this.renderSuccessElement()
              : this.renderFailureElement()
            : this.renderLoadingElement()}
        </Modal>
      </View>
    );
  }
}
