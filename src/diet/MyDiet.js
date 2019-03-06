import React, { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TotalDietMacros from "./TotalDietMarcos";
import MealsContainer from "./meals/MealsContainer";
import { styles } from "../../assets/style/stylesMyDiet";
import { designDiet } from "../diet/DietAlgorithm";

export default class MyDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDay: "training" // others days can be rest or refeed
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const completeDietOptions = navigation.getParam("completeDietOptions");
    console.log("completeDietOptions:", completeDietOptions);
    designDiet(completeDietOptions);
  };

  onDayChange = selectedDay => {
    if (selectedDay === "training") this.setState({ activeDay: "training" });
    else if (selectedDay === "rest") this.setState({ activeDay: "rest" });
  };

  render() {
    const { activeDay } = this.state;
    const subHeaderLeftText = "Week 1";
    const subHeaderCenterText = "Week 2";
    const subHeaderRightText = "Week 3";
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.weeklyBarStyle}>
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
        </View>
        <View style={styles.dayBarStyle}>
          <TouchableOpacity
            style={
              activeDay === "training"
                ? styles.activeDayButton
                : styles.dayButton
            }
            onPress={() => this.onDayChange("training")}
          >
            <Icon name="run-fast" size={25} color="white" />
            <Text
              style={
                activeDay === "training"
                  ? styles.activeDayButtonText
                  : styles.dayButtonText
              }
            >
              Traning Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeDay === "rest" ? styles.activeDayButton : styles.dayButton
            }
            onPress={() => this.onDayChange("rest")}
          >
            <Text
              style={
                activeDay === "rest"
                  ? styles.activeDayButtonText
                  : styles.dayButtonText
              }
            >
              Rest Day
            </Text>
            <Icon name="sleep" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <TotalDietMacros protein="75" carbs="100" fat="20" />
        <MealsContainer />
      </View>
    );
  }
}
