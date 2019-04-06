import React from "react";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import {
  MALE_BEGINNER_ICON,
  MALE_INTERMEDIATE_ICON,
  MALE_ADVANCED_ICON,
  FEMALE_BEGINNER_ICON,
  FEMALE_INTERMEDIATE_ICON,
  FEMALE_ADVANCED_ICON,
  BEGINNER_LABEL,
  INTERMEDIATE_LABEL,
  ADVANCED_LABEL,
  BEGINNER_DESC,
  INTERMEDIATE_DESC,
  ADVANCED_DESC
} from "../common/Common";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  styleCommon
} from "../../assets/style/stylesCommonValues";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  subContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  lineContainer: {
    height: 50,
    width: 50,
    marginLeft: 45,
    borderLeftWidth: 3,
    borderColor: styleCommon.secondaryButtonColor
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT * 0.15,
    width: SCREEN_HEIGHT * 0.15, //SCREEN_WIDTH * 0.32,
    backgroundColor: styleCommon.secondaryButtonColor,
    borderRadius: (SCREEN_HEIGHT * 0.15) / 2
  },
  iconImageStyle: {
    width: SCREEN_HEIGHT * 0.1 - 18,
    height: SCREEN_HEIGHT * 0.1,
    tintColor: "#004A94"
  },
  iconDataStyle: {
    height: SCREEN_HEIGHT * 0.12,
    width: SCREEN_HEIGHT * 0.12, //SCREEN_WIDTH * 0.27,
    alignItems: "center",
    justifyContent: "center"
  },
  iconTextStyle: {
    fontSize: 70
  },
  levelDecriptionContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10
  },
  levelTitleStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#004A94"
  },
  levelDescriptionStyle: {
    width: 180,
    fontSize: 13,
    color: "#004A94"
  }
});

class VerticalSelectView extends React.Component {
  _keyExtractor = item => `key${item}`;

  render() {
    const { levels, gender, selectedLevel, setFitnessLevel } = this.props;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center"
          }}
          data={levels}
          renderItem={({ item, index }) => {
            let {
              iconStyle,
              iconImageStyle,
              levelDecriptionContainer,
              lineContainer,
              levelDescriptionStyle,
              levelTitleStyle
            } = styles;
            console.log("level:", item, selectedLevel);
            if (item === selectedLevel) {
              iconStyle = {
                ...iconStyle,
                backgroundColor: "#FA8072"
              };
              iconImageStyle = {
                ...iconImageStyle,
                tintColor: "white"
              };
              levelTitleStyle = {
                ...levelTitleStyle,
                fontSize: 18
              };
              levelDescriptionStyle = {
                ...levelDescriptionStyle,
                fontSize: 14,
                fontWeight: "600"
              };
            }
            let levelImage =
              gender === 1 ? MALE_BEGINNER_ICON : FEMALE_BEGINNER_ICON;
            let levelTitle = BEGINNER_LABEL;
            let levelDec = BEGINNER_DESC;
            let levelDescriptionStyles = [levelDecriptionContainer];
            if (index === 1) {
              levelImage =
                gender === 1
                  ? MALE_INTERMEDIATE_ICON
                  : FEMALE_INTERMEDIATE_ICON;
              levelTitle = INTERMEDIATE_LABEL;
              levelDec = INTERMEDIATE_DESC;
              levelDescriptionStyles.push({ marginTop: lineContainer.height });
            } else if (index === 2) {
              levelImage =
                gender === 1 ? MALE_ADVANCED_ICON : FEMALE_ADVANCED_ICON;
              levelTitle = ADVANCED_LABEL;
              levelDec = ADVANCED_DESC;
              levelDescriptionStyles.push({ marginTop: lineContainer.height });
            }

            return (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.subContainer}>
                  {index !== 0 && <View style={styles.lineContainer} />}
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={() => setFitnessLevel(item)}
                  >
                    <View style={iconStyle}>
                      <View style={styles.iconDataStyle}>
                        <Image source={levelImage} style={iconImageStyle} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={levelDescriptionStyles}>
                  <Text style={levelTitleStyle}>{levelTitle}</Text>
                  <Text style={levelDescriptionStyle}>{levelDec}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={this._keyExtractor}
          extraData={selectedLevel}
        />
      </View>
    );
  }
}
export default VerticalSelectView;
