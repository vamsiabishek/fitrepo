import React, { Component } from "react";
import {
  Animated,
  ImageBackground,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  UIManager,
  Image
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProgressCircle from "react-native-progress-circle";
import { styles } from "../../assets/style/stylesProfileScreen";
import { database } from "../common/FirebaseConfig";
import {
  convertLevelToStarRating,
  convertLevelToLevelColor,
  PROGRESS_CIRCLE_RADIUS,
  PROGRESS_CIRCLE_BORDER_WIDTH,
  GRADIENT_BG_IMAGE,
  VITRUVIAN_MAN,
  MALE_BEGINNER_ICON,
  MALE_INTERMEDIATE_ICON,
  MALE_ADVANCED_ICON,
  FEMALE_BEGINNER_ICON,
  FEMALE_INTERMEDIATE_ICON,
  FEMALE_ADVANCED_ICON,
  BEGINNER_LABEL,
  INTERMEDIATE_LABEL,
  ADVANCED_LABEL
} from "../common/Common";
import {
  styleCommon,
  ICON_SIZE,
  ICON_SIZE_MED,
  ICON_SIZE_LARGE,
  ICON_BACK_SIZE,
  AVATAR_SIZE
} from "../../assets/style/stylesCommonValues";
import {
  getCurrentUser,
  signOutUser,
  createKeyAndValuesFromResult,
  getDifferenceInSeconds
} from "../common/Util";
import PurchaseList from "../components/purchase/PurchaseList";

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
      entitlements: undefined,
      currentDiet: undefined
    };
    this.profileHeaderScrollY = new Animated.Value(1);
    this.profileHeaderExpandedHeight = styles.bannerContainer.height; // calculated by onLayout
    this.profileHeaderCollapsedHeight = 0;
  }

  goToEditProfile = () => {
    const { navigate } = this.props.navigation;
    const { user, uid } = this.state;
    navigate("EditProfile", {
      userLoggedIn: user,
      userId: uid,
      updateProfileCall: this.updateProfileCall
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

  logoutUser = async () => {
    const logoutSuccessful = await signOutUser();
    if (logoutSuccessful) {
      const { navigate } = this.props.navigation;
      navigate("Login");
    }
  };

  componentDidMount = async () => {
    const currentUser = await getCurrentUser();
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
    let myDiets = [];
    await database
      .ref(`diets/${currentUser.uid}`)
      .orderByChild("createdDate")
      .once("value")
      .then(snap => {
        if (snap.val()) {
          const results = snap.val();
          myDiets = createKeyAndValuesFromResult(results).reverse();
          let currentDiet = myDiets[0];
          this.setState({ currentDiet });
        }
      })
      .catch(error => {
        console.log("error while fetching my diets in SignUp page", error);
      });
  };
  render() {
    const { isLoading, avatarChanged, user, currentDiet } = this.state;
    const { gender, fitnessLevel } = user;
    let levelColor = convertLevelToLevelColor(user.level);
    let starRating = convertLevelToStarRating(user.level);
    let levelImage = gender === 1 ? MALE_BEGINNER_ICON : FEMALE_BEGINNER_ICON;
    let levelTitle = BEGINNER_LABEL;
    if (fitnessLevel === 2) {
      levelImage =
        gender === 1 ? MALE_INTERMEDIATE_ICON : FEMALE_INTERMEDIATE_ICON;
      levelTitle = INTERMEDIATE_LABEL;
    } else if (fitnessLevel === 3) {
      levelImage = gender === 1 ? MALE_ADVANCED_ICON : FEMALE_ADVANCED_ICON;
      levelTitle = ADVANCED_LABEL;
    }

    const profileHeaderHeight = this.profileHeaderScrollY.interpolate({
      inputRange: [0, this.profileHeaderExpandedHeight - 100],
      outputRange: [
        this.profileHeaderExpandedHeight,
        this.profileHeaderCollapsedHeight
      ],
      extrapolate: "clamp"
    });
    const noOfSecondsGoneInProgram = currentDiet
      ? getDifferenceInSeconds(currentDiet.value.createdDate)
      : undefined;
    const getPercent = currentDiet
      ? Math.floor(
          (noOfSecondsGoneInProgram /
            (currentDiet.value.selectedProgram * 7 * 24 * 3600)) *
            100
        )
      : undefined;
    return (
      <ImageBackground source={GRADIENT_BG_IMAGE} style={styles.mainContainer}>
        {isLoading ? (
          <ActivityIndicator color={styleCommon.textColor1} size="large" />
        ) : (
          <View style={styles.innerContainer}>
            <View style={styles.actionsHeaderContainer}>
              <View style={styles.actionsButtonContainerStyle}>
                <Button
                  icon={{
                    name: "account-edit",
                    size: ICON_BACK_SIZE,
                    color: styleCommon.secondaryButtonTextColor,
                    type: "material-community"
                  }}
                  containerStyle={styles.actionsButtonStyle}
                  buttonStyle={styles.actionsButtonStyle}
                  titleStyle={styles.actionsButtonTitleStyle}
                  onPress={this.goToEditProfile}
                />
                <Button
                  icon={{
                    name: "logout",
                    size: ICON_BACK_SIZE,
                    color: styleCommon.secondaryButtonTextColor,
                    type: "material-community"
                  }}
                  iconRight={true}
                  containerStyle={styles.actionsButtonStyle}
                  buttonStyle={styles.actionsButtonStyle}
                  titleStyle={styles.actionsButtonTitleStyle}
                  onPress={this.logoutUser}
                />
              </View>
            </View>
            <ScrollView
              style={styles.scrollViewContainerStyle}
              contentContainerstyle={styles.scrollViewContentContainer}
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: {
                      y: this.profileHeaderScrollY
                    }
                  }
                }
              ])}
              scrollEventThrottle={16}
            >
              <View style={styles.avatarContainer}>
                <Avatar
                  size={AVATAR_SIZE}
                  rounded
                  overlayContainerStyle={styles.avatarOverlayContainerStyle}
                  icon={{
                    type: "material-community",
                    name: "chess-bishop",
                    color: styleCommon.textColor2
                  }}
                  //source={{ uri: user.avatarSource }}
                  //imageProps={styles.avatarImagePropsStyle}
                />
              </View>
              <View style={styles.profileBannerStyle}>
                <Text style={styles.profileBannerTitleStyle}>{user.name}</Text>
                <Text style={styles.profileBannerSubTitleStyle}>
                  {user.username}
                </Text>
              </View>
              <View style={styles.profileSubBannerStyle}>
                <View style={styles.profileSubBannerBoxStyle}>
                  <Image
                    source={levelImage}
                    style={{
                      width: 30,
                      height: 38,
                      tintColor: styleCommon.selectedButtonColor
                    }}
                  />
                  <Text style={styles.profileBannerTextStyle}>
                    {levelTitle}
                  </Text>
                </View>
              </View>
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
                      percent={getPercent ? getPercent : 0}
                      radius={PROGRESS_CIRCLE_RADIUS}
                      borderWidth={PROGRESS_CIRCLE_BORDER_WIDTH}
                      color={styles.progressCircleColor.color}
                      shadowColor={styles.progressCircleShadowColor.color}
                      bgColor={styles.progressCircleBgColor.color}
                    >
                      <Avatar
                        rounded
                        size={AVATAR_SIZE}
                        source={VITRUVIAN_MAN}
                        imageProps={{
                          resizeMode: "contain",
                          tintColor: styleCommon.textColor1
                        }}
                        overlayContainerStyle={styles.avatarHumanOverlayStyle}
                      />
                    </ProgressCircle>
                    <View style={styles.boxContentTextStyle}>
                      <Text style={styles.boxTextStyle}>
                        Current Weight: {user.weight} kgs
                      </Text>
                      <Text style={styles.boxTextStyle}>
                        Target Weight:{" "}
                        {currentDiet && currentDiet.value.targetWeight} kgs
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.boxesContainer}>
                <View style={styles.boxesStyle}>
                  <View style={styles.boxHeaderContainerView}>
                    <Icon
                      name="cards"
                      size={ICON_SIZE_MED}
                      style={styles.boxHeaderIconStyle}
                    />
                    <Text style={styles.boxHeaderTextStyle}>Past Payments</Text>
                  </View>
                  <View style={styles.boxContentColumnContainerStyle}>
                    <View style={styles.boxContentTextStyle}>
                      <PurchaseList purchases={user.purchases} />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </ImageBackground>
    );
  }
}
