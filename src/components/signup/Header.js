import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  styleCommon,
  ICON_BACK_SIZE
} from "../../../assets/style/stylesCommonValues";
import { styles } from "../../../assets/style/stylesHeader";

export default class Header extends React.Component {
  render() {
    const { title, marginTop, height, flex, screen, onBack } = this.props;
    let { header } = styles;
    if (marginTop || height || flex) {
      header = {
        ...header,
        marginTop,
        flex,
        height
      };
    }
    return (
      <View>
        <View style={styles.backHeaderContainer}>
          <View style={styles.buttonContainer}>
            <Button
              icon={
                <Icon
                  name="arrow-left-circle-outline"
                  size={ICON_BACK_SIZE}
                  color={styleCommon.secondaryButtonTextColor}
                />
              }
              containerStyle={styles.backButtonContainerStyle}
              buttonStyle={styles.backButtonStyle}
              onPress={() => onBack(screen)}
            />
          </View>
        </View>
        <View style={header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>
    );
  }
}
