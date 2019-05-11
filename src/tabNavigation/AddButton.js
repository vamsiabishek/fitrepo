import React from "react";
import { Animated, TouchableHighlight, View, Text } from "react-native";
import { f } from "../common/FirebaseConfig";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from 'react-navigation';

class AddButton extends React.Component {
  addNew = async () => {
    const { uid } = await f.auth().currentUser;
    const { navigation } = this.props;
    navigation.navigate("Signup", {
      isExistingUser: true,
      uid
    })
  }
  render() {
    const SIZE = 80;
    return (
      <View
        style={{
          position: "absolute",
          alignItems: "center"
        }}
      >
        <TouchableHighlight
          onPress={() => this.addNew()}
          underlayColor="#2882D8"
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            backgroundColor: "#48A2F8"
          }}
        >
          <Icon name="plus" size={28} color="#F8F8F8" />
        </TouchableHighlight>
      </View>
    );
  }
}
// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(AddButton)
