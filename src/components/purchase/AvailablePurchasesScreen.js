import React from "react";

import {
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import Purchases from "react-native-purchases";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  button: {
    margin: 10
  },
  buttons: {
    flex: 2,
    justifyContent: "flex-start"
  },
  textButton: {
    color: "#f2545b"
  }
});

const makePurchase = navigation => async product => {
  try {
    const purchaseMade = await Purchases.makePurchase(product);
    if (
      purchaseMade.purchaserInfo.activeEntitlements !== "undefined" &&
      purchaseMade.purchaserInfo.activeEntitlements.includes("basic")
    ) {
      navigation.navigate("PurchaseOrderScreen");
    }
  } catch (e) {
    if (!e.userCancelled) {
      console.log("Error handling ", e);
    } else {
      console.log("User cancelled ", e);
    }
  }
};

export default class AvailablePurchasesScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      entitlements: [],
      error: "",
      proAnnualPrice: "Loading",
      currentID: ""
    };
  }

  async componentDidMount() {
    try {
      const entitlements = await Purchases.getEntitlements();
      console.log(JSON.stringify(entitlements));
      this.setState({
        entitlements,
        proAnnualPrice: `Buy Weekly w/ Trial ${
          entitlements.basic.weekly.price_string
        }`
      });
    } catch (e) {
      console.log("Error handling", e);
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                color="#f2545b"
                onPress={() => {
                  makePurchase(this.props.navigation)(
                    this.state.entitlements.basic.weekly.identifier
                  );
                }}
                title={this.state.proAnnualPrice}
              />
            </View>
            <View style={{ margin: 10, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PurchaseOrderScreen")
                }
              >
                <Text style={styles.textButton}>Not now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
