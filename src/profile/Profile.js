import React, { Component } from "react";
import {
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
import { styles } from "../../assets/style/stylesProfileScreen";
import { f, database } from "../common/FirebaseConfig";
import {
  GRADIENT_COLORS_ARRAY,
  AVATAR_SIZE,
  ICON_SIZE,
  ICON_SIZE_MED,
  STAR_RATING_MAX,
  PROGRESS_BAR_WIDTH,
  PROGRESS_CIRCLE_RADIUS,
  PROGRESS_CIRCLE_BORDER_WIDTH
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
      programCompletedPercent: 10, // Completion percent,
      goalCompletedPercent: 30,
      programChosen: "4-week program",
      goalChosen: "Fat-Loss"
    };
  }

  goToEditProfile = () => {
    const { navigate } = this.props.navigation;
    const { user, uid } = this.state;
    navigate("EditProfile", {
      userLoggedIn: user,
      userId: uid,
      updateProfile: this.updateProfileCall
    });
  };

  updateProfileCall = (recievedData, haveNavigated = false) => {
    const { user } = this.state;
    if (haveNavigated === true) {
      this.setState({
        user: { ...user, ...recievedData }
      });
    } else {
      this.setState({
        user: recievedData,
        isLoading: false
      });
    }
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
        this.updateProfileCall(userLoggedIn);
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
                    <Avatar
                      size={AVATAR_SIZE}
                      rounded
                      overlayContainerStyle={styles.avatarOverlayContainerStyle}
                      icon={{
                        type: "material-community",
                        name: "chess-bishop",
                        color: "white"
                      }}
                      //source={{ uri: user.avatarSource }}
                      imageProps={styles.avatarImagePropsStyle}
                    />
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
                  color={user.levelColor}
                />
                <Text style={styles.profileBannerTextStyle}>Level</Text>
              </View>
              <View style={styles.profileSubBannerBoxStyle}>
                <StarRating
                  disabled={false}
                  maxStars={STAR_RATING_MAX}
                  rating={user.starRating}
                  starSize={ICON_SIZE}
                  emptyStar="star-outline"
                  fullStar="star"
                  halfStar="star-half"
                  iconSet="MaterialCommunityIcons"
                  fullStarColor={styles.profileStarColor.color}
                  emptyStarColor={styles.profileStarColor.color}
                />
                <Text style={styles.profileBannerTextStyle}>Expertise</Text>
              </View>
              <View style={styles.profileSubBannerBoxStyle}>
                <Button
                  icon={
                    <Icon
                      name="account-edit"
                      size={ICON_SIZE}
                      style={styles.profileButtonIconStyle}
                    />
                  }
                  buttonStyle={styles.profileButtonStyle}
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
                      radius={PROGRESS_CIRCLE_RADIUS}
                      borderWidth={PROGRESS_CIRCLE_BORDER_WIDTH}
                      color={styles.progressCircleColor.color}
                      shadowColor={styles.progressCircleShadowColor.color}
                      bgColor={styles.progressCircleBgColor.color}
                    >
                      <Avatar
                        rounded
                        size={AVATAR_SIZE}
                        source={require("../../assets/images/edited-Vitruvian-Man.png")}
                        imageProps={{ resizeMode: "contain" }}
                        overlayContainerStyle={styles.avatarHumanOverlayStyle}
                      />
                    </ProgressCircle>
                    <View style={styles.boxContentTextStyle}>
                      <Text style={styles.boxTextStyle}>
                        Current Weight: {user.weight} kgs
                      </Text>
                      <Text style={styles.boxTextStyle}>
                        Target Weight: 75 kgs
                      </Text>
                      <Text style={styles.boxTextStyle}>
                        Ideal Weight: (60 - 80) kgs
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
                        width={PROGRESS_BAR_WIDTH}
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
                        width={PROGRESS_BAR_WIDTH}
                        value={goalCompletedPercent}
                        backgroundColorOnComplete={
                          styles.progressBarBgColorComplete.color
                        }
                        backgroundColor={styles.progressBarBgColor.color}
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
