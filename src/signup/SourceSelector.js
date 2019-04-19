import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ICON_SIZE_LARGE,
  ICON_SIZE_SMALL
} from "../../assets/style/stylesCommonValues";
import { styles } from "../../assets/style/stylesSourceSelector";

export default class SourceSelector extends Component {
  render() {
    const {
      selectedSources,
      removeSource,
      selectText,
      addSource,
      sourceType
    } = this.props;
    return (
      <View style={styles.sourceContainer}>
        <View style={styles.sourceSelectorContainer}>
          <Text style={styles.sourceSelectorLabel}>{selectText}</Text>
          <TouchableOpacity onPress={() => addSource(sourceType)}>
            <Icon
              name="plus-circle-outline"
              size={ICON_SIZE_LARGE}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.selectedSourcesContainer}>
          {selectedSources.map((source, index) => (
            <View style={styles.selectedSourceContainer} key={source.name}>
              <Text style={styles.selectedSourceLabel}>{source.name}</Text>
              <TouchableOpacity
                style={styles.selectedSourceCancel}
                onPress={() => removeSource(index, sourceType)}
              >
                <Icon name="close" color="white" size={ICON_SIZE_SMALL} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
