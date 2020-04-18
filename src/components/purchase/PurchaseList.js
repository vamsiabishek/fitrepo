import React from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {convertProductIdentifierToPrograms} from '../../common/PurchaseUtils';
import {styles} from '../../../assets/style/stylesPurchaseList';
import {
  styleCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../../assets/style/stylesCommonValues';

class PurchaseList extends React.Component {
  _keyExtractor = (item) => item.purchaseDate.toString();
  renderPurchaseItem = (purchase, index) => {
    const purchaseDateTime = new Date(purchase.purchaseDate);
    if (index === 0) {
      return (
        <View key={purchase.purchaseDate}>
          <View style={styles.rowContainerHeader}>
            
              <Text style={styles.rowContainerTextHeader}>Plan</Text>
              <Text style={styles.rowContainerTextHeader}>Purchase Date</Text>
            
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.rowContainerText}>
              {convertProductIdentifierToPrograms(purchase.productIdentifier)}
            </Text>
            <Text style={styles.rowContainerText}>
              {purchaseDateTime.toDateString()}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.rowContainer} key={purchase.purchaseDate}>
          <Text style={styles.rowContainerText}>
            {convertProductIdentifierToPrograms(purchase.productIdentifier)}
          </Text>
          <Text style={styles.rowContainerText}>
            {purchaseDateTime.toDateString()}
          </Text>
        </View>
      );
    }
  };
  render() {
    const {purchases} = this.props;
    //console.log(purchases);
    const purchaseList = [];

    Object.keys(purchases).map((dietId) => {
      const purchaseDetails = purchases[dietId];
      Object.keys(purchaseDetails).map((purchaseId) => {
        purchaseList.push({
          dietId,
          purchaseId,
          ...purchaseDetails[purchaseId],
        });
      });
    });
    console.log(purchaseList);
    return (
      <View style={styles.container}>
        {purchaseList.length > 0 ? (
          <ScrollView style={styles.table}>
            <FlatList
              data={purchaseList}
              renderItem={({item, index}) =>
                this.renderPurchaseItem(item, index)
              }
              keyExtractor={this._keyExtractor}
            />
          </ScrollView>
        ) : (
          <View>
            <Text>No Purchases !</Text>
          </View>
        )}
      </View>
    );
  }
}
export default PurchaseList;
