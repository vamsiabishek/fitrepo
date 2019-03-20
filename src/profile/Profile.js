import React, { Component } from "react";
import {
  LayoutAnimation,
  ScrollView,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
  UIManager
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StarRating from "react-native-star-rating";
import ProgressCircle from "react-native-progress-circle";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import ImagePicker from "react-native-image-picker";
import { styles } from "../../assets/style/stylesProfileScreen";
import { f, database, storage } from "../common/FirebaseConfig";
import {
  GRADIENT_COLORS_ARRAY,
  ICON_SIZE,
  ICON_SIZE_MED,
  LEVEL_COLORS
} from "../common/Common";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uid: "",
      user: {},
      avatarSource: "",
      avatarChanged: false,
      levelColor: LEVEL_COLORS.BEG,
      starRating: 1.5,
      programCompletedPercent: 10, // Completion percent,
      goalCompletedPercent: 30,
      programChosen: "4-week program",
      goalChosen: "Fat-Loss"
    };
  }
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
    const { uid } = this.state;
    storage
      .ref("users/" + uid + "/img")
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
            .ref("users/" + uid + "/img")
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
    const { avatarSource, uid } = this.state;
    const extraProfilePic = {
      avatarSource
    };
    database
      .ref("users")
      .child(uid)
      .update(extraProfilePic)
      .then(() => {
        //console.log("Avatar Source: ", avatarSource);
        this.setState({
          avatarChanged: true
        });
      })
      .catch(error => {
        console.log("error while updating with profile pic url: ", error);
      });
  };
  forceUpdate = () => {
    //console.log("In force update !");
    const { uid } = this.state;
    database
      .ref("users")
      .child(uid)
      .once("value")
      .then(snapshot => {
        const userLoggedIn = snapshot.val();
        this.setState({
          user: userLoggedIn,
          avatarChanged: false
        });
      });
  };
  goToEditProfile = () => {
    const { navigate } = this.props.navigation;
    const { user } = this.state;
    navigate("EditProfile", {
      userLoggedIn: user
    });
    console.log("did navigate work ?");
  };
  componentDidMount = async () => {
    const currentUser = await f.auth().currentUser;
    this.setState({
      isLoading: true,
      uid: currentUser.uid
    });
    database
      .ref("users")
      .child(currentUser.uid)
      .once("value")
      .then(snapshot => {
        const userLoggedIn = snapshot.val();
        this.setState({
          user: userLoggedIn,
          isLoading: false
        });
        // Getting the Level Color to be used based on the user's Level.
        if (userLoggedIn.level === "Advanced") {
          this.setState({
            starRating: 5,
            levelColor: LEVEL_COLORS.ADV
          });
        } else if (userLoggedIn.level === "Intermediate") {
          this.setState({
            starRating: 3.5,
            levelColor: LEVEL_COLORS.INT
          });
        } else {
          this.setState({
            starRating: 1.5,
            levelColor: LEVEL_COLORS.BEG
          });
        }
      })
      .catch(error => {
        console.log(
          "error while fetching user details in componentDidMount of Profile:",
          error
        );
      });
  };
  render() {
    const {
      isLoading,
      avatarChanged,
      user,
      levelColor,
      starRating,
      programChosen,
      programCompletedPercent,
      goalChosen,
      goalCompletedPercent
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {isLoading && <ActivityIndicator />}
        {!isLoading && (
          <View style={styles.innerContainer}>
            <View style={styles.bannerHeaderContainer}>
              <View style={styles.bannerContainer}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={GRADIENT_COLORS_ARRAY}
                  style={styles.bannergradientStyle}
                >
                  <View style={styles.avatarContainer}>
                    {avatarChanged && (
                      <Avatar
                        size={100}
                        rounded
                        showEditButton
                        overlayContainerStyle={{ backgroundColor: "#636568" }}
                        source={{ uri: user.avatarSource }}
                        imageProps={{
                          backgroundColor: "#636568"
                        }}
                        renderPlaceholderContent={
                          <ActivityIndicator color="white" />
                        }
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
                        size={100}
                        rounded
                        showEditButton
                        overlayContainerStyle={{ backgroundColor: "#636568" }}
                        source={{ uri: user.avatarSource }}
                        imageProps={{
                          backgroundColor: "#636568"
                        }}
                        renderPlaceholderContent={
                          <ActivityIndicator color="white" />
                        }
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
                </LinearGradient>
              </View>
            </View>
            <View style={styles.profileBannerStyle}>
              <Text style={styles.profileBannerTitleStyle}>{user.name}</Text>
              <Text style={styles.profileBannerSubTitleStyle}>
                {user.username}
              </Text>
            </View>
            <View style={styles.profileSubBannerStyle}>
              <View style={styles.profileSubBannerBoxStyle}>
                <Icon
                  name="trophy-variant" // "medal"
                  size={ICON_SIZE}
                  color={levelColor}
                />
                <Text style={styles.profileBannerTextStyle}>Level</Text>
              </View>
              <View style={styles.profileSubBannerBoxStyle}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={starRating}
                  starSize={ICON_SIZE}
                  emptyStar="star-outline"
                  fullStar="star"
                  halfStar="star-half"
                  iconSet="MaterialCommunityIcons"
                  fullStarColor="#f8bf45"
                  emptyStarColor="#f8bf45"
                />
                <Text style={styles.profileBannerTextStyle}>Expertise</Text>
              </View>
              <View style={styles.profileSubBannerBoxStyle}>
                <Button
                  icon={
                    <Icon
                      name="account-edit"
                      size={ICON_SIZE}
                      color="#00DB8D"
                    />
                  }
                  buttonStyle={{
                    backgroundColor: "transparent"
                  }}
                  onPress={this.goToEditProfile}
                />

                <Text style={styles.profileBannerTextStyle}>Edit</Text>
              </View>
            </View>
            <ScrollView
              style={styles.scrollViewContainerStyle}
              contentContainerstyle={styles.viewContainer}
            >
              <View style={styles.boxesContainer}>
                <View style={styles.boxesStyle}>
                  <View style={styles.boxHeaderContainerView}>
                    <Icon
                      name="progress-check"
                      size={ICON_SIZE_MED}
                      style={styles.boxHeaderIconStyle}
                    />
                    <Text style={styles.boxHeaderTextStyle}>Progress</Text>
                  </View>
                  <View style={styles.boxContentRowContainerStyle}>
                    <ProgressCircle
                      percent={10}
                      radius={65}
                      borderWidth={8}
                      color="#00db8d"
                      shadowColor="#999" //"#6b6d72"
                      bgColor="#28292B"
                    >
                      <Avatar
                        rounded
                        size={100}
                        source={require("../../assets/images/edited-Vitruvian-Man.png")}
                        imageProps={{ resizeMode: "contain" }}
                        overlayContainerStyle={{
                          backgroundColor: "transparent" // "#28292B"
                        }}
                      />
                    </ProgressCircle>
                    <View style={styles.boxContentTextStyle}>
                      <Text style={styles.boxTextStyle}>
                        Current Weight: 60 kgs
                      </Text>
                      <Text style={styles.boxTextStyle}>
                        Target Weight: 54 kgs
                      </Text>
                      <Text style={styles.boxTextStyle}>
                        Ideal Weight: (47 - 58) kgs
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.boxesContainer}>
                <View style={styles.boxesStyle}>
                  <View style={styles.boxHeaderContainerView}>
                    <Icon
                      name="target"
                      size={ICON_SIZE_MED}
                      style={styles.boxHeaderIconStyle}
                    />
                    <Text style={styles.boxHeaderTextStyle}>Goal</Text>
                  </View>
                  <View style={styles.boxContentColumnContainerStyle}>
                    <View style={styles.boxContentGoalTextStyle}>
                      <Text style={styles.boxTextStyle}>
                        Program choosen: {programChosen}
                      </Text>
                      <ProgressBarAnimated
                        width={300}
                        value={programCompletedPercent}
                        backgroundColorOnComplete="#00DB8D"
                        backgroundColor="#00DB8D"
                      />
                    </View>
                    <View style={styles.boxContentGoalTextStyle}>
                      <Text style={styles.boxTextStyle}>
                        Goal choosen: {goalChosen}
                      </Text>
                      <ProgressBarAnimated
                        width={300}
                        value={goalCompletedPercent}
                        backgroundColorOnComplete="#00DB8D"
                        backgroundColor="#00DB8D"
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.boxesContainer}>
                <View style={styles.boxesStyle}>
                  <View style={styles.boxHeaderContainerView}>
                    <Icon
                      name="postage-stamp"
                      size={ICON_SIZE_MED}
                      style={styles.boxHeaderIconStyle}
                    />
                    <Text style={styles.boxHeaderTextStyle}>Posts</Text>
                  </View>
                  <View style={styles.boxContentColumnContainerStyle}>
                    <View style={styles.boxContentTextStyle}>
                      <Text style={styles.boxTextStyle}>
                        Post stuff comes here !
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}
