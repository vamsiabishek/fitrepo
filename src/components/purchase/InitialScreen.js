import React from 'react';
import {ActivityIndicator, Alert, View, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getPurchaserInfoAndActiveEntitlements,
  getPurchaserInfo,
  makePurchase,
} from '../../common/PurchaseUtils';
import Modal from 'react-native-modal';
import {f, database} from '../../common/FirebaseConfig';
import MyButton from '../MyButton';
import {styles} from '../../../assets/style/stylesInitialScreen';
import {
  styleCommon,
  ICON_SIZE_MED,
} from '../../../assets/style/stylesCommonValues';
import {getGoalString, getFitnessLevelString} from '../../common/Util';

export default class InitialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPurchaseSummary: false,
      purchaseSummary: undefined,
    };
  }

  componentDidMount = async () => {
    console.log("component did mount")
    this.setState({isLoading: true});
    const {
      purchaserInfo,
      activeEntitlements,
    } = await getPurchaserInfoAndActiveEntitlements();
    console.log('Purchaser Info: ', purchaserInfo);
    if (activeEntitlements.length === 0) {
      this.setState({isLoading: false});
    } else {
      this.setState({
        isLoading: false,
        showPurchaseSummary: true,
        purchaseSummary: purchaserInfo,
      });
    }
  };

  getPriceObjectOfChosenProgram = (program, fitnessLevel, paymentOptions) => {
    console.log("program, fitnessLevel, paymentOptions", program, fitnessLevel, paymentOptions)
    switch (program) {
      case 4:
        return fitnessLevel === 1
          ? paymentOptions.four_week_plans.beginner_diet
          : fitnessLevel === 2
          ? paymentOptions.four_week_plans.intermediate_diet
          : paymentOptions.four_week_plans.advanced_diet;
      case 8:
        return fitnessLevel === 1
          ? paymentOptions.eight_week_plans.beginner_diet
          : fitnessLevel === 2
          ? paymentOptions.eight_week_plans.intermediate_diet
          : paymentOptions.eight_week_plans.advanced_diet;
      case 12:
        return fitnessLevel === 1
          ? paymentOptions.twelve_week_plans.beginner_diet
          : fitnessLevel === 2
          ? paymentOptions.twelve_week_plans.intermediate_diet
          : paymentOptions.twelve_week_plans.advanced_diet;
      case 16:
        return fitnessLevel === 1
          ? paymentOptions.sixteen_week_plans.beginner_diet
          : fitnessLevel === 2
          ? paymentOptions.sixteen_week_plans.intermediate_diet
          : paymentOptions.sixteen_week_plans.advanced_diet;
    }
  };

  handlePaymentProcess = async (priceIdentifier) => {
    this.setState({isLoading: true});
    const {uid, dietId} = this.props;
    try {
      const purchaseMade = await makePurchase(priceIdentifier);
      console.log('Purchase Made: ', purchaseMade);
      if (purchaseMade.purchaserInfo.activeEntitlements !== 'undefined') {
        const purchaseSummary = await getPurchaserInfo();
        console.log(purchaseSummary);
        const purchaseId = uid + '-' + dietId;
        const purchaseDetails = {
          productIdentifier: purchaseSummary.activeEntitlements[0],
          purchaseId,
        };
        await database
          .ref(`users/${uid}/purchases/`)
          .push({
            ...purchaseDetails,
            purchaseDate: f.database.ServerValue.TIMESTAMP,
          })
          .then((res) => {
            alert('Purchase Successful !');
          })
          .catch((error) => {
            console.log('error while saving purchase details:', error);
          });
        this.setState({
          isLoading: false,
          showPurchaseSummary: true,
          purchaseSummary,
        });
      }
    } catch (e) {
      if (!e.userCancelled) {
        this.setState({isLoading: false});
        console.log('Error occurred while handling payment: ', e);
      } else {
        this.setState({isLoading: false});
        console.log('User cancelled payment: ', e);
        Alert.alert('User cancelled payment !');
      }
    }
  };

  render() {
    console.log("render")
    const {isLoading, showPurchaseSummary, purchaseSummary} = this.state;
    const {
      isVisible,
      selectedGoal,
      selectedProgram,
      paymentOptions,
      fitnessLevel,
      onClose,
      trialDaysLeft,
      dietTrialEndDate,
    } = this.props;
    const priceObject = this.getPriceObjectOfChosenProgram(
      selectedProgram,
      fitnessLevel,
      paymentOptions,
    );
    console.log("priceObject", priceObject)
    let activeEntitlement = '';
    let donePurchase = '';
    if (purchaseSummary !== undefined) {
      activeEntitlement = purchaseSummary.activeEntitlements[0];
      donePurchase =
        purchaseSummary.purchaseDatesForActiveEntitlements[activeEntitlement];
      console.log('Done Purchase: ', donePurchase);
    }
    return (
      <View>
        <Modal
          isVisible={isVisible}
          backdropColor="black"
          backdropOpacity={0.5}>
          <View style={styles.modalInsideStyle}>
            {!isLoading ? (
              <React.Fragment>
                {paymentOptions ? (
                  <React.Fragment>
                    {!showPurchaseSummary ? (
                      <React.Fragment>
                        <Button
                          icon={
                            <Icon
                              name="close"
                              size={ICON_SIZE_MED}
                              color={styleCommon.secondaryButtonTextColor}
                            />
                          }
                          type="clear"
                          onPress={() => onClose(false)}
                          containerStyle={styles.closeButtonContainerStyle}
                        />
                        <Text style={styles.headerText}>
                          One Step Away From Healthy Meals !
                        </Text>
                        <Image
                          source={require('../../../assets/images/healthy_food_3.png')}
                          style={{
                            margin: 10,
                          }}
                        />
                        <Text style={styles.labelText}>
                          To see the rest of the
                        </Text>
                        <Text style={styles.labelText}>
                          {selectedProgram}-Week{' '}
                          {getFitnessLevelString(fitnessLevel)} Level{' '}
                          {getGoalString(selectedGoal)} Diet Program
                        </Text>
                        <Text style={styles.labelText}>
                          Click below to buy it !
                        </Text>
                        <MyButton
                          label={'Pay ' + priceObject.price_string}
                          onButtonClick={() =>
                            this.handlePaymentProcess(priceObject.identifier)
                          }
                          containerStyle={styles.targetButtonContainer}
                        />
                        {trialDaysLeft !== undefined &&
                          dietTrialEndDate !== undefined && (
                            <React.Fragment>
                              <Text style={styles.smallerLabelText}>
                                You have {trialDaysLeft} days left in your trial
                                week!
                              </Text>
                              <Text style={styles.smallerLabelText}>
                                Trial ends on {dietTrialEndDate.toDateString()}
                              </Text>
                            </React.Fragment>
                          )}
                      </React.Fragment>
                    ) : (
                      <View>
                        <Button
                          icon={
                            <Icon
                              name="close"
                              size={ICON_SIZE_MED}
                              color={styleCommon.secondaryButtonTextColor}
                            />
                          }
                          type="clear"
                          onPress={() => onClose(true)}
                          containerStyle={styles.closeButtonContainerStyle}
                        />
                        <Text style={styles.headerText}>
                          Done with Payment !
                        </Text>
                        <Text style={styles.labelText}>
                          Payment Date: {donePurchase}
                        </Text>
                        <MyButton
                          label={'Done'}
                          onButtonClick={() => onClose(true)}
                          containerStyle={styles.targetButtonContainer}
                        />
                      </View>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Text style={styles.headerText}>Oopps !</Text>
                    <Text style={styles.headerText}>
                      Something went wrong !
                    </Text>
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              <ActivityIndicator color="black" />
            )}
          </View>
        </Modal>
      </View>
    );
  }
}
