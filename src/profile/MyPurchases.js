import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
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

class MyPurchases extends Component {
  render() {
    const {showPurchases, onCancel, purchases} = this.props;
    return (
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        isVisible={showPurchases}
        backdropColor="black"
        backdropOpacity={0.5}>
        <View style={styles.purchasesModalContainer}>
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
            containerStyle={styles.purchaseCloseButtonContainerStyle}
          />
          <Text style={styles.modalTitle}>Your Purchases</Text>
          <LottieView
            source={require('../../assets/jsons/purchases.json')}
            autoPlay
            loop
            style={styles.animationStyle}
            enableMergePathsAndroidForKitKatAndAbove
          />
          {purchases !== undefined ? (
            <PurchaseList purchases={purchases} />
          ) : (
            <Text style={styles.noPurchasesText}>
              *No Purchases made so far*
            </Text>
          )}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  purchasesModalContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleCommon.secondaryColorNew,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: SCREEN_WIDTH * 0.1,
    //width: SCREEN_WIDTH * 0.95,
    // marginTop: DEVICE_NAME.includes('iPhone 11')
    //   ? SCREEN_HEIGHT * 0.1
    //   : SCREEN_HEIGHT * 0.02,
    marginTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.05
      : SCREEN_HEIGHT * 0.02,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.1
      : SCREEN_HEIGHT * 0.05,
    // marginLeft: SCREEN_WIDTH * 0.1,
  },
  purchaseCloseButtonContainerStyle: {
    position: 'relative',
    top: -(SCREEN_WIDTH * 0.06),
    left: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.4
      : Platform.OS === 'ios'
      ? SCREEN_WIDTH * 0.38
      : SCREEN_WIDTH * 0.4,
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
  noPurchasesText: {
    fontWeight: '600',
    fontSize: DEVICE_NAME.includes('iPhone 11')
      ? fontsCommon.font16
      : fontsCommon.font20,
    color: styleCommon.textColor1,
    marginTop: SCREEN_HEIGHT * 0.1,
  },
});

export default MyPurchases;
