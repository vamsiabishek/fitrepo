import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions
} from "react-native";
import { Input, Button, Badge } from "react-native-elements";
import { calculateTotalCalories } from "./../common/Common";

export default class TotalDietMacros extends Component {
  render() {
    const carbsLabel = "Carbs";
    const proteinLabel = "Protein";
    const fatLabel = "Fat";
    const totalCalLabel = "Calories";
    const { protein, fat, carbs } = this.props;
    const totalCalories = calculateTotalCalories({ protein, fat, carbs });
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#221E1D",
            justifyContent: "space-between",
            paddingTop: 18,
            paddingBottom: 10,
            paddingHorizontal: 15,
            marginTop: 0,
            width: "100%"
          }}
        >
          <View>
            <Badge value={protein} status="error" style={{ padding: 15 }} />
            <Text style={styles.badgeLabel}>{proteinLabel}</Text>
          </View>
          <View>
            <Badge value={carbs} status="success" />
            <Text style={styles.badgeLabel}>{carbsLabel}</Text>
          </View>
          <View>
            <Badge value={fat} status="warning" />
            <Text style={styles.badgeLabel}>{fatLabel}</Text>
          </View>
          <View>
            <Badge value={totalCalories} status="primary" />
            <Text style={styles.badgeLabel}>{totalCalLabel}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  badgeLabel: {
    fontSize: 18,
    marginTop: 4,
    marginRight: 2,
    color: 'white',
  }
});
