import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../../assets/style/stylesPurchaseList";

class PurchaseList extends React.Component {
  renderPurchaseItem = purchase => {
    return (
      
        <View style={styles.rowContainer}>
          <Text>{purchase.productIdentifier}</Text>
          <Text>{purchase.purchaseDate}</Text>
        </View>
   
    );
  };
  render() {
    const { purchases } = this.props;
    console.log(purchases)
    return (
      <View style={styles.container}>
        {purchases && purchases.length > 0 ? (
          <FlatList
            data={purchases}
            renderItem={({ item }) => renderPurchaseItem(item)}
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
