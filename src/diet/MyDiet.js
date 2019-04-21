import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Animated
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TotalDietMacros from "./TotalDietMarcos";
import MealsContainer from "./meals/MealsContainer";
import { styles } from "../../assets/style/stylesMyDiet";
import {
  styleCommon,
  ICON_SIZE,
  ICON_SIZE_LARGE
} from "../../assets/style/stylesCommonValues";
import { database } from "../common/FirebaseConfig";
import { GRADIENT_BG_IMAGE } from "../common/Common";
import LoadingAnimation from "../components/LoadingAnimation";

export default class MyDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeDay: true, // others days can be rest or refeed
      diet: {},
      meals: {},
      allMeals: {},
      currentWeek: 1,
      showDayOnScroll: false
    };
    this.dayBarScrollY = new Animated.Value(1);
    this.dayBarExpandedHeight = styles.dayBarStyle.height; // calculated by onLayout
    this.dayBarCollapsedHeight = 0;
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    this.setState({ isLoading: true });
    const dietId = navigation.getParam("dietId");
    //const dietId = "-Lcun_Bc-uGbmYUoSFn2";
    console.log("fetching details for the diet with Id:", dietId);
    const { diet, meals } = await this.fetchDietAndMeals(dietId);
    console.log("diet and meals:", diet, meals);
    this.setState({ diet, meals: meals["0"], allMeals: meals });
  };

  fetchDietAndMeals = async dietId => {
    const [diet, meals] = await Promise.all([
      this.fetchDiet(dietId),
      this.fetchMeals(dietId)
    ]);
    return { diet, meals };
  };

  fetchDiet = async dietId => {
    let diet = {};
    await database
      .ref("diets")
      .child(dietId)
      .once("value")
      .then(snap => {
        if (snap.val()) diet = snap.val();
      })
      .catch(error => {
        console.log("error while fetching diets from MyDiet page");
      });
    return diet;
  };

  fetchMeals = async dietId => {
    let meals = {};
    await database
      .ref("meals")
      .orderByChild("dietId")
      .equalTo(dietId)
      .once("value")
      .then(snap => {
        if (snap.val()) meals = snap.val()[Object.keys(snap.val())[0]];
      })
      .catch(error => {
        console.log("error while fetching meals from MyDiet page");
      });
    this.setState({ isLoading: false });
    return meals;
  };

  onDayChange = selectedDay => {
    if (selectedDay === "training") this.setState({ activeDay: true });
    else if (selectedDay === "rest") this.setState({ activeDay: false });
  };

  caloriesMacrosAndMeals = ({
    calFromProtein,
    calFromCarbs,
    calFromFats,
    calFromProteinForRD,
    calFromCarbsForRD,
    calFromFatsForRD,
    trainingDayMeals,
    restDayMeals
  }) => {
    let totalCalories = 0;
    let proteinInGm = 0;
    let carbsInGm = 0;
    let fatsInGm = 0;
    let mealList = {};
    const { activeDay } = this.state;
    if (trainingDayMeals && restDayMeals) {
      if (activeDay) {
        totalCalories = Math.round(calFromProtein + calFromCarbs + calFromFats);
        proteinInGm = Math.round(calFromProtein / 4);
        carbsInGm = Math.round(calFromCarbs / 4);
        fatsInGm = Math.round(calFromFats / 9);
        mealList = trainingDayMeals;
      } else {
        totalCalories = Math.round(
          calFromProteinForRD + calFromCarbsForRD + calFromFatsForRD
        );
        proteinInGm = Math.round(calFromProteinForRD / 4);
        carbsInGm = Math.round(calFromCarbsForRD / 4);
        fatsInGm = Math.round(calFromFatsForRD / 9);
        mealList = restDayMeals;
      }
    }
    return {
      totalCalories,
      proteinInGm,
      carbsInGm,
      fatsInGm,
      mealList
    };
  };

  showDayLabelOnScroll = event => {
    const { showDayOnScroll } = this.state;
    const {
      nativeEvent: {
        contentOffset: { y: offset }
      }
    } = event;
    if (offset > 20 && !showDayOnScroll) {
      this.day = this.state.activeDay ? "Training day" : "Rest day";
      this.setState({ showDayOnScroll: true });
    }
  };

  hideDayLabelOnScroll = event => {
    const { showDayOnScroll } = this.state;
    const {
      nativeEvent: {
        contentOffset: { y: offset }
      }
    } = event;
    if (offset <= 0 && showDayOnScroll)
      this.setState({ showDayOnScroll: false });
  };

  changeWeek = ({ prev, next }) => {
    const { currentWeek, allMeals } = this.state;
    if (prev && allMeals[currentWeek - 2]) {
      this.setState({
        meals: allMeals[currentWeek - 2],
        currentWeek: currentWeek - 1
      });
    } else if (next && allMeals[currentWeek]) {
      this.setState({
        meals: allMeals[currentWeek],
        currentWeek: currentWeek + 1
      });
    }
  };

  render() {
    const { isLoading, activeDay, meals, allMeals, currentWeek } = this.state;
    const {
      totalCalories,
      proteinInGm,
      carbsInGm,
      fatsInGm,
      mealList
    } = this.caloriesMacrosAndMeals(meals);
    const dayBarHeight = this.dayBarScrollY.interpolate({
      inputRange: [0, this.dayBarExpandedHeight - 20],
      outputRange: [this.dayBarExpandedHeight, this.dayBarCollapsedHeight],
      extrapolate: "clamp"
    });
    const trainingIconColor = activeDay ? "white" : styleCommon.unSelected;
    const restIconColor = !activeDay ? "white" : styleCommon.unSelected;
    const nextWeekEnabled = allMeals[currentWeek] ? true : false;
    const prevWeekEnabled = allMeals[currentWeek - 2] ? true : false;
    return (
      <ImageBackground source={GRADIENT_BG_IMAGE} style={styles.container}>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <View style={styles.container}>
            <View>
              <Animated.View
                style={[styles.dayBarStyle, { height: dayBarHeight }]}
              >
                <Button
                  title="Training day"
                  containerStyle={styles.buttonContainer}
                  buttonStyle={
                    activeDay ? styles.activeDayButton : styles.dayButton
                  }
                  icon={
                    <Icon
                      name="run-fast"
                      size={ICON_SIZE}
                      color={trainingIconColor}
                      style={styles.buttonIconStyle}
                    />
                  }
                  titleStyle={
                    activeDay
                      ? styles.activeDayButtonText
                      : styles.dayButtonText
                  }
                  onPress={() => this.onDayChange("training")}
                />
                <Button
                  title="Rest day"
                  containerStyle={styles.buttonContainer}
                  buttonStyle={
                    !activeDay ? styles.activeDayButton : styles.dayButton
                  }
                  icon={
                    <Icon
                      name="sleep"
                      size={ICON_SIZE}
                      color={restIconColor}
                      style={styles.buttonIconStyle}
                    />
                  }
                  titleStyle={
                    !activeDay
                      ? styles.activeDayButtonText
                      : styles.dayButtonText
                  }
                  onPress={() => this.onDayChange("rest")}
                />
              </Animated.View>
            </View>
            <TotalDietMacros
              totalCal={totalCalories}
              protein={proteinInGm}
              carbs={carbsInGm}
              fat={fatsInGm}
            />
            <View style={styles.weeklyBarStyle}>
              <View style={{ justifyContent: "flex-start" }}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => this.changeWeek({ prev: true })}
                >
                  <Icon
                    name="chevron-left"
                    size={ICON_SIZE_LARGE}
                    style={styles.navButtonIcon}
                    color={
                      prevWeekEnabled ? styleCommon.textColor1 : "lightgrey"
                    }
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <Text style={styles.weekText}>
                  Week {this.state.currentWeek}
                </Text>
                {this.state.showDayOnScroll && (
                  <Text style={{ color: "grey" }}>({this.day})</Text>
                )}
              </View>
              <View style={{ justifyContent: "flex-end" }}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => this.changeWeek({ next: true })}
                >
                  <Icon
                    name="chevron-right"
                    size={ICON_SIZE_LARGE}
                    style={styles.navButtonIcon}
                    color={
                      nextWeekEnabled ? styleCommon.textColor1 : "lightgrey"
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            <MealsContainer
              meals={mealList}
              dayBarScrollY={this.dayBarScrollY}
              showDayLabelOnScroll={this.showDayLabelOnScroll}
              hideDayLabelOnScroll={this.hideDayLabelOnScroll}
            />
          </View>
        )}
      </ImageBackground>
    );
  }
}
