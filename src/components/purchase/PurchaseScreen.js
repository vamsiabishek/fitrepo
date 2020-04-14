import React from 'react';
import {ActivityIndicator, Alert, View, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getPurchaserInfo,
  purchaseOfferings,
  makePurchase,
  getActiveEntitlement,
  getPurchasePlanByFitnessLevelAndWeek,
  getPurchaserInfoAndActiveEntitlements,
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

export default class PurchaseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPurchaseSummary: false,
      purchaseSummary: undefined,
      priceObject: undefined,
    };
  }

  componentDidMount = async () => {
    this.setState({isLoading: true});
    const {selectedProgram, fitnessLevel, purchaseOptions} = this.props;
    const priceObject = getPurchasePlanByFitnessLevelAndWeek(
      // Change the name of the object to what it acually is
      selectedProgram,
      fitnessLevel,
      purchaseOptions,
    );
    this.setState({priceObject: priceObject});
    const purchaserInfo = await getPurchaserInfo();
    const activeEntitlements = purchaserInfo.entitlements.active;
    console.log('Active Entitlements: ', activeEntitlements);
    if (Object.entries(activeEntitlements).length) {
      this.setState({
        isLoading: false,
        showPurchaseSummary: true,
        purchaseSummary: activeEntitlements,
      });
    } else {
      this.setState({isLoading: false});
    }
  };

  handlePaymentProcess = async (purchasePackage) => {
    this.setState({isLoading: true});
    const {uid, dietId, paymentOptions} = this.props;
    try {
      const {purchaserInfo, productIdentifier} = await makePurchase(
        purchasePackage,
      );
      console.log('Purchase Made of product identifier: ', productIdentifier);
      const activeEntitlements = purchaserInfo.entitlements.active;
      if (activeEntitlements.standard_role) {
        const purchaseDate =
          activeEntitlements.standard_role.originalPurchaseDate;
        const purchaseDateType = new Date(purchaseDate);
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
            Alert.alert(
              'Purchase Successful !',
              'You have successfully bought your ' +
                paymentOptions.serverDescription +
                ' for ' +
                purchasePackage.product.price_string +
                ' on ' +
                purchaseDateType.toDateString() +
                ' at ' +
                purchaseDateType.getHours() +
                ':' +
                purchaseDateType.getMinutes(),
              this.props.onClose(true),
            );
          })
          .catch((error) => {
            console.log('error while saving purchase details:', error);
          });
        this.setState({
          isLoading: false,
          showPurchaseSummary: true,
          purchaserInfo,
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

  render() {
    const {
      isLoading,
      showPurchaseSummary,
      purchaseSummary,
      priceObject,
    } = this.state;
    const {
      isVisible,
      selectedGoal,
      selectedProgram,
      fitnessLevel,
      onClose,
      trialDaysLeft,
      dietTrialEndDate,
      purchaseOptions,
    } = this.props;
    console.log('Package to buy: ', priceObject);
    let donePurchase = '';
    if (purchaseSummary) {
      donePurchase = purchaseSummary.entitlements.active.standard_role
        ? new Date(
            purchaseSummary.entitlements.active.standard_role.originalPurchaseDate,
          )
        : '';
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
                {purchaseOfferings ? (
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
                          label={
                            'Pay ' + priceObject &&
                            priceObject.product.price_string
                          }
                          onButtonClick={() =>
                            this.handlePaymentProcess(priceObject)
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
                          Payment Date:{' '}
                          {donePurchase !== '' && donePurchase.toDateString()}
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
