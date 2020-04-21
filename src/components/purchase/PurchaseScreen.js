import React from 'react';
import {Alert, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {purchaseOfferings, makePurchase} from '../../common/PurchaseUtils';
import Modal from 'react-native-modal';
import {f, database} from '../../common/FirebaseConfig';
import MyButton from '../MyButton';
import {styles} from '../../../assets/style/stylesInitialScreen';
import {
  styleCommon,
  ICON_SIZE_MED,
  SCREEN_HEIGHT,
  DEVICE_NAME,
} from '../../../assets/style/stylesCommonValues';
import {getGoalString} from '../../common/Util';
import LottieView from 'lottie-react-native';

export default class PurchaseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPurchaseSummary: false,
      purchaseSummary: undefined,
    };
  }

  componentDidMount = async () => {
    /*this.setState({isLoading: true});
    const {uid, dietId} = this.props;
    console.log('dietID: ', dietId);
    await database
      .ref(`users/${uid}/purchases/${dietId}`)
      .once('value')
      .then((res) => {
        if (res.val()) {
          console.log('purchase Exists');
        }
      })
      .catch((error) => {
        console.log(
          'error while mounting purchase screen database call:',
          error,
        );
      });
    const {packageToPurchase} = this.state;
    const purchaserInfo = await getPurchaserInfo();
    const activeEntitlements = purchaserInfo.entitlements.active;
    console.log('packageObject: ', packageToPurchase);
    console.log('Active Entitlements: ', activeEntitlements);
    if (Object.entries(activeEntitlements).length) {
      if (
        activeEntitlements.standard_role.productIdentifier ===
        packageToPurchase.product.identifier
      ) {
        this.setState({
          isLoading: false,
          showPurchaseSummary: true,
          purchaseSummary: activeEntitlements,
        });
      }
    } else {
      this.setState({
        isLoading: false,
      });
    }*/
  };

  handlePaymentProcess = async (purchasePackage) => {
    this.setState({isLoading: true});
    const {uid, dietId} = this.props;
    try {
      const {purchaserInfo, productIdentifier} = await makePurchase(
        purchasePackage,
      );
      console.log('Purchase Made of product identifier: ', productIdentifier);
      const activeEntitlements = purchaserInfo.entitlements.active;
      if (activeEntitlements.standard_role) {
        const purchaseDate =
          activeEntitlements.standard_role.originalPurchaseDate;
        const purchaseDetails = {
          productIdentifier,
          purchaseDate,
        };
        await database
          .ref(`users/${uid}/purchases/${dietId}`)
          .push({
            ...purchaseDetails,
            createdDate: f.database.ServerValue.TIMESTAMP,
          })
          .then((res) => {
            console.log(
              'Successfully updated user db with the purchase details of this diet.',
            );
          })
          .catch((error) => {
            console.log('Error while saving purchase details:', error);
          });
        this.setState({
          isLoading: false,
          showPurchaseSummary: true,
          purchaseSummary: activeEntitlements,
        });
      }
    } catch (e) {
      if (!e.userCancelled) {
        this.setState({isLoading: false});
        console.log('Error occurred while handling payment: ', e);
      } else {
        this.setState({isLoading: false});
        Alert.alert('User cancelled payment !');
      }
    }
  };

  renderLoadingElement = () => {
    const headerAnimationLoadingViewStyle = {
      flex: 1,
      justifyContent: 'space-evenly',
    };
    const purchaseLoadingIconStyle = {
      height: SCREEN_HEIGHT * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      right: 10,
      // backgroundColor: 'pink',
    };
    return (
      <View style={styles.modalOuterContainer}>
        <View style={styles.modalLoadingInsideStyle}>
          <View style={styles.loadingView}>
            <View style={headerAnimationLoadingViewStyle}>
              <Text style={styles.headerText}>
                Processing Your{'\n'} Payment...
              </Text>
              <View style={purchaseLoadingIconStyle}>
                <LottieView
                  source={require('../../../assets/jsons/purchase_loading_animation.json')}
                  resizeMode="contain"
                  autoPlay
                  enableMergePathsAndroidForKitKatAndAbove
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderFailureElement = () => {
    return (
      <React.Fragment>
        <Text style={styles.headerText}>Oopps !</Text>
        <Text style={styles.headerText}>Something went wrong !</Text>
      </React.Fragment>
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
    const modalContentStyle = {flex: 1, justifyContent: 'space-between'};
    const doneIconStyle = {
      height: SCREEN_HEIGHT * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'pink',
    };
    const purchaseButtonTrialStyle = {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      //backgroundColor: 'pink',
    };
    let donePurchase = '';
    if (purchaseSummary) {
      donePurchase = purchaseSummary.standard_role
        ? new Date(purchaseSummary.standard_role.originalPurchaseDate)
        : '';
    }
    return (
      <View style={modalContentStyle}>
        <View>
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
            containerStyle={styles.closeButtonDoneContainerStyle}
          />
          <View style={styles.textualArea}>
            <View>
              <Text style={styles.headerPurchaseDoneText}>
                Purchase Success
              </Text>
              <View style={doneIconStyle}>
                <LottieView
                  source={require('../../../assets/jsons/done_animation.json')}
                  resizeMode="contain"
                  autoPlay
                  enableMergePathsAndroidForKitKatAndAbove
                />
              </View>
              <Text style={styles.priceText}>
                {packageToPurchase.product.price_string}
              </Text>
            </View>
          </View>
        </View>
        <View style={purchaseButtonTrialStyle}>
          <View>
            <Text style={styles.labelText}>
              You have successfully bought the
            </Text>
            <Text style={styles.labelTextBold}>
              {selectedProgram}-Week {getGoalString(selectedGoal)} Diet
            </Text>
            <Text style={styles.labelText}>
              on {donePurchase.toDateString()} at {donePurchase.getHours()}:
              {donePurchase.getMinutes()}.
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
    const purchaseIconStyle = {
      height: SCREEN_HEIGHT * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      right: DEVICE_NAME.includes('iPhone 11') ? 40 : 30,
      bottom: DEVICE_NAME.includes('iPhone 11') ? 30 : 0,
      //backgroundColor: 'pink',
    };
    const purchaseButtonTrialStyle = {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      //backgroundColor: 'pink',
    };
    return (
      <React.Fragment>
        <View style={}>
        <View>
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
          <View style={styles.textualArea}>
            <View>
              <Text style={styles.headerPurcahseText}>
                One Step Away From Viewing Your Meals
              </Text>
              <View style={purchaseIconStyle}>
                <LottieView
                  source={require('../../../assets/jsons/purchase_animation.json')}
                  resizeMode="contain"
                  autoPlay
                  enableMergePathsAndroidForKitKatAndAbove
                />
              </View>
            </View>
          </View>
        </View>
        <View style={purchaseButtonTrialStyle}>
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
              <Text style={styles.smallerLabelText}>
                You have {trialDaysLeft} days left in your trial week!
              </Text>
              <Text style={styles.smallerLabelText}>
                Trial ends on {dietTrialEndDate.toDateString()}
              </Text>
            </View>
          )}
        </View>
        </View>
      </React.Fragment>
    );
  };

  render() {
    const {isLoading, showPurchaseSummary} = this.state;
    const {isVisible, packageToPurchase} = this.props;
    return (
      <View>
        <Modal
          useNativeDriver={true}
          isVisible={isVisible}
          backdropColor="black"
          backdropOpacity={0.5}>
          {!isLoading ? (
            <View style={styles.modalOuterContainer}>
              <View style={styles.modalContainer}>
                {purchaseOfferings
                  ? !showPurchaseSummary && packageToPurchase
                    ? this.renderDetailsPaymentElement()
                    : this.renderSuccessElement()
                  : this.renderFailureElement()}
              </View>
            </View>
          ) : (
            this.renderLoadingElement()
          )}
        </Modal>
      </View>
    );
  }
}
