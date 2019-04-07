import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
              size={ICON_SELECT_GENDER}
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
              size={ICON_SELECT_GENDER}
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
