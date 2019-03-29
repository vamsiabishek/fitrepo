import React, { Component } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { commonStyles } from "../assets/style/stylesCommon";
import { GRADIENT_BG_IMAGE } from "./common/Common";
import Header from "./components/signup/Header";
import NavNextButton from "./components/signup/NavNextButton";

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    width: 280,
    height: 80,
    backgroundColor: "#d1feff",
    borderRadius: 10,
    borderBottomWidth: 0,
    //shadowColor: '#9AC0B6',
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20
  },
  activeButtonStyle: {
    width: 280,
    height: 80,
    //backgroundColor: "#9400D3",
    backgroundColor: "#FA8072",
    borderRadius: 10,
    borderBottomWidth: 0,
    //shadowColor: '#9AC0B6',
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20
  },
  buttonTitle: {
    color: "#004a94",
    fontWeight: "600"
  },
  activeButtonTitle: {
    color: "white",
    fontWeight: "600"
  },
  
  buttonIcon: {
    position: "absolute",
    left: 45
  }
});

export default class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      navButtonActive: false
    };
  }
  setGoal = goal => {
    this.setState({ goal, navButtonActive: true });
  };
  render() {
    const buttonIconColor = "#004a94";
    const buttonIconActiveColor = "white";
    const { goal, navButtonActive } = this.state;
    return (
      <View style={commonStyles.container}>
        <ImageBackground
          source={GRADIENT_BG_IMAGE}
          style={commonStyles.bgImage}
        >
          <Header title="What is your goal?" />
          <View style={styles.mainContent}>
            <Button
              buttonStyle={
                goal === 1 ? styles.activeButtonStyle : styles.buttonStyle
              }
              titleStyle={goal === 1 ? styles.activeButtonTitle : styles.buttonTitle}
              title="Fat Loss"
              icon={
                <Icon
                  // arrow-right-drop-circle-outline
                  name="scale-bathroom"
                  size={35}
                  color={goal === 1 ? buttonIconActiveColor : buttonIconColor}
                  style={styles.buttonIcon}
                />
              }
              iconLeft
              onPress={() => this.setGoal(1)}
            />
            <Button
               buttonStyle={
                goal === 2 ? styles.activeButtonStyle : styles.buttonStyle
              }
              titleStyle={goal === 2 ? styles.activeButtonTitle : styles.buttonTitle}
              title="Be Healthy"
              icon={
                <Icon
                  // arrow-right-drop-circle-outline
                  name="heart-pulse"
                  size={35}
                  color={goal === 2 ? buttonIconActiveColor : buttonIconColor}
                  style={styles.buttonIcon}
                />
              }
              iconLeft
              onPress={() => this.setGoal(2)}
            />
            <Button
               buttonStyle={
                goal === 3 ? styles.activeButtonStyle : styles.buttonStyle
              }
              titleStyle={goal === 3 ? styles.activeButtonTitle : styles.buttonTitle}
              title="Gain Weight"
              icon={
                <Icon
                  // arrow-right-drop-circle-outline
                  name="scale-bathroom"
                  size={35}
                  color={goal === 3 ? buttonIconActiveColor : buttonIconColor}
                  style={styles.buttonIcon}
                />
              }
              iconLeft
              onPress={() => this.setGoal(3)}
            />
          </View>
          <NavNextButton isActive={navButtonActive} />
        </ImageBackground>
      </View>
    );
  }
}
