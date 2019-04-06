import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  btnGradientColorLeft,
  btnGradientColorRight,
  btnGradientColorRightDisabled
} from "../../../assets/style/stylesCommonValues";

const styles = StyleSheet.create({
  bottomNav: {
    //flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 40 : 10
  },
  navButtonActive: {
    width: 300,
    height: 60,
    borderRadius: 30
  },
  navButtonDisabled: {
    width: 300,
    height: 60,
    borderRadius: 30,
    opacity: 0.6
  },
  activeButtonTitle: {
    fontWeight: "700",
    fontSize: 20
  },
  buttonTitle: {
    color: "white",
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
    let gradientColorRight = btnGradientColorRightDisabled;
    const { isActive, screen, onNext, buttonText, applyFlex } = this.props;
    let { bottomNav } = styles;
    if (isActive) gradientColorRight = btnGradientColorRight;
    if (applyFlex === false) {
      bottomNav = { ...bottomNav, flex: 0 };
    }
    return (
      <View style={bottomNav}>
        <Button
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: [btnGradientColorLeft, gradientColorRight],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 }
          }}
          buttonStyle={
            isActive ? styles.navButtonActive : styles.navButtonDisabled
          }
          titleStyle={isActive ? styles.activeButtonTitle : styles.buttonTitle}
          title={buttonText ? buttonText : "NEXT"}
          icon={
            <Icon
              name="chevron-right"
              size={30}
              color="white"
              style={styles.navButtonIcon}
            />
          }
          iconRight
          onPress={() => onNext(screen)}
        />
      </View>
    );
  }
}

export default NavNextButton;
