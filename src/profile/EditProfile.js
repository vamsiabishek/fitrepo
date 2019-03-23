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
import { database, storage } from "../common/FirebaseConfig";

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
      userId: navigation.getParam("userId"),
      avatarSource: "",
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
        console.log("Error while updating new user with details:", error);
      });
  };

  // randomNumberGenerator
  RNG = () =>
    Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1);
  uniqueImageId = () => {
    return (
      this.RNG() +
      this.RNG() +
      "-" +
      this.RNG() +
      "-" +
      this.RNG() +
      "-" +
      this.RNG() +
      "-" +
      this.RNG() +
      "-" +
      this.RNG()
    );
  };

  uploadImageClicked = () => {
    const uploadOptions = {
      title: "Select Photo",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(uploadOptions, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled Image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custon button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.uploadImage(response.uri, response.data);
        this.setState({
          avatarSource: source.uri
        });
        console.log(this.state.avatarSource);
      }
    });
  };

  uploadImage = async (uri, base64) => {
    let that = this;
    const fileExtension = uri.slice(uri.lastIndexOf(".") + 1);
    const imageId = that.uniqueImageId();
    const filePath = imageId + "." + fileExtension;
    const { userId } = this.state;
    storage
      .ref("users/" + userId + "/img")
      .child(filePath)
      .putString(base64, "base64", {
        contentType: "image/jpeg"
      })
      .on(
        "state_changed",
        snapshot => {
          console.log(
            "Progress: ",
            snapshot.bytesTransferred,
            snapshot.totalBytes
          );
        },
        error => {},
        () => {
          storage
            .ref("users/" + userId + "/img")
            .child(filePath)
            .getDownloadURL()
            .then(url => {
              console.log("download url:", url);
              this.setState({
                avatarSource: url
              });
              this.updateImageInDatabase();
              this.forceUpdate();
            });
        }
      );
  };

  updateImageInDatabase = () => {
    const { avatarSource, userId } = this.state;
    const extraProfilePic = {
      avatarSource
    };
    database
      .ref("users")
      .child(userId)
      .update(extraProfilePic)
      .then(() => {
        this.setState({
          avatarChanged: true
        });
      })
      .catch(error => {
        console.log("error while updating with profile pic url: ", error);
      });
  };

  forceUpdate = () => {
    console.log("In force update !");
    const { userId } = this.state;
    database
      .ref("users")
      .child(userId)
      .once("value")
      .then(snapshot => {
        const userLoggedIn = snapshot.val();
        this.setState({
          user: userLoggedIn,
          avatarChanged: false
        });
      });
  };

  render() {
    const { user, avatarChanged, selectedSubScreen } = this.state;
    const { navigate } = this.props.navigation;
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
              onPress={() => navigate("Profile")}
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
              //source={{ uri: user.avatarSource }}
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
              //source={{ uri: user.avatarSource }}
              imageProps={{
                backgroundColor: "#636568"
              }}
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
