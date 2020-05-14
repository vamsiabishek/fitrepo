import React, {Component} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import SourceSelector from './SourceSelector';
import SourceSelectorModal from './SourceSelectorModal';
import {styles} from '../../assets/style/stylesFoodSources';
import {
  FOOD_SOURCES_PERSON_ICON,
  FOOD_SOURCES_MARKET_ICON,
} from '../common/Common';
import {
  FOOD_PREF_VEG,
  FOOD_PREF_VEGAN,
  FOOD_PREF_EGGETARIAN,
} from '../common/SourceUtil';
import {SCREEN_WIDTH} from '../../assets/style/stylesCommonValues';

export default class FoodSources extends Component {
  constructor() {
    super();
  }
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
      filterSources,
      foodPreference,
    } = this.props;
    let carbSelectable = true;
    let fatSelectable = true;
    if (
      foodPreference === FOOD_PREF_EGGETARIAN ||
      foodPreference === FOOD_PREF_VEG ||
      foodPreference === FOOD_PREF_VEGAN
    ) {
      carbSelectable = false;
      fatSelectable = false;
    }
    return (
      <View style={styles.mainContent}>
        <View style={styles.imageContainer}>
          <LottieView
            source={require('../../assets/jsons/choose_sources_animation.json')}
            resizeMode={'contain'}
            autoPlay
            enableMergePathsAndroidForKitKatAndAbove
          />
        </View>
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
            selectable={carbSelectable}
            foodPreference={foodPreference}
          />
          <SourceSelector
            selectedSources={selectedFatSources}
            removeSource={removeSource}
            selectText="Fat"
            sourceType="fat"
            addSource={addSource}
            selectable={fatSelectable}
            foodPreference={foodPreference}
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
