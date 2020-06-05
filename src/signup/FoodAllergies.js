import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {commonStyles} from '../../assets/style/stylesCommon';
import Header from '../components/signup/Header';
import NavNextButton from '../components/signup/NavNextButton';
import {styles} from '../../assets/style/stylesSignup';
import SourceSelector from './SourceSelector';
import {getSourcesWithImages} from '../common/SourceUtil';
import SourceSelectorModal from './SourceSelectorModal';
import analytics from '@react-native-firebase/analytics';

export default function FoodAllergies(props) {
  const {
    foodPreference,
    setFoodAllergySources,
    onBack,
    onCancel,
    onNext,
    screen,
    allergies,
  } = props;
  const proteinSources = getSourcesWithImages({
    type: 'protein',
    foodPreference,
  });
  const carbSources = getSourcesWithImages({type: 'carb'});
  const fatSources = getSourcesWithImages({type: 'fat'});
  let allSources = [...proteinSources, ...carbSources, ...fatSources];
  // setting the initial selected values for selection modal if selected previously
  if (allergies?.length) {
    allSources = allSources.map((source) => {
      if (allergies.some(({key}) => key === source.key)) {
        source.selected = true;
      }
      return source;
    });
  }

  const [allergySources, setAllergySources] = useState([...allergies]);
  const [sources, setSources] = useState(allSources);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filteredSources, setFilteredSources] = useState([]);
  const [allergiesButtonLabel, setAllergiesButtonLabel] = useState('SKIP');

  useEffect(() => {
    if (allergySources?.length) {
      setAllergiesButtonLabel('NEXT');
    } else {
      setAllergiesButtonLabel('SKIP');
    }
  }, [allergySources]);

  const addSource = () => {
    setShowModal(true);
    setSearchTerm('');
    setFilteredSources([...sources]);
  };
  const removeSource = (index) => {
    const srcs = unSelectSource(allergySources[index]);
    allergySources.splice(index, 1);
    setAllergySources([...allergySources]);
    setSources(srcs);
  };

  const unSelectSource = (selectedSource, sourceType) => {
    const selectedSrcs = sources;
    const selectedIndexFromSources = selectedSrcs.findIndex(
      (source) => source.name === selectedSource.name,
    );
    selectedSrcs[selectedIndexFromSources].selected = false;
    return selectedSrcs;
  };

  const onSourceToggle = (index, selected) => {
    let maxSourcesAllowed = 5;
    if (allergySources.length < maxSourcesAllowed || sources[index].selected) {
      const selectedSource = sources[index];
      sources[index].selected = !selected;
      if (!selected) {
        allergySources.push(sources[index]);
      } else {
        const selectedIndex = allergySources.findIndex(
          (source) => source.name === selectedSource.name,
        );
        if (selectedIndex > -1) {
          allergySources.splice(selectedIndex, 1);
        }
      }

      setSources(sources);
      setFilteredSources(sources);
      setAllergySources([...allergySources]);
      setFoodAllergySources([...allergySources]);
    } else {
      Alert.alert(
        'Limit Reached !',
        'You can only select ' + maxSourcesAllowed + ' allergy items',
      );
    }
  };

  const filterSources = (searchText) => {
    let filteredSrcs = [];
    sources &&
      sources.forEach((source) => {
        const parts = searchText
          .replace(/[\^$\\.*+?()[\]{}|]/g, '\\$&')
          .trim()
          .split(' ');
        const regex = new RegExp(`(${parts.join('|')})`, 'i');

        if (regex.test(source.name)) {
          filteredSrcs.push(source);
        }
      });

    setSearchTerm(searchText);
    setFilteredSources(filteredSrcs);
  };

  const onConfirm = () => {
    setShowModal(false);
    if (allergySources.length > 0) {
      analytics().logEvent('Selected_allergies', {
        sources: allergySources.map((source) => source.key),
      });
    }
  };

  const onCancelModal = () => setShowModal(false);

  return (
    <View style={commonStyles.subContainer}>
      <View style={styles.contentWrapper}>
        <Header
          title="Do you have any food allergies ?"
          screen={screen}
          onBack={onBack}
          onCancel={onCancel}
        />
        <SourceSelector
          selectedSources={allergySources}
          removeSource={removeSource}
          selectText="Allergic to foods"
          addSource={addSource}
        />
        <NavNextButton
          isActive={true}
          screen={screen}
          onNext={onNext}
          buttonText={allergiesButtonLabel}
        />
      </View>
      <SourceSelectorModal
        showModal={showModal}
        selectedSources={allergySources}
        onSourceToggle={onSourceToggle}
        sources={filteredSources}
        onCancel={onCancelModal}
        onConfirm={onConfirm}
        onSearch={filterSources}
      />
    </View>
  );
}
