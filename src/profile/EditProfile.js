import React, { Component } from "react";
import {
  ActivityIndicator,
  StatusBar,
  Text,
  UIManager,
  View
} from "react-native";
import { Button, Avatar } from "react-native-elements";
import { styles } from "../../assets/style/stylesEditProfileScreen";
import EditProfileSubScreen1 from "./EditProfileSubScreen1";
import EditProfileSubScreen2 from "./EditProfileSubScreen2";
import { ICON_SIZE } from "../common/Common";
import { f, database, storage } from "../common/FirebaseConfig";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      isLoading: false,
      user: navigation.getParam("userLoggedIn"),
      avatarChanged: false,
      selectedSubScreen: 1,
      subScreens: 2
    };
  }
  changeSelectedSubScreen = progress => {
    const { selectedSubScreen, subScreens } = this.state;
    const nextScreen = progress ? selectedSubScreen + 1 : selectedSubScreen - 1;
    if (nextScreen > 0 && nextScreen <= subScreens) {
      this.setState({
        selectedSubScreen: nextScreen
      });
    }
  };
  setSubScreen1UserVals = (userNew, progress) => {
    this.updateUserProfile(userNew, (subScreen2 = false));
    this.changeSelectedSubScreen(progress);
  };
  setSubScreen2UserVals = userNew => {
    this.updateUserProfile(userNew);
  };
  updateUserProfile = async (userNew, subScreen2 = true) => {
    const { navigate } = this.props.navigation;
    const currentUser = await f.auth().currentUser;
    database
      .ref("users")
      .child(currentUser.uid)
      .update(userNew)
      .then(() => {
        //console.log("Successfully updated existing user with details");
        if (subScreen2 === true) {
          navigate("Profile");
        }
      })
      .catch(error => {
        //console.log("error while updating new user with details:", error);
      });
  };
  render() {
    const { user, avatarChanged, selectedSubScreen } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.profileButtonHeaderContainer}>
          <View style={styles.profileButtonContainer}>
            <Button
              title="CANCEL"
              containerStyle={styles.profileButtonContainerStyle}
              buttonStyle={styles.profileButtonStyle}
              titleStyle={styles.profileButtonTitleStyle}
              onPress={() => this.props.navigation.navigate("Profile")}
            />
          </View>
        </View>
        <View style={styles.avatarContainer}>
          {avatarChanged && (
            <Avatar
              size={120}
              rounded
              showEditButton
              overlayContainerStyle={{ backgroundColor: "#636568" }}
              source={{ uri: user.avatarSource }}
              imageProps={{
                backgroundColor: "#636568"
              }}
              renderPlaceholderContent={<ActivityIndicator color="white" />}
              editButton={{
                type: "material-community",
                name: "pencil-outline",
                color: "white",
                style: { backgroundColor: "#636568" },
                size: ICON_SIZE
              }}
              onEditPress={this.uploadImageClicked}
            />
          )}
          {!avatarChanged && (
            <Avatar
              size={120}
              rounded
              showEditButton
              overlayContainerStyle={{ backgroundColor: "#636568" }}
              source={{ uri: user.avatarSource }}
              imageProps={{
                backgroundColor: "#636568"
              }}
              renderPlaceholderContent={<ActivityIndicator color="white" />}
              editButton={{
                type: "material-community",
                name: "pencil-outline",
                color: "white",
                style: { backgroundColor: "#636568" },
                size: ICON_SIZE
              }}
              onEditPress={this.uploadImageClicked}
            />
          )}
        </View>
        <View style={styles.subScreenContainer}>
          {selectedSubScreen === 1 && (
            <EditProfileSubScreen1
              userDets={user}
              onScreenChange={this.changeSelectedSubScreen}
              setSubScreenUserVals={this.setSubScreen1UserVals}
            />
          )}
          {selectedSubScreen === 2 && (
            <EditProfileSubScreen2
              userDets={user}
              setSubScreenUserVals={this.setSubScreen2UserVals}
            />
          )}
        </View>
      </View>
    );
  }
}
