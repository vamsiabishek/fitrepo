import React, {Component} from 'react';
import {KeyboardAvoidingView, Text, UIManager, View} from 'react-native';
import NumberSlider from 'react-native-number-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ICON_SIZE_EXTRA_LARGE,
  SCREEN_WIDTH,
  styleCommon,
} from '../../assets/style/stylesCommonValues';
import {styles} from '../../assets/style/stylesPreferenceDetails';
import AnglePositionView from '../components/AnglePositionView';
import Emoji from 'react-native-emoji';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PreferenceDetails extends Component {
  constructor(props) {
    super(props);
    const numberOfCircles = 4;
    this.boxPositions = new Array(numberOfCircles).fill(0).map((e, i) => {
      if (i === 0) {
        return {x: 0, y: -80};
      }
      if (i === 1) {
        return {x: 80, y: 0};
      }
      if (i === 2) {
        return {x: 0, y: 80};
      }
      if (i === 3) {
        return {x: -80, y: 0};
      }
    });
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
  updatePositions = (selectedIndex) => {
    const topItemActualPosition = {};
    const newBox = this.boxPositions.map(({x, y}, i) => {
      let newX = x;
      let newY = y;
      let a = this.boxPositions.length;
      while (a > selectedIndex) {
        if (x === 0) {
          if (y > 0) {
            newX = -80;
          } else {
            newX = 80;
          }
        } else if (x === 80 || x === -80) {
          newX = 0;
        }

        if (y === -80 || y === 80) {
          newY = 0;
        } else if (y === 0) {
          if (x === 80) {
            newY = 80;
          } else {
            newY = -80;
          }
        }
        x = newX;
        y = newY;
        a--;
      }
      // setting the selected item position to top and storing its actual position in topItemActualPosition
      if (i === selectedIndex) {
        topItemActualPosition.x = newX;
        topItemActualPosition.y = newY;
        return {x: 0, y: -80};
      }
      // setting the actual top item position with one placed on the top
      if (newX === 0 && newY === -80) {
        newX = topItemActualPosition.x;
        newY = topItemActualPosition.y;
      }
      return {
        x: newX,
        y: newY,
      };
    });
    // if the selected item is after the actual item which is supposed to be on top(x = 0, y = -80)then its value will become undefined as the topItemActualPosition is not yet set
    const emptyBoxPosition = newBox.findIndex(
      (item) => typeof item.x === 'undefined',
    );
    if (emptyBoxPosition !== -1) {
      newBox[emptyBoxPosition] = topItemActualPosition;
    }
    return newBox;
  };

  render() {
    const {
      foodPreference,
      numberOfMeals,
      healthCond,
      numberOfMealsOptions,
    } = this.props;
    this.boxPositions = this.updatePositions(foodPreference);
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
                <Text style={styles.headerTextStyle}>
                  Select your Food Preference:
                </Text>
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
                positionX={this.boxPositions[3].x}
                positionY={this.boxPositions[3].y}
                label="Non Vegetarian"
                value={3}
                isSelected={foodPreference === 3}
                onSelect={this.updateVegIndex}
              />
              <AnglePositionView
                containerSize={containerSize}
                viewSize={angleViewSize}
                positionX={this.boxPositions[1].x}
                positionY={this.boxPositions[1].y}
                label="Vegetarian"
                value={1}
                isSelected={foodPreference === 1}
                onSelect={this.updateVegIndex}
              />
              <AnglePositionView
                containerSize={containerSize}
                viewSize={angleViewSize}
                positionX={this.boxPositions[2].x}
                positionY={this.boxPositions[2].y}
                label="Eggetarian"
                value={2}
                isSelected={foodPreference === 2}
                onSelect={this.updateVegIndex}
              />
              <AnglePositionView
                containerSize={containerSize}
                viewSize={angleViewSize}
                positionX={this.boxPositions[0].x}
                positionY={this.boxPositions[0].y}
                label="Vegan"
                value={0}
                isSelected={foodPreference === 0}
                onSelect={this.updateVegIndex}
              />
            </View>
            <View style={styles.contentBoxStyle}>
              <View style={styles.contentBoxHeaderStyle}>
                <Text style={styles.headerTextStyle}>
                  Select meals you eat in a day:
                </Text>
              </View>
              <View style={styles.contentBoxMainStyle}>
                {/* <HorizontalSelectView
                  items={numberOfMealsOptions}
                  selectedItem={numberOfMeals}
                  onSelectionChange={this.onMealsChange}
                  showSelectedLabel={true}
                  label="meals/day"
                /> */}
                <NumberSlider
                  displayValues={numberOfMealsOptions}
                  value={numberOfMeals}
                  onValueChange={this.onMealsChange}
                  width={SCREEN_WIDTH * 0.8}
                  fontSize={18}
                  containerBackground={styleCommon.secondaryColorNew}
                />
                <Text style={styles.mealsPerday}>
                  {numberOfMeals} meals/day*
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
