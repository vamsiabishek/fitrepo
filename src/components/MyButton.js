import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { btnGradientColorLeft, modalBtnGradientColorRight, btnGradientColorRightDisabled } from "../../assets/style/stylesCommonValues"


const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonActive: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonGradiant: {
    width: 300,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  activeButtonTitle: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 20
  },
  buttonTitle: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 20
  },
  navButtonIcon: {
    position: "absolute",
    right: 20
  }
});

class MyButton extends React.Component {
  closeSourceModal = () => {
    const { onButtonClick } = this.props;
    console.log("trying to close modal from button");
    onButtonClick();
  };
  render() {
    const { label, disabled } = this.props;
    let gradientColorRight = modalBtnGradientColorRight;
    if (disabled) gradientColorRight = btnGradientColorRightDisabled;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonActive}
          onPress={() => this.closeSourceModal()}
        >
          <LinearGradient
            colors={[btnGradientColorLeft, gradientColorRight]}
            style={styles.buttonGradiant}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.buttonTitle}>{label}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MyButton;
