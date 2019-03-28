import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Button } from "react-native-elements";
import { commonStyles } from "../assets/style/stylesCommon";
import { GRADIENT_BG_IMAGE } from "./common/Common";
import Header from "./components/signup/Header"
import NavNextButton from "./components/signup/NavNextButton"

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
  titleStyle: {
    color: "#004a94",
    fontWeight: "600"
  },
});

export default class Goal extends Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <ImageBackground
          source={GRADIENT_BG_IMAGE}
          style={commonStyles.bgImage}
        >
          <Header title="What is your goal?"/>
          <View style={styles.mainContent}>
            <Button
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
              title="Fat Loss"
            />
            <Button
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
              title="Be Healthy"
            />
            <Button
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
              title="Gain Weight"
            />
          </View>
          <NavNextButton />
        </ImageBackground>
      </View>
    );
  }
}
