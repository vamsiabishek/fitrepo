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

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PreferenceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHealthCondStrPickerVisible: false,
      selectedIndex: 0
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
                <Icon
                  name={foodPreference === 0 ? "leaf" : "food-variant"}
                  style={styles.headerIconStyle}
                  size={ICON_SIZE}
                />
              </View>
              <View style={styles.contentBoxMainStyle}>
                <ButtonGroup
                  onPress={this.updateVegIndex}
                  selectedIndex={foodPreference}
                  buttons={["Vegetarian", "Non-Vegetarian"]}
                  containerStyle={styles.vegButtonGroup}
                  innerBorderStyle={{ width: 0 }}
                  selectedButtonStyle={
                    foodPreference === 0 ? styles.veg : styles.nonVeg
                  }
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
                <Icon
                  name={"numeric-" + numberOfMeals + "-circle"}
                  style={styles.headerIconStyle}
                  size={ICON_SIZE_LARGE}
                />
              </View>
              <View style={styles.contentBoxMainStyle}>
                <HorizontalSelectView
                  items={numberOfMealsOptions}
                  selectedItem={numberOfMeals}
                  onSelectionChange={this.onMealsChange}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
