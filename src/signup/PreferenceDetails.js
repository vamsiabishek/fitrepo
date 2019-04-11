import React, { Component } from "react";
import { KeyboardAvoidingView, Text, UIManager, View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import HorizontalSelectView from "../components/HorizontalSelectView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ICON_SIZE,
  ICON_SIZE_LARGE
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
          style={{ flex: 1 }}
          behaviour="position"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              paddingVertical: 100
              //backgroundColor: "yellow"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                backgroundColor: styleCommon.secondaryButtonColor,
                borderRadius: 10,
                borderBottomWidth: 0,
                shadowColor: "grey",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 2,
                elevation: 5,
                marginHorizontal: 5,
                marginVertical: 5
              }}
            >
              <View
                style={{
                  width: 300,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  //backgroundColor: "red",
                  padding: 5
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    textAlign: "left",
                    color: styleCommon.secondaryButtonTextColor,
                    fontSize: 15
                  }}
                >
                  Your Food Preference
                </Text>
                <Icon
                  name={foodPreference === 0 ? "leaf" : "food-variant"}
                  style={{
                    paddingRight: 5,
                    color: styleCommon.selectedButtonColor
                  }}
                  size={ICON_SIZE}
                />
              </View>
              <View
                style={{
                  marginTop: 10
                  //backgroundColor: "pink"
                }}
              >
                <ButtonGroup
                  onPress={this.updateVegIndex}
                  selectedIndex={foodPreference}
                  buttons={["Vegetarian", "Non-Vegetarian"]}
                  containerStyle={styles.vegButtonGroup}
                  innerBorderStyle={{ width: 0 }}
                  selectedButtonStyle={
                    foodPreference === 0 ? styles.veg : styles.nonVeg
                  }
                  textStyle={{ fontSize: 14 }}
                  selectedTextStyle={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: styleCommon.primaryButtonTextColor
                  }}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                backgroundColor: styleCommon.secondaryButtonColor,
                borderRadius: 10,
                borderBottomWidth: 0,
                shadowColor: "grey",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 2,
                elevation: 5,
                marginHorizontal: 5,
                marginVertical: 5
              }}
            >
              <View
                style={{
                  width: 300,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  //backgroundColor: "red",
                  padding: 5
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    textAlign: "left",
                    color: styleCommon.secondaryButtonTextColor,
                    fontSize: 15
                  }}
                >
                  Number of Meals You Eat in a Day
                </Text>
                <Icon
                  name={"numeric-" + numberOfMeals + "-circle"}
                  style={{
                    paddingRight: 5,
                    color: styleCommon.selectedButtonColor
                  }}
                  size={ICON_SIZE_LARGE}
                />
              </View>
              <View
                style={{
                  width: 300,
                  marginTop: 10,
                  padding: 10
                  //backgroundColor: "blue"
                }}
              >
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
