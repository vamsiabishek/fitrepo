import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesGoal";
import {
  styleCommon,
  ICON_SIZE_EXTRA_LARGE
} from "../../assets/style/stylesCommonValues";

export default class Goal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const buttonIconColor = styleCommon.secondaryButtonTextColor;
    const buttonIconActiveColor = styleCommon.textColor2;
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
              name="scale-bathroom"
              size={ICON_SIZE_EXTRA_LARGE}
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
              name="heart-pulse"
              size={ICON_SIZE_EXTRA_LARGE}
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
              name="scale-bathroom"
              size={ICON_SIZE_EXTRA_LARGE}
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
