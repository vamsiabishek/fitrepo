import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  UIManager,
  View,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import { Button, Avatar } from "react-native-elements";
import { styles } from "../../assets/style/stylesEditProfileScreen";
import EditProfileSubScreen1 from "./EditProfileSubScreen1";
import { ICON_SIZE, GRADIENT_BG_IMAGE } from "../common/Common";
import { database, storage } from "../common/FirebaseConfig";
import {
  styleCommon,
  ICON_BACK_SIZE
} from "../../assets/style/stylesCommonValues";

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
  setSubScreen1UserVals = setUserPartial => {
    // progress
    this.updateUserProfile(setUserPartial); // (subScreen2 = false));
    // this.changeSelectedSubScreen(progress);
  };
  setSubScreen2UserVals = setUserPartial => {
    this.updateUserProfile(setUserPartial);
  };
  updateUserProfile = async setUserPartial => {
    // subScreen2 = true
    const { userId, user } = this.state;
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const haveNavigated = true;
    const updateUserOnProfile = navigation.getParam("updateProfileCall");
    database
      .ref("users")
      .child(userId)
      .update(setUserPartial)
      .then(() => {
        console.log("Successfully updated existing user with details");
        this.setState({
          user: { ...user, ...setUserPartial }
        });
        updateUserOnProfile(setUserPartial, haveNavigated);
        // if (subScreen2 === true) {
        navigate("Profile");
        // }
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
      <ImageBackground source={GRADIENT_BG_IMAGE} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior="padding"
          enabled
        >
          <View style={styles.profileButtonHeaderContainer}>
            <Button
              icon={{
                size: ICON_BACK_SIZE,
                type: "material-community",
                name: "arrow-left-thick",
                color: styleCommon.textColor1
              }}
              containerStyle={styles.profileButtonContainerStyle}
              buttonStyle={styles.profileButtonStyle}
              titleStyle={styles.profileButtonTitleStyle}
              onPress={() => navigate("Profile")}
            />
          </View>
          <View style={styles.avatarContainer}>
            {avatarChanged && (
              <Avatar
                size={120}
                rounded
                showEditButton
                overlayContainerStyle={{ backgroundColor: "#636568" }}
                icon={{
                  type: "material-community",
                  name: "chess-bishop",
                  color: styleCommon.textColor2
                }}
                //source={{ uri: user.avatarSource }}
                imageProps={styles.avatarImagePropsStyle}
                renderPlaceholderContent={<ActivityIndicator color="white" />}
                editButton={{
                  type: "material-community",
                  name: "pencil",
                  color: styleCommon.textColor2,
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
                icon={{
                  type: "material-community",
                  name: "chess-bishop",
                  color: styleCommon.textColor2
                }}
                //source={{ uri: user.avatarSource }}
                //imageProps={styles.avatarImagePropsStyle}
                editButton={{
                  type: "material-community",
                  name: "pencil",
                  color: styleCommon.textColor2,
                  style: { backgroundColor: "#636568" },
                  size: ICON_SIZE
                }}
                // onEditPress={this.uploadImageClicked}
              />
            )}
          </View>
          <View style={styles.subScreenContainer}>
            <EditProfileSubScreen1
              userDets={user}
              onScreenChange={this.changeSelectedSubScreen}
              setSubScreenUserVals={this.setSubScreen1UserVals}
            />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
