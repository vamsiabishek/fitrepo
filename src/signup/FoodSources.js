import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import SourceSelector from "./SourceSelector";
import SourceSelectorModal from "./SourceSelectorModal";

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60
  },
  searchBar: {
    flexDirection: "row",
    paddingVertical: 5,
    backgroundColor: "#f8f8f8",
    flexDirection: "row"
  },
  searchTextInput: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 8
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class FoodSources extends Component {
  render() {
    const {
      selectedProteinSources,
      selectedCarbSources,
      selectedFatSources,
      showModal,
      modalContains,
      selectedSources,
      filteredSources,
      removeSource,
      addSource,
      onSourceToggle,
      onCancel,
      onConfirm,
      filterSources
    } = this.props;
    return (
      <View style={styles.mainContent}>
        <SourceSelector
          selectedSources={selectedProteinSources}
          removeSource={removeSource}
          selectText="Protein"
          sourceType="protein"
          addSource={addSource}
        />
        <SourceSelector
          selectedSources={selectedCarbSources}
          removeSource={removeSource}
          selectText="Carbs"
          sourceType="carbs"
          addSource={addSource}
        />
        <SourceSelector
          selectedSources={selectedFatSources}
          removeSource={removeSource}
          selectText="Fat"
          sourceType="fat"
          addSource={addSource}
        />
        <SourceSelectorModal
          showModal={showModal}
          modalContains={modalContains}
          selectedSources={selectedSources}
          onSourceToggle={onSourceToggle}
          sources={filteredSources}
          onCancel={onCancel}
          onConfirm={onConfirm}
          onSearch={filterSources}
        />
      </View>
    );
  }
}
