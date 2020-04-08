import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {convertProductIdentifierToPrograms} from '../../common/Common';
import {styles} from '../../../assets/style/stylesPurchaseList';

class PurchaseList extends React.Component {
  _keyExtractor = (item) => item.purchaseDate.toString();
  renderPurchaseItem = (purchase, index) => {
    const purchaseDateTime = new Date(purchase.purchaseDate);
    if (index === 0) {
      return (
        <View key={purchase.purchaseDate}>
          <View style={styles.rowContainerHeader}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowContainerTextHeader}>Plan</Text>
              <Text style={styles.rowContainerTextHeader}>Purchase Date</Text>
            </View>
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
    console.log(purchases);
    let purchaseList = [];
    if (purchases) {
      purchaseList = Object.keys(purchases).map((key) => {
        return purchases[key];
      });
    }
    console.log(purchaseList);

    return (
      <View style={styles.container}>
        {purchaseList.length > 0 ? (
          <FlatList
            data={purchaseList}
            renderItem={({item, index}) => this.renderPurchaseItem(item, index)}
            keyExtractor={this._keyExtractor}
          />
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
