import React, { Component } from "react";
import { View } from "react-native";
import SourceSelector from "./SourceSelector";
import SourceSelectorModal from "./SourceSelectorModal";
import { styles } from "../../assets/style/stylesFoodSources";

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
        <View style={styles.subContainer}>
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
      </View>
    );
  }
}
