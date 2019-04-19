import React, { Component } from "react";
import { Text, View } from "react-native";
import SourceQuantity from "./SourceQuantity";
import AnimateNumber from "../components/AnimateNumber";
import { styles } from "../../assets/style/stylesTotalDietMacros";

export default class TotalDietMacros extends Component {
  render() {
    const carbsLabel = "Carbs";
    const proteinLabel = "Protein";
    const fatLabel = "Fat";
    const totalCalLabel = "Calories";
    const { protein, fat, carbs, totalCal } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.macrosBarStyle}>
          <SourceQuantity source={protein} sourceLabel={proteinLabel} />
          <SourceQuantity source={carbs} sourceLabel={carbsLabel} />
          <SourceQuantity source={fat} sourceLabel={fatLabel} />
          <View style={{ alignItems: "center" }}>
            <View style={styles.totalCaloriesBadge}>
              <AnimateNumber
                countBy={25}
                style={styles.totalCaloriesValue}
                value={totalCal}
                timing="linear"
              />
            </View>
            <Text style={styles.badgeLabel}>{totalCalLabel}</Text>
          </View>
        </View>
      </View>
    );
  }
}
