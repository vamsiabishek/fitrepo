import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from "react-native";
import AnimateNumber from "../components/AnimateNumber";
import { styleCommon } from "../../assets/style/stylesCommonValues";

export default class SourceQuantity extends Component {
  render() {
    const { source, sourceLabel, metric } = this.props;
    return (
      <View style={styles.sourceContainer}>
        <View style={{ flexDirection: "row", alignItems:"flex-end" }}>
          <AnimateNumber
            countBy={2}
            style={styles.sourceValue}
            value={source}
            timing="linear"
          />
          <Text style={styles.sourceMetric}> {metric}</Text>
        </View>

        <Text style={styles.sourceLabel}>{sourceLabel}</Text>
      </View>
    );
  }
}

SourceQuantity.propTypes = {
  source: PropTypes.number.isRequired,
  sourceLabel: PropTypes.string.isRequired,
  metric: PropTypes.string
};

SourceQuantity.defaultProps = {
  metric: "gm"
};

const styles = StyleSheet.create({
  sourceContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 1,
    backgroundColor: "rgba(0, 0, 0, .3)"
  },
  sourceLabel: {
    fontSize: 14,
    marginTop: 1,
    //marginRight: 2,
    color: "white"
  },
  sourceValue: {
    //color: styleCommon.secondaryColor
    color: "white",
    fontSize: 15,
    fontWeight: "600"
  },
  sourceMetric: {
    //color: styleCommon.secondaryColor
    color: "white",
    fontSize: 12,
  }
});
