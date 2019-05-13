import React from "react";
import Purchases from "react-native-purchases";
import { StackActions, NavigationActions } from "react-navigation";

export default class InitialScreen extends React.Component {
  async componentDidMount() {
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo();
      if (
        purchaserInfo.activeEntitlements !== "undefined" &&
        purchaserInfo.activeEntitlements.includes("basic")
      ) {
        this.props.navigation.navigate("PurchaseOrderScreen");
      } else {
        this.props.navigation.navigate("AvailablePurchasesScreen");
      }
    } catch (e) {
      console.log("Error " + JSON.stringify(e));
    }
  }
  render() {
    return null;
  }
}
