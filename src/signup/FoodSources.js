import React, {Component} from 'react';
import {View, Image, Animated, Easing} from 'react-native';
import SourceSelector from './SourceSelector';
import SourceSelectorModal from './SourceSelectorModal';
import {styles} from '../../assets/style/stylesFoodSources';
import {
  FOOD_SOURCES_PERSON_ICON,
  FOOD_SOURCES_MARKET_ICON,
} from '../common/Common';

export default class FoodSources extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.animate();
  }
  animate() {
    //console.log("animation started")
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => this.animate());
  }
  componentWillUnmount() {
    this.animatedValue.stopAnimation();
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
    } = this.props;
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-200, -50],
    });
    return (
      <View style={styles.mainContent}>
        <View style={styles.imageContainer}>
          <Animated.View style={{marginLeft}}>
            <Image
              source={FOOD_SOURCES_PERSON_ICON}
              style={styles.iconImageStylePerson}
            />
          </Animated.View>
          <Image
            source={FOOD_SOURCES_MARKET_ICON}
            style={styles.iconImageStyle}
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
