import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import CustomListViewRow from "./CustomListViewRow";
import { styles } from "../../assets/style/stylesCustomListView";

class CustomListview extends React.Component {
  _keyExtractor = item => item.key;

  render() {
    const { diets, navigation, uid } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={diets}
          renderItem={({ item }) => (
            <CustomListViewRow uid={uid} item={item} navigation={navigation} />
          )}
          keyExtractor={this._keyExtractor}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  }
}
export default CustomListview;
