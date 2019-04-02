import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
  }
  render() {
    const buttonIconColor = "#004a94";
    const buttonIconActiveColor = "white";
    const { goal, setGoal } = this.props;
    return (
      <View style={styles.mainContent}>
        <Button
          buttonStyle={
            goal === 0 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            goal === 0 ? styles.activeButtonTitle : styles.buttonTitle
          }
          title="Fat Loss"
          icon={
            <Icon
              // arrow-right-drop-circle-outline
              name="scale-bathroom"
              size={35}
              color={goal === 0 ? buttonIconActiveColor : buttonIconColor}
              style={styles.buttonIcon}
            />
          }
          iconLeft
          onPress={() => setGoal(0)}
        />
        <Button
          buttonStyle={
            goal === 1 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            goal === 1 ? styles.activeButtonTitle : styles.buttonTitle
          }
          title="Be Healthy"
          icon={
            <Icon
              // arrow-right-drop-circle-outline
              name="heart-pulse"
              size={35}
              color={goal === 1 ? buttonIconActiveColor : buttonIconColor}
              style={styles.buttonIcon}
            />
          }
          iconLeft
          onPress={() => setGoal(1)}
        />
        <Button
          buttonStyle={
            goal === 2 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            goal === 2 ? styles.activeButtonTitle : styles.buttonTitle
          }
          title="Gain Weight"
          icon={
            <Icon
              // arrow-right-drop-circle-outline
              name="scale-bathroom"
              size={35}
              color={goal === 2 ? buttonIconActiveColor : buttonIconColor}
              style={styles.buttonIcon}
            />
          }
          iconLeft
          onPress={() => setGoal(2)}
        />
      </View>
    );
  }
}
