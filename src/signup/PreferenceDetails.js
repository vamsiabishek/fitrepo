import React, { Component } from "react";
import { KeyboardAvoidingView, Text, UIManager, View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import HorizontalSelectView from "../components/HorizontalSelectView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ICON_SIZE,
  ICON_SIZE_LARGE,
  SCREEN_WIDTH
} from "../../assets/style/stylesCommonValues";
import { styles } from "../../assets/style/stylesPreferenceDetails";
import { styleCommon } from "../../assets/style/stylesCommonValues";
import Emoji from "react-native-emoji";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PreferenceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHealthCondStrPickerVisible: false,
      selectedIndex: 1
    };
  }
  showHealthCondStrPicker = () => {
    this.setState({ isHealthCondStrPickerVisible: true });
  };
  hideHealthCondStrPicker = () => {
    this.setState({ isHealthCondStrPickerVisible: false });
  };
  handleHealthCondStrPicker = healthCond => {
    const { setHealthCond } = this.props;
    setHealthCond(healthCond);
    this.hideHealthCondStrPicker();
  };
  updateVegIndex = foodPreference => {
    const { setFoodPref } = this.props;
    setFoodPref(foodPreference);
  };
  onMealsChange = numberOfMeals => {
    const { setNoOfMeals } = this.props;
    setNoOfMeals(numberOfMeals);
  };

  render() {
    const {
      foodPreference,
      numberOfMeals,
      healthCond,
      numberOfMealsOptions
    } = this.props;
    const { isHealthCondStrPickerVisible } = this.state;
    let foodPrefIcon = "meat_on_bone";
    if (foodPreference === 0) foodPrefIcon = "avocado";
    else if (foodPreference === 1) foodPrefIcon = "fried_egg";
    return (
      <View style={styles.mainContent}>
        <KeyboardAvoidingView
          style={styles.innerView}
          behaviour="position"
          contentContainerStyle={styles.innerViewContainer}
        >
          <View style={styles.contentContainer}>
            <View style={styles.contentBoxStyle}>
              <View style={styles.contentBoxHeaderStyle}>
                <Text style={styles.headerTextStyle}>Your Food Preference</Text>
                <Icon style={styles.headerIconStyle} size={ICON_SIZE_LARGE}>
                  <Emoji name={foodPrefIcon} />
                </Icon>
              </View>
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
