import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TotalDietMacros from "./TotalDietMarcos";
import MealsContainer from "./meals/MealsContainer";
import { styles } from "../../assets/style/stylesMyDiet";
import {
  styleCommon,
  ICON_SIZE_LARGE
} from "../../assets/style/stylesCommonValues";
import { database } from "../common/FirebaseConfig";
import { GRADIENT_BG_IMAGE } from "../common/Common";

export default class MyDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDay: true, // others days can be rest or refeed
      diet: {},
      meals: {},
      currentWeek: "Week 1",
      showDayOnScroll: false
    };
    this.dayBarScrollY = new Animated.Value(1);
    this.dayBarExpandedHeight = styles.dayBarStyle.height; // calculated by onLayout
    this.dayBarCollapsedHeight = 0;
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    //const dietId = navigation.getParam("dietId");
    const dietId = "-LcBhVoVz_Ff9ExBDdd4";
    console.log("fetching details for the diet with Id:", dietId);
    const { diet, meals } = await this.fetchDietAndMeals(dietId);
    console.log("diet and meals:", diet, meals);
    this.setState({ diet, meals });
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

  render() {
    const { activeDay, diet, meals } = this.state;
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

    const { navigation } = this.props;
    //const subHeaderLeftText = "Week 1";
    //const subHeaderCenterText = "Week 2";
    //const subHeaderRightText = "Week 3";
    const trainingIconColor = activeDay ? "white" : styleCommon.unSelected;
    const restIconColor = !activeDay ? "white" : styleCommon.unSelected;
    return (
      <ImageBackground source={GRADIENT_BG_IMAGE} style={styles.container}>
        <StatusBar />
        <View>
          <Animated.View style={[styles.dayBarStyle, { height: dayBarHeight }]}>
            <TouchableOpacity
              style={activeDay ? styles.activeDayButton : styles.dayButton}
              onPress={() => this.onDayChange("training")}
            >
              <Icon name="run-fast" size={25} color={trainingIconColor} />
              <Text
                style={
                  activeDay ? styles.activeDayButtonText : styles.dayButtonText
                }
              >
                Traning Day
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={!activeDay ? styles.activeDayButton : styles.dayButton}
              onPress={() => this.onDayChange("rest")}
            >
              <Text
                style={
                  !activeDay ? styles.activeDayButtonText : styles.dayButtonText
                }
              >
                Rest Day
              </Text>
              <Icon name="sleep" size={25} color={restIconColor} />
            </TouchableOpacity>
          </Animated.View>
        </View>
        <TotalDietMacros
          totalCal={totalCalories}
          protein={proteinInGm}
          carbs={carbsInGm}
          fat={fatsInGm}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15
          }}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Icon
                name="chevron-left"
                size={ICON_SIZE_LARGE}
                style={styles.navButtonIcon}
                color={styleCommon.textColor1}
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
            <Text style={styles.weekText}>{this.state.currentWeek}</Text>
            {this.state.showDayOnScroll && (
              <Text style={{ color: "grey" }}>({this.day})</Text>
            )}
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Icon
                name="chevron-right"
                size={ICON_SIZE_LARGE}
                style={styles.navButtonIcon}
                color={styleCommon.textColor1}
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
      </ImageBackground>
    );
  }
}
