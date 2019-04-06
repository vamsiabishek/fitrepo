import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon
} from "../../../assets/style/stylesCommonValues";
console.log(SCREEN_HEIGHT, SCREEN_WIDTH);
const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT * 0.12,
    padding: 10
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#004A94",
    textAlign: "center"
  },
  backHeaderContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: Platform.OS === "ios" ? 40 : 10,
    paddingRight: 20
  },
  buttonContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.07,
    paddingRight: 20
  },
  backButtonContainerStyle: {
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginTop: 2,
    marginLeft: 10,
    height: 50
  },
  backButtonStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    backgroundColor: "transparent"
  }
});

class Header extends React.Component {
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
      <React.Fragment>
        <View style={styles.backHeaderContainer}>
          <View style={styles.buttonContainer}>
            <Button
              icon={
                <Icon
                  name="arrow-left-circle-outline"
                  size={32}
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
      </React.Fragment>
    );
  }
}

export default Header;
