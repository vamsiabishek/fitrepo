import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import SourceSelector from './SourceSelector';
import SourceSelectorModal from './SourceSelectorModal';
import {styles} from '../../assets/style/stylesFoodSources';
import {
  FOOD_PREF_VEG,
  FOOD_PREF_VEGAN,
  FOOD_PREF_EGGETARIAN,
  FOOD_PREF_NON_VEG,
  getSourcesWithImages,
} from '../common/SourceUtil';
import analytics from '@react-native-firebase/analytics';

export default function FoodSources(props) {
  const {foodPreference} = props;
  const [selectedProteinSources, setSelectedProteinSources] = useState([]);
  const [selectedCarbSources, setSelectedCarbSources] = useState([]);
  const [selectedFatSources, setSelectedFatSources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContains, setModalContains] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);
  const [filteredSources, setFilteredSources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sources, setSources] = useState([]);

  // source selection methods
  const removeProteinSource = (index) => {
    const srcs = unSelectSource(selectedProteinSources[index], 'protein');
    selectedProteinSources.splice(index, 1);
    setSelectedProteinSources([...selectedProteinSources]);
    setSources(srcs);
  };

  const removeCarbSource = (index) => {
    const srcs = unSelectSource(selectedCarbSources[index], 'carbs');
    selectedCarbSources.splice(index, 1);
    setSelectedCarbSources([...selectedCarbSources]);
    setSources(srcs);
  };

  const removeFatSource = (index) => {
    const srcs = unSelectSource(selectedFatSources[index], 'fat');
    selectedFatSources.splice(index, 1);
    setSelectedFatSources([...selectedFatSources]);
    setSources(srcs);
  };

  const addSource = (sourceType) => {
    if (sourceType === 'protein') {
      addProtein();
    } else if (sourceType === 'carbs') {
      addCarbs();
    } else if (sourceType === 'fat') {
      addFat();
    }
  };

  const removeSource = (index, sourceType) => {
    if (index > -1) {
      if (sourceType === 'protein') {
        removeProteinSource(index);
      } else if (sourceType === 'carbs') {
        removeCarbSource(index);
      } else if (sourceType === 'fat') {
        removeFatSource(index);
      }
    }
  };

  const canSelectCarbsAndFats = (selectedProteinSources, foodPreference) => {
    if (foodPreference === FOOD_PREF_NON_VEG) {
      if (selectedProteinSources && selectedProteinSources.length >= 2) {
        let numberOfVegSources = 0;
        selectedProteinSources.map((source) => {
          if (source.isVeg) {
            numberOfVegSources = numberOfVegSources + 1;
          }
        });
        if (numberOfVegSources > 2) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  };

  const unSelectSource = (selectedSource, sourceType) => {
    let selectedSrcs = [];
    if (sourceType === 'protein') {
      selectedSrcs = proteinSources;
    } else if (sourceType === 'carbs') {
      selectedSrcs = carbSources;
    } else {
      selectedSrcs = fatSources;
    }
    const selectedIndexFromSources = selectedSrcs.findIndex(
      (source) => source.name === selectedSource.name,
    );
    selectedSrcs[selectedIndexFromSources].selected = false;
    return selectedSrcs;
  };

  const addProtein = () => {
    console.log('addprotein');
    setModalContains('protein');
    setShowModal(true);
    setSearchTerm('');
    setSelectedSources(selectedProteinSources);
    setSources(proteinSources);
    setFilteredSources(proteinSources);
  };
  const addCarbs = () => {
    if (canSelectCarbsAndFats(selectedProteinSources, foodPreference)) {
      setModalContains('carbs');
      setShowModal(true);
      setSearchTerm('');
      setSelectedSources(selectedCarbSources);
      setSources(carbSources);
      setFilteredSources(carbSources);
    } else {
      Alert.alert(
        'Threshold Reached',
        'The protein sources so far selected have the required carbohydrates, you do not need to select anymore carbohydrate sources.',
      );
    }
  };
  const addFat = () => {
    if (canSelectCarbsAndFats(selectedProteinSources, foodPreference)) {
      setModalContains('fat');
      setShowModal(true);
      setSearchTerm('');
      setSelectedSources(selectedFatSources);
      setSources(fatSources);
      setFilteredSources(fatSources);
    } else {
      Alert.alert(
        'Threshold Reached',
        'The protein sources so far selected have the required fats, you do not need to select anymore fat sources.',
      );
    }
  };

  const onSourceToggle = (index, selected) => {
    let maxSourcesAllowed = 4;
    if (modalContains === 'fat') {
      maxSourcesAllowed = 2;
    }

    if (selectedSources.length < maxSourcesAllowed || sources[index].selected) {
      const selectedSource = sources[index];
      sources[index].selected = !selected;
      if (!selected) {
        selectedSources.push(sources[index]);
      } else {
        const selectedIndex = selectedSources.findIndex(
          (source) => source.name === selectedSource.name,
        );
        if (selectedIndex > -1) {
          selectedSources.splice(selectedIndex, 1);
        }
      }

      setSources(sources);
      setSelectedSources(selectedSources);

      if (modalContains === 'protein') {
        console.log('setting protein sources', selectedSources);
        setSelectedProteinSources([...selectedSources]);
      } else if (modalContains === 'carbs') {
        setSelectedCarbSources([...selectedSources]);
      } else if (modalContains === 'fat') {
        setSelectedFatSources([...selectedSources]);
      }
    } else {
      Alert.alert(
        'Limit Reached !',
        'You can only select ' +
          maxSourcesAllowed +
          ' ' +
          modalContains +
          ' sources.',
      );
    }
  };

  const filterSources = (searchTerm) => {
    let filteredSrcs = [];
    sources &&
      sources.forEach((source) => {
        const parts = searchTerm
          .replace(/[\^$\\.*+?()[\]{}|]/g, '\\$&')
          .trim()
          .split(' ');
        const regex = new RegExp(`(${parts.join('|')})`, 'i');

        if (regex.test(source.name)) {
          filteredSrcs.push(source);
        }
      });

    setSearchTerm(searchTerm);
    setFilteredSources(filteredSrcs);
  };

  const onConfirm = () => {
    if (modalContains === 'protein' && selectedSources.length < 2) {
      Alert.alert('Incomplete', 'Select atleast two sources');
    } else {
      setShowModal(false);
      analytics().logEvent('Selected_sources', {
        sources: selectedSources.map((source) => source.key),
        sourceType: modalContains,
      });
    }
  };

  const onCancel = () => setShowModal(false);

  useEffect(() => {
    props.setSelectedSources({
      selectedProteinSources,
      selectedCarbSources,
      selectedFatSources,
      modalContains,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProteinSources, selectedCarbSources, selectedFatSources]);

  const {selectedSources: selectedSrcs} = props;
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
  const proteinSources = getSourcesWithImages('protein', foodPreference);
  const carbSources = getSourcesWithImages('carb');
  const fatSources = getSourcesWithImages('fat');
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
