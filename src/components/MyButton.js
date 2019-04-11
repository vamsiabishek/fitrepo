import React from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  btnGradientColorLeft,
  modalBtnGradientColorRight,
  btnGradientColorRightDisabled
} from "../../assets/style/stylesCommonValues";
import { styles } from "../../assets/style/stylesMyButton";

export default class MyButton extends React.Component {
  closeSourceModal = () => {
    const { onButtonClick } = this.props;
    onButtonClick();
  };
  render() {
    const { label, disabled, containerStyle } = this.props;
    let gradientColorRight = modalBtnGradientColorRight;
    if (disabled) gradientColorRight = btnGradientColorRightDisabled;
    return (
      <View
        style={
          containerStyle !== undefined ? containerStyle : styles.buttonContainer
        }
      >
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
