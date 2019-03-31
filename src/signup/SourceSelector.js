import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ICON_SIZE_EXTRA_LARGE, ICON_SIZE_SMALL } from "../common/Common";

const styles = StyleSheet.create({
  sourceContainer: {
    borderBottomWidth: 1,
    borderColor: "grey",
    marginHorizontal: 50,
    marginTop:10,

  },
  sourceSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 2,
    marginBottom: 5
  },
  sourceSelectorLabel: {
    fontSize: 22,
    fontWeight: "600",
    color: "#004a94"
  },
  selectedSourcesContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 2,
    marginBottom: 5,
    marginTop: 5,
  },
  selectedSourceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FA8072",
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginTop: 5,
  },
  selectedSourceCancel: {
    paddingHorizontal: 3
  },
  selectedSourceLabel: {
    fontWeight: "500",
    color: "white",
  }
});

export default class SourceSelector extends Component {
  render() {
    const iconColor = "#004a94";
    const {selectedSources, removeSource, selectText } = this.props
    return (
        <View style={styles.sourceContainer}>
          <View style={styles.sourceSelectorContainer}>
            <Text style={styles.sourceSelectorLabel}>{selectText}</Text>
            <TouchableOpacity>
              <Icon
                name="plus-circle-outline"
                color={iconColor}
                size={ICON_SIZE_EXTRA_LARGE}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.selectedSourcesContainer}>
            {selectedSources.map((source, index) => (
              <View style={styles.selectedSourceContainer} key={source.name}>
                <Text style={styles.selectedSourceLabel}>{source.name}</Text>
                <TouchableOpacity style={styles.selectedSourceCancel} onPress={()=> removeSource(index)}>
                  <Icon name="close" color="white" size={ICON_SIZE_SMALL} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
    );
  }
}
