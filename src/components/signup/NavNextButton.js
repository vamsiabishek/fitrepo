import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  bottomNav: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 40
  },
  navButtonActive: {
    width: 300,
    height: 60,
    borderRadius: 30
  },
  navButtonDisabled: {
    width: 280,
    height: 70,
    borderRadius: 35
  },
  navButtonTitle: {
    color: "lightgrey",
    fontWeight: "600",
    fontSize: 20
  },
  navButtonIcon: {
    position: "absolute",
    right: 20 
  }
});

class NavNextButton extends React.Component {
  render() {
    return (
      <View style={styles.bottomNav}>
        <Button
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ["#66ffff", "#3333cc"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 }
          }}
          buttonStyle={styles.navButtonActive}
          titleStyle={styles.navButtonTitle}
          title="NEXT"
          icon={
            <Icon
              // arrow-right-drop-circle-outline
              name="chevron-right"
              size={30}
              color="grey"
              style={styles.navButtonIcon}
            />
          }
          iconRight
        />
      </View>
    );
  }
}

export default NavNextButton;
