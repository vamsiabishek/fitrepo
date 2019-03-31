import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { commonStyles, SCREEN_WIDTH } from "../../assets/style/stylesCommon";
import { GRADIENT_BG_IMAGE } from "../common/Common";
import Header from "../components/signup/Header";
import NavNextButton from "../components/signup/NavNextButton";
import Goal from "./Goal";
import Gender from "./Gender";
import FitnessLevel from "./FitnessLevel";
import FoodSources from "./FoodSources";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      gender: "",
      fitnessLevel: "",
      navButtonActive: false,
      screen: 1
    };
  }
  setGoal = goal => {
    this.setState({ goal, navButtonActive: true });
  };
  setGender = gender => {
    this.setState({ gender, navButtonActive: true });
  };
  setFitnessLevel = fitnessLevel => {
    this.setState({ fitnessLevel, navButtonActive: true });
  }
  onNext = currentScreen => {
    let isScrollable = false;
    if (currentScreen === 1 && this.state.goal > 0) isScrollable = true;
    if (currentScreen === 2 && this.state.gender >= 0) isScrollable = true;
    if (currentScreen === 3 && this.state.fitnessLevel > 0) isScrollable = true;
    if (isScrollable && this.scrollRef) {
      const scrollValue = SCREEN_WIDTH * currentScreen;
      this.scrollRef.scrollTo({ x: scrollValue });
      this.setState({ screen: this.state.screen + 1, navButtonActive: false });
    }
  };
  render() {
    const { goal, gender, fitnessLevel, navButtonActive, screen } = this.state;
    return (
      <View style={commonStyles.container}>
        <ImageBackground
          source={GRADIENT_BG_IMAGE}
          style={commonStyles.bgImage}
        >
          <ScrollView
            horizontal="true"
            scrollEnabled="false"
            ref={scrollView => {
              this.scrollRef = scrollView;
            }}
          >
            <View style={commonStyles.subContainer}>
              <Header title="Would you like to choose ?" marginTop={110}/>
              <FoodSources />
              <NavNextButton
                isActive={navButtonActive}
                screen={screen}
                onNext={this.onNext}
              />
            </View>
            <View style={commonStyles.subContainer}>
              <Header title="What is your goal ?" />
              <Goal goal={goal} setGoal={this.setGoal} />
              <NavNextButton
                isActive={navButtonActive}
                screen={screen}
                onNext={this.onNext}
              />
            </View>
            <View style={commonStyles.subContainer}>
              <Header title="GENDER !" />
              <Gender gender={gender} setGender={this.setGender} />
              <NavNextButton
                isActive={navButtonActive}
                screen={screen}
                onNext={this.onNext}
              />
            </View>
            <View style={commonStyles.subContainer}>
              <Header title="What is your activity level ?" marginTop={120} />
              <FitnessLevel gender={gender} selectedLevel={fitnessLevel} setFitnessLevel={this.setFitnessLevel} levels={[1,2,3]}/>
              <NavNextButton
                isActive={navButtonActive}
                screen={screen}
                onNext={this.onNext}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
