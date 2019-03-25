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
    marginLeft: 10,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    //elevation: 2
  },
  lineContainer: {
    height: 3,
    borderTopWidth: 3,
    borderColor: "grey",
    width: 50
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
            let iconSize = 16;
            let iconStyle = { color: "grey" };
            if (item === selectedItem) {
              iconSize = 20;
              iconStyle = { 
                color: "#00DB8D",
                //color: "#00db20"
              }
            }
            return (
              <View style={styles.subContainer}>
                {index !== 0 && <View style={styles.lineContainer} />}
                <TouchableOpacity
                  style={{ marginTop: 0 }}
                  onPress={() => onSelectionChange(item)}
                >
                  <Icon name="circle" size={iconSize} style={iconStyle} />
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
