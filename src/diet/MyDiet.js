import React, { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TotalDietMacros from "./TotalDietMarcos";
import MealsContainer from "./meals/MealsContainer";
import { styles } from "../../assets/style/stylesMyDiet";
import { database } from "../common/FirebaseConfig";

export default class MyDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDay: true, // others days can be rest or refeed
      diet: {},
      meals: {}
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const dietId = navigation.getParam("dietId");
    //const dietId = "-Lacz7LNx-jwiG0f2REy"
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

  render() {
    const { activeDay, diet, meals } = this.state;
    const {
      totalCalories,
      proteinInGm,
      carbsInGm,
      fatsInGm,
      mealList
    } = this.caloriesMacrosAndMeals(meals);

    const { navigation } = this.props;
    //const subHeaderLeftText = "Week 1";
    //const subHeaderCenterText = "Week 2";
    //const subHeaderRightText = "Week 3";
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
       {/* <View style={styles.weeklyBarStyle}>
          <View style={{ alignItems: "flex-start" }}>
            <TouchableOpacity
              style={styles.weeklyTouchableStyle}
              onPress={() => navigation.navigate("Diet")}
            >
              <Icon
                name="arrow-left-drop-circle"
                size={25}
                style={styles.weeklyIconStyle}
              />
              <Text style={styles.weeklyTextStyle}>{subHeaderLeftText}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.weeklyTextStyleCenter}>
              {subHeaderCenterText}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={styles.weeklyTouchableStyle}
              onPress={() => navigation.navigate("Diet")}
            >
              <Text style={styles.weeklyTextStyle}>{subHeaderRightText}</Text>
              <Icon
                name="arrow-right-drop-circle"
                size={25}
                style={styles.weeklyIconStyle}
              />
            </TouchableOpacity>
          </View>
    </View> */}
        <View style={styles.dayBarStyle}>
          <TouchableOpacity
            style={activeDay ? styles.activeDayButton : styles.dayButton}
            onPress={() => this.onDayChange("training")}
          >
            <Icon name="run-fast" size={25} color="white" />
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
            <Icon name="sleep" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <TotalDietMacros
          totalCal={totalCalories}
          protein={proteinInGm}
          carbs={carbsInGm}
          fat={fatsInGm}
        />
        <MealsContainer meals={mealList} />
      </View>
    );
  }
}
