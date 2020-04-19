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
        isVisible={showPurchases}
        backdropColor="black"
        backdropOpacity={0.5}>
        <View
          style={
            purchases !== undefined
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
            onPress={() => {
              this.setState({showPurchases: false});
            }}
            containerStyle={styles.closeButtonContainerStyle}
          />
          <View
            style={
              purchases !== undefined
                ? styles.modalContainer
                : styles.modalEmptyContainer
            }>
            <Text style={styles.modalPurchasesTitle}>
              {purchases !== undefined ? 'Purchases History' : 'No Purchases'}
            </Text>
            <View
              style={
                purchases !== undefined
                  ? styles.purchaseHistoryAnimationStyle
                  : styles.noPurchaseAnimationStyle
              }>
              <LottieView
                source={
                  purchases !== undefined
                    ? require('../../assets/jsons/purchases.json')
                    : require('../../assets/jsons/no_purchases_animation.json')
                }
                autoPlay
                loop
                enableMergePathsAndroidForKitKatAndAbove
              />
            </View>
            {purchases !== undefined ? (
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
      ? SCREEN_WIDTH * 0.2
      : SCREEN_WIDTH * 0.01,
    marginBottom: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_WIDTH * 0.2
      : SCREEN_WIDTH * 0.05,
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
