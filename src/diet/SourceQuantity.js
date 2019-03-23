import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Text, View, StyleSheet } from "react-native";

export default class SourceQuantity extends Component {
  render() {
    const { source, sourceLabel, metric } = this.props
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.sourceValue}>{source} {metric}</Text>
        <Text style={styles.sourceLabel}>{sourceLabel}</Text>
      </View>
    );
  }
}

SourceQuantity.propTypes = {
  source: PropTypes.number.isRequired,
  sourceLabel: PropTypes.string.isRequired,
  metric: PropTypes.string,
}

SourceQuantity.defaultProps = {
  metric: 'gm',
}

const styles = StyleSheet.create({
  sourceLabel: {
    fontSize: 18,
    marginTop: 4,
    marginRight: 2,
    color: 'white',
  },
  sourceValue: {
    color: "white"
  }
});
