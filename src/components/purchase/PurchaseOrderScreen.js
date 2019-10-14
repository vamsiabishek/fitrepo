import React, { Fragment } from "react";
import {
  StyleSheet,
  SafeAreaView,
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
  buttons: {
    flex: 2,
    justifyContent: "flex-start"
  },
  textButton: {
    color: "#f2545b"
  },
  currentStatus: {
    color: "#30b296",
    fontSize: 15
  }
});

export default class PurchaseOrderScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isPro: false,
      error: "",
      currentStatus: "😿",
      purchaseDate: "",
      expirationDate: ""
    };
  }

  async componentWillMount() {
    try {
      const info = await Purchases.getPurchaserInfo();
      this.handleInfo(info);
    } catch (e) {
      // console.log("Error handling");
    }
  }

  handleInfo(info) {
    const isPro =
      info.activeEntitlements !== "undefined" &&
      info.activeEntitlements.includes("basic");
    this.setState({
      isPro,
      currentStatus: isPro ? "😻" : "😿",
      purchaseDate: isPro
        ? `Purchase Date: ${info.purchaseDatesForActiveEntitlements.basic}`
        : "",
      expirationDate: isPro
        ? `Expiration Date: ${info.expirationsForActiveEntitlements.basic}`
        : ""
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.buttons}>
            <View style={{ margin: 50, alignItems: "center" }}>
              <Text style={{ fontSize: 70 }}>
                {this.state.isPro ? "😻" : "😿"}
              </Text>
            </View>
            {!this.state.isPro ? (
              <Fragment>
                <View style={{ margin: 10, alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        const info = await Purchases.restoreTransactions();
                        this.handleInfo(info);
                      } catch (e) {
                        // console.log(JSON.stringify(e));
                      }
                    }}
                  >
                    <Text style={styles.restorePurchases}>
                      Restore purchases
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ margin: 10, alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate(
                        "AvailablePurchasesScreen"
                      );
                    }}
                  >
                    <Text style={styles.restorePurchases}>Go Premium</Text>
                  </TouchableOpacity>
                </View>
              </Fragment>
            ) : (
              <Fragment>
                <View style={{ margin: 10, alignItems: "center" }}>
                  <Text style={styles.textButton}>
                    {this.state.purchaseDate}
                  </Text>
                </View>
                <View style={{ margin: 10, alignItems: "center" }}>
                  <Text style={styles.textButton}>
                    {this.state.expirationDate}
                  </Text>
                </View>
              </Fragment>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
