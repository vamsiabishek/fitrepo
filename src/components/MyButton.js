import React from "react";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  SCREEN_WIDTH,
  btnGradientColorLeft,
  modalBtnGradientColorRight,
  btnGradientColorRightDisabled
} from "../../assets/style/stylesCommonValues";

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
    width: SCREEN_WIDTH - 100,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  activeButtonTitle: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 16
  },
  buttonTitle: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "700",
    fontSize: 16
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
        {Platform.OS === "ios" ? (
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
        ) : (
          <TouchableNativeFeedback
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
          </TouchableNativeFeedback>
        )}
      </View>
    );
  }
}

export default MyButton;
