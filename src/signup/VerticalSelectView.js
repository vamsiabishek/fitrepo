import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  container: {
    //marginTop: 5,
    //marginLeft: 10
  },
  subContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  lineContainer: {
    height: 50,
    borderLeftWidth: 3,
    borderColor: "#d1feff",
    width: 50,
    marginLeft: 45
  },
  iconStyle: {
    height: 120,
    width: 120,
    backgroundColor: "#d1feff",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  iconDataStyle: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  iconTextStyle: {
    fontSize: 70
  }
});

class VerticalSelectView extends React.Component {
  _keyExtractor = item => `key${item}`;

  render() {
    const { items, selectedItem, onSelectionChange } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item, index }) => {
            let { iconStyle, iconDataStyle, iconTextStyle } = styles;
            console.log("iconStyle:", iconStyle);
            if (item === selectedItem) {
              iconStyle = {
                ...iconStyle,
                height: 20,
                width: 20,
                backgroundColor: "#00DB8D",
                borderRadius: 10
              };
              iconDataStyle = {
                ...iconDataStyle,
                height: 12,
                width: 12
              };
              iconTextStyle = {
                ...iconTextStyle,
                fontSize: 11
              };
            }
            let levelImage = require("../../assets/images/men_beginner_1.png");
            let levelTitle = "Beginner"
            if (index === 1){
              levelImage = require("../../assets/images/men_intermediate.png");
              levelTitle = "Intermediate"
            }
            else if (index === 2){
              levelImage = require("../../assets/images/fitness_advanced.png");
              levelTitle = "Advanced"
            }

            return (
              <View style={{ flex:1, flexDirection: "row" }}>
                <View style={styles.subContainer}>
                  {index !== 0 && <View style={styles.lineContainer} />}
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={() => onSelectionChange(item)}
                  >
                    <View style={iconStyle}>
                      <View style={iconDataStyle}>
                        <Image
                          source={levelImage}
                          style={{ width: 60, height: 80, tintColor: "black" }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{justifyContent:"center", alignItems:"center", marginLeft:10}}>
                  <Text>{levelTitle}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={this._keyExtractor}
          extraData={selectedItem}
        />
      </View>
    );
  }
}
export default VerticalSelectView;
