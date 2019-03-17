import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import CustomListViewRow from "./CustomListViewRow";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:8,
  }
});

class CustomListview extends React.Component {
  _keyExtractor = item => item.dietId;

  render() {
    const { diets, navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={diets}
          renderItem={({ item }) => (
            <CustomListViewRow item={item} navigation={navigation}/>
          )}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}
export default CustomListview;
