import React from "react";
import { Animated, TouchableHighlight, View, Alert } from "react-native";
import { f, database } from "../common/FirebaseConfig";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from "react-navigation";
import { createKeyAndValuesFromResult } from "../common/Util";

class AddButton extends React.Component {
  addNew = async () => {
    const { uid } = await f.auth().currentUser;
    let latestDiet = {};
    await database
      .ref(`diets/${uid}`)
      .orderByChild("createdDate")
      .limitToLast(1)
      .once("value")
      .then(snap => {
        const results = snap.val();
        latestDiet = createKeyAndValuesFromResult(results)[0];
      })
      .catch(error => {
        console.log(error);
      });
    const { createdDate, selectedGoal, selectedProgram } = latestDiet.value;
    const fromDate = new Date(createdDate);
    const diffInMilliSecs = new Date().getTime() - fromDate.getTime();
    const total_seconds = parseInt(Math.floor(diffInMilliSecs / 1000));
    const total_minutes = parseInt(Math.floor(total_seconds / 60));
    const total_hours = parseInt(Math.floor(total_minutes / 60));
    const days = parseInt(Math.floor(total_hours / 24));
    if (days <= selectedProgram * 7) {
      Alert.alert(
        "Create diet confirmation !",
        `You are curently active on ${selectedProgram} Week diet, are you sure about creating new diet ?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Continue", onPress: () => this.navigateToCreateDiet(uid) }
        ],
        { cancelable: false }
      );
    } else {
      this.navigateToCreateDiet();
    }
  };
  navigateToCreateDiet = uid => {
    const { navigation } = this.props;
    navigation.navigate("Signup", {
      isExistingUser: true,
      uid
    });
  };
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
export default withNavigation(AddButton);
