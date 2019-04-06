import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  SCREEN_WIDTH,
  styleCommon
} from "../../assets/style/stylesCommonValues";

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    width: 140,
    height: 140,
    backgroundColor: styleCommon.secondaryColor,
    borderRadius: 20,
    borderBottomWidth: 0,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5
  },
  activeButtonStyle: {
    width: 140,
    height: 140,
    backgroundColor: styleCommon.selectedButtonColor,
    borderRadius: 20,
    borderBottomWidth: 0,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5
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
    justifyContent: "center",
    alignItems: "center"
  }
});

export default class Gender extends Component {
  render() {
    const buttonIconColor = "#004a94";
    const buttonIconActiveColor = "white";
    const { gender, setGender } = this.props;
    return (
      <View style={styles.mainContent}>
        <Button
          buttonStyle={
            gender === 1 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            gender === 1 ? styles.activeButtonTitle : styles.buttonTitle
          }
          icon={
            <Icon
              name="human-male"
              size={80}
              color={gender === 1 ? buttonIconActiveColor : buttonIconColor}
              style={styles.buttonIcon}
            />
          }
          iconLeft
          onPress={() => setGender(1)}
        />
        <Button
          buttonStyle={
            gender === 0 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            gender === 0 ? styles.activeButtonTitle : styles.buttonTitle
          }
          icon={
            <Icon
              name="human-female"
              size={80}
              color={gender === 0 ? buttonIconActiveColor : buttonIconColor}
              style={styles.buttonIcon}
            />
          }
          iconLeft
          onPress={() => setGender(0)}
        />
      </View>
    );
  }
}
