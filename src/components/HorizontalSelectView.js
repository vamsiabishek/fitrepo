import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 10
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  lineContainer: {
    height: 3,
    borderTopWidth: 3,
    borderColor: "grey",
    width: 50
  },
  iconStyle: {
    height: 15,
    width: 15,
    backgroundColor: "grey",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  iconDataStyle: {
    height: 10,
    width: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  iconTextStyle: {
    fontSize: 9
  }
});

class HorizontalComponent extends React.Component {
  _keyExtractor = item => `key${item}`;

  render() {
    const { items, selectedItem, onSelectionChange } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          horizontal={true}
          renderItem={({ item, index }) => {
            let { iconStyle, iconDataStyle, iconTextStyle } = styles;
            console.log('iconStyle:', iconStyle);
            if (item === selectedItem) {
              iconStyle = {
                ...iconStyle,
                height: 20,
                width: 20,
                backgroundColor: "#00DB8D",
                borderRadius: 10,
              };
              iconDataStyle = {
                ...iconDataStyle,
                height: 12,
                width: 12,
              };
              iconTextStyle = {
                ...iconTextStyle,
                fontSize: 11,
              };
            }

            return (
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
                      <Text style={iconTextStyle}>{item}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
export default HorizontalComponent;