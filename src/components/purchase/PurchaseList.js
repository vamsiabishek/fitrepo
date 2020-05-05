import React from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {convertProductIdentifierToPrograms} from '../../common/PurchaseUtils';
import {styles} from '../../../assets/style/stylesPurchaseList';

class PurchaseList extends React.Component {
  _keyExtractor = (item) => item.id;
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
    return (
      <View style={styles.container}>
        {purchases.length > 0 ? (
          <ScrollView style={styles.table}>
            <FlatList
              data={purchases}
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
