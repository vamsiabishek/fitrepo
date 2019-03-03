import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "react-native-elements";
import SourceQuantity from "./SourceQuantity";
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
          <SourceQuantity source={protein} sourceLabel={proteinLabel} />
          <SourceQuantity source={carbs} sourceLabel={carbsLabel} />
          <SourceQuantity source={fat} sourceLabel={fatLabel} />
          <View style={{ alignItems: "center" }}>
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
    color: "white"
  }
});
