import React, {Component} from 'react';
import {KeyboardAvoidingView, Text, UIManager, View} from 'react-native';
import HorizontalSelectView from '../components/HorizontalSelectView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICON_SIZE_EXTRA_LARGE} from '../../assets/style/stylesCommonValues';
import {styles} from '../../assets/style/stylesPreferenceDetails';
import AnglePositionView from '../components/AnglePositionView';
import Emoji from 'react-native-emoji';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PreferenceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHealthCondStrPickerVisible: false,
      selectedIndex: 1,
    };
  }
  showHealthCondStrPicker = () => {
    this.setState({isHealthCondStrPickerVisible: true});
  };
  hideHealthCondStrPicker = () => {
    this.setState({isHealthCondStrPickerVisible: false});
  };
  handleHealthCondStrPicker = (healthCond) => {
    const {setHealthCond} = this.props;
    setHealthCond(healthCond);
    this.hideHealthCondStrPicker();
  };
  updateVegIndex = (foodPreference) => {
    const {setFoodPref} = this.props;
    setFoodPref(foodPreference);
  };
  onMealsChange = (numberOfMeals) => {
    const {setNoOfMeals} = this.props;
    setNoOfMeals(numberOfMeals);
  };

  render() {
    const {
      foodPreference,
      numberOfMeals,
      healthCond,
      numberOfMealsOptions,
    } = this.props;
    const {isHealthCondStrPickerVisible} = this.state;
    let foodPrefIcon = 'meat_on_bone';
    if (foodPreference === 0) {
      foodPrefIcon = 'avocado';
    } else if (foodPreference === 1) {
      foodPrefIcon = 'green_salad';
    } else if (foodPreference === 2) {
      foodPrefIcon = 'fried_egg';
    }

    const containerSize = 160;
    const angleViewSize = 100;

    return (
      <View style={styles.mainContent}>
        <KeyboardAvoidingView
          style={styles.innerView}
          behaviour="position"
          contentContainerStyle={styles.innerViewContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.contentBoxStyle}>
              <View style={styles.contentBoxHeaderStyle}>
                <Text style={styles.headerTextStyle}>Your Food Preference</Text>
                <Icon
                  style={styles.headerIconStyle}
                  size={ICON_SIZE_EXTRA_LARGE}>
                  <Emoji name={foodPrefIcon} />
                </Icon>
              </View>
              {/*
                <View style={styles.contentBoxMainStyle}>
                  <ButtonGroup
                    onPress={this.updateVegIndex}
                    selectedIndex={foodPreference}
                    buttons={["Vegetarian", "Eggetarian", "Non-Vegetarian"]}
                    containerStyle={styles.vegButtonGroup}
                    innerBorderStyle={{ width: 0 }}
                    selectedButtonStyle={styles.veg}
                    textStyle={styles.buttonGroupTextStyle}
                    selectedTextStyle={styles.buttonGroupSelectedTextStyle}
                  />
                </View>
              */}
            </View>
            <View
              style={{
                width: containerSize,
                height: containerSize,
                borderRadius: containerSize / 2,
                //borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 40,
              }}>
              <AnglePositionView
                containerSize={containerSize}
                viewSize={angleViewSize}
                angle={270}
                label="Non Vegetarian"
                value={3}
                isSelected={foodPreference === 3}
                onSelect={this.updateVegIndex}
              />
              <AnglePositionView
                containerSize={containerSize}
                viewSize={angleViewSize}
                angle={0}
                label="Vegetarian"
                value={1}
                isSelected={foodPreference === 1}
                onSelect={this.updateVegIndex}
              />
              <AnglePositionView
                containerSize={containerSize}
                viewSize={angleViewSize}
                angle={90}
                label="Eggetarian"
                value={2}
                isSelected={foodPreference === 2}
                onSelect={this.updateVegIndex}
              />
              <AnglePositionView
                containerSize={containerSize}
                viewSize={angleViewSize}
                angle={180}
                label="Vegan"
                value={0}
                isSelected={foodPreference === 0}
                onSelect={this.updateVegIndex}
              />
            </View>
            <View style={styles.contentBoxStyle}>
              <View style={styles.contentBoxHeaderStyle}>
                <Text style={styles.headerTextStyle}>
                  Number of Meals You Eat in a Day
                </Text>
              </View>
              <View style={styles.contentBoxMainStyle}>
                <HorizontalSelectView
                  items={numberOfMealsOptions}
                  selectedItem={numberOfMeals}
                  onSelectionChange={this.onMealsChange}
                  showSelectedLabel={true}
                  label="meals/day"
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
