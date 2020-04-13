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
    };
  }

  componentDidMount = async () => {
    this.setState({isLoading: true});
    const purchaserInfo = await getPurchaserInfo();
    console.log('Purchaser Info: ', purchaserInfo.entitlements.active);
    if (Object.entries(purchaserInfo.entitlements.active).length) {
      this.setState({
        isLoading: false,
        showPurchaseSummary: true,
        purchaseSummary: purchaserInfo,
      });
    } else {
      this.setState({isLoading: false});
    }
  };

  handlePaymentProcess = async (purchasePackage) => {
    this.setState({isLoading: true});
    const {uid, dietId} = this.props;
    try {
      const {purchaserInfo, productIdentifier} = await makePurchase(
        purchasePackage,
      );
      console.log('Purchase Made: ', productIdentifier);
      if (purchaserInfo.entitlements.active.length) {
        console.log(
          'Purchased entitlement',
          purchaserInfo.entitlements.active[0][1],
        );
        const {originalPurchaseDate} = await getActiveEntitlement(
          purchaserInfo,
        );

        const purchaseDetails = {
          productIdentifier,
          originalPurchaseDate,
        };
        await database
          .ref(`users/${uid}/purchases/${dietId}`)
          .push({
            ...purchaseDetails,
            createdDate: f.database.ServerValue.TIMESTAMP,
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
          purchaserInfo,
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
    console.log('render');
    const {isLoading, showPurchaseSummary, purchaseSummary} = this.state;
    const {
      isVisible,
      selectedGoal,
      selectedProgram,
      fitnessLevel,
      onClose,
      trialDaysLeft,
      dietTrialEndDate,
    } = this.props;
    const priceObject = getPurchasePlanByFitnessLevelAndWeek(
      selectedProgram,
      fitnessLevel,
    );
    console.log('priceObject', priceObject);
    let activeEntitlement = '';
    let donePurchase = '';
    if (purchaseSummary) {
      activeEntitlement = getActiveEntitlement(purchaseSummary);
      donePurchase = activeEntitlement
        ? activeEntitlement.originalPurchaseDate
        : '';
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
                          label={'Pay ' + priceObject.product.price_string}
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
