import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  DEVICE_NAME,
  ICON_SIZE_MED,
} from '../../assets/style/stylesCommonValues';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import PurchaseList from '../components/purchase/PurchaseList';
import api from '../common/Api';

class MyPurchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
    };
  }
  componentDidMount = async () => {
    await this.fetchDietPurchases();
  };

  componentDidUpdate = async (prevProps) => {
    const {diets} = this.props;
    const {diets: prevDiets} = prevProps;
    let refetch = false;
    if (diets.length !== prevDiets.length) {
      refetch = true;
    } else {
      prevDiets.map((diet) => {
        const newPropDiet = diets.find(({id}) => id === diet.id);
        if (newPropDiet && newPropDiet.paymentStatus !== diet.paymentStatus) {
          refetch = true;
        }
      });
    }
    if (refetch) {
      await this.fetchDietPurchases();
    }
  };

  fetchDietPurchases = async () => {
    const {diets} = this.props;
    console.log('user diets', diets);
    const dietIds = diets
      .filter((diet) => diet.paymentStatus)
      .map((diet) => diet.id);
    const purchases = await api.post('/getPurchases', dietIds);
    this.setState({purchases});
  };
  render() {
    const {showPurchases, onCancel} = this.props;
    const {purchases} = this.state;
    const hasPurchases = purchases.length;
    return (
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        isVisible={showPurchases}
        backdropColor="black"
        backdropOpacity={0.5}>
        <View
          style={
            hasPurchases
              ? styles.modalOuterContainer
              : styles.modalNoPurchasesContainer
          }>
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
          <View
            style={
              hasPurchases ? styles.modalContainer : styles.modalEmptyContainer
            }>
            <Text style={styles.modalPurchasesTitle}>
              {purchases.length ? 'Purchases History' : 'No Purchases'}
            </Text>
            <View
              style={
                hasPurchases
                  ? styles.purchaseHistoryAnimationStyle
                  : styles.noPurchaseAnimationStyle
              }>
              <LottieView
                source={
                  hasPurchases
                    ? require('../../assets/jsons/purchases.json')
                    : require('../../assets/jsons/no_purchases_animation.json')
                }
                autoPlay
                loop
                enableMergePathsAndroidForKitKatAndAbove
              />
            </View>
            {hasPurchases ? (
              <PurchaseList purchases={purchases} />
            ) : (
              <Text style={styles.noPurchasesText}>
                Looks like you have not made any purchases yet.
              </Text>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalOuterContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.35
      : SCREEN_WIDTH * 0.2,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.35
      : SCREEN_WIDTH * 0.2,
  },
  modalNoPurchasesContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.5
      : SCREEN_WIDTH * 0.2,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.5
      : SCREEN_WIDTH * 0.2,
  },
  closeButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.05,
    width: -SCREEN_WIDTH * 0.1,
    // backgroundColor: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.07,
    paddingBottom: SCREEN_WIDTH * 0.07,
    // backgroundColor: 'cyan',
  },
  modalEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.07,
    paddingBottom: SCREEN_WIDTH * 0.07,
    // backgroundColor: 'cyan',
  },
  modalTitle: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font26
      : fontsCommon.font30,
    marginBottom: SCREEN_HEIGHT * 0.01,
    color: styleCommon.textColor1,
    // backgroundColor: 'pink',
  },
  modalPurchasesTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    fontWeight: 'bold',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font26
      : fontsCommon.font30,
    marginBottom: SCREEN_HEIGHT * 0.01,
    color: styleCommon.textColor1,
    //backgroundColor: 'pink',
  },
  purchaseHistoryAnimationStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.01,
    width: '100%',
    height: DEVICE_NAME.includes('iPhone 11') ? '20%' : '100%',
    // backgroundColor: 'teal',
  },
  noPurchaseAnimationStyle: {
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginBottom: SCREEN_HEIGHT * 0.02,
    width: '100%',
    height: '60%',
    //backgroundColor: 'teal',
  },
  noPurchasesText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font16
      : fontsCommon.font20,
    color: styleCommon.textColor1,
    //backgroundColor: 'orange',
  },
});

export default MyPurchases;
