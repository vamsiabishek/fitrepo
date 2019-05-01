import React, { Component } from "react";
import { View } from "react-native";
import SelectButton from "../components/SelectButton";
import { styles } from "../../assets/style/stylesGender";
import {
  styleCommon,
  ICON_SELECT_GENDER
} from "../../assets/style/stylesCommonValues";

export default class Gender extends Component {
  render() {
    const buttonIconColor = styleCommon.secondaryButtonTextColor;
    const buttonIconActiveColor = styleCommon.textColor2;
    const { gender, setGender } = this.props;
    return (
      <View style={styles.mainContent}>
        <SelectButton
          buttonStyle={
            gender === 1 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            gender === 1 ? styles.activeButtonTitle : styles.buttonTitle
          }
          iconLeft
          iconSize={ICON_SELECT_GENDER}
          iconName={gender === 1 ? "man-raising-hand" : "man"}
          buttonIcon={styles.buttonIcon}
          buttonIconColor={
            gender === 1 ? buttonIconActiveColor : buttonIconColor
          }
          iconLeft
          shouldUseEmoji={true}
          onPress={setGender}
          value={1}
        />
        <SelectButton
          buttonStyle={
            gender === 0 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            gender === 0 ? styles.activeButtonTitle : styles.buttonTitle
          }
          iconSize={ICON_SELECT_GENDER}
          iconName={gender === 0 ? "woman-raising-hand" : "woman"}
          buttonIcon={styles.buttonIcon}
          buttonIconColor={
            gender === 0 ? buttonIconActiveColor : buttonIconColor
          }
          iconLeft
          shouldUseEmoji={true}
          onPress={setGender}
          value={0}
        />
      </View>
    );
  }
}
