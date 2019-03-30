import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50
  },
  buttonStyle: {
    width: 140,
    height: 140,
    backgroundColor: "#d1feff",
    borderRadius: 20,
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
    width: 140,
    height: 140,
    //backgroundColor: "#9400D3",
    backgroundColor: "#FA8072",
    borderRadius: 20,
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
              // arrow-right-drop-circle-outline
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
              // arrow-right-drop-circle-outline
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
