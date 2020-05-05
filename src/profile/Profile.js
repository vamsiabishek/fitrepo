import React, {Component} from 'react';
import {
  Animated,
  Text,
  View,
  ActivityIndicator,
  UIManager,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../assets/style/stylesProfileScreen';
import {
  MALE_BEGINNER_ICON,
  MALE_INTERMEDIATE_ICON,
  MALE_ADVANCED_ICON,
  FEMALE_BEGINNER_ICON,
  FEMALE_INTERMEDIATE_ICON,
  FEMALE_ADVANCED_ICON,
  BEGINNER_LABEL,
  INTERMEDIATE_LABEL,
  ADVANCED_LABEL,
  CONTACT_US_ICON,
  PURCHASES_ICON,
  EDIT_PROFILE_ICON,
} from '../common/Common';
import {
  SCREEN_WIDTH,
  styleCommon,
  ICON_SIZE_MED,
  ICON_BACK_SIZE,
  ICON_SIZE_SMALL,
} from '../../assets/style/stylesCommonValues';
import {signOutUser, sortByDate} from '../common/Util';
import SelectButton from '../components/SelectButton';
import ContactUs from './ContactUs';
import MyPurchases from './MyPurchases';
import api from '../common/Api';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uid: '',
      user: {},
      avatarSource: '',
      avatarChanged: false,
      entitlements: undefined,
      currentDiet: undefined,
      myDiets: [],
      showContactUs: false,
      showPurchases: false,
    };
    this.profileHeaderScrollY = new Animated.Value(1);
    this.profileHeaderExpandedHeight = styles.bannerContainer.height; // calculated by onLayout
    this.profileHeaderCollapsedHeight = 0;
  }

  goToEditProfile = () => {
    const {navigate} = this.props.navigation;
    const {user, uid} = this.state;
    navigate('EditProfile', {
      userLoggedIn: user,
      userId: uid,
      updateProfileCall: this.updateProfileCall,
    });
  };
  updateProfileCall = (recievedData, haveNavigated = false) => {
    const {user} = this.state;
    if (haveNavigated === true) {
      this.setState({
        user: {...user, ...recievedData},
      });
    } else {
      this.setState({
        user: recievedData,
        isLoading: false,
      });
    }
  };

  logoutUser = () => {
    this.setState({isLoading: true});
    const logoutSuccessful = signOutUser();
    if (logoutSuccessful) {
      const {navigate} = this.props.navigation;
      navigate('Login');
    }
  };

  showSettings = () => {
    const {navigate} = this.props.navigation;
    const {user, uid} = this.state;
    navigate('Settings', {
      userLoggedIn: user,
      userId: uid,
    });
  };

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    });
    const userLoggedIn = await api.get('/getLoggedInUser');
    console.log('logged in user', userLoggedIn);
    let myDiets = userLoggedIn.diets || [];
    myDiets = sortByDate(myDiets, 'createdDate');
    this.updateProfileCall(userLoggedIn);

    // let myDiets = userLoggedIn.diets || [];
    // myDiets = sortByDate(myDiets, 'createdDate');
    let currentDiet = myDiets[0];
    this.setState({currentDiet, myDiets});
  };
  closeContactUs = () => this.setState({showContactUs: false});
  closeMyPurchases = () => this.setState({showPurchases: false});
  render() {
    const {
      isLoading,
      user = {},
      currentDiet,
      showContactUs,
      showPurchases,
      myDiets,
    } = this.state;
    const {
      gender,
      fitnessLevel,
      name,
      username,
      weight,
      phoneNumber,
      firebase,
      email,
      provider,
    } = user || {};
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
    let profileAvatar =
      gender === 1
        ? require('../../assets/jsons/male_profile_avatar.json')
        : require('../../assets/jsons/female_profile_avatar.json');
    const imageStyle = {
      width: SCREEN_WIDTH * 0.15,
      height: SCREEN_WIDTH * 0.15,
      //tintColor: styleCommon.selectedButtonColor,
    };
    // console.log('user: ', user);
    return (
      <View style={styles.mainContainer}>
        {isLoading ? (
          <ActivityIndicator color={styleCommon.textColor1} size="large" />
        ) : (
          <View style={styles.innerContainer}>
            <View style={styles.actionsHeaderContainer}>
              <View style={styles.actionsButtonContainerStyle}>
                <Button
                  icon={{
                    name: 'settings',
                    size: ICON_BACK_SIZE,
                    color: styleCommon.headerTitleColor,
                    type: 'material-community',
                  }}
                  iconRight={true}
                  containerStyle={styles.actionsButtonStyle}
                  buttonStyle={styles.actionsButtonStyle}
                  titleStyle={styles.actionsButtonTitleStyle}
                  onPress={this.showSettings}
                />
                <Button
                  icon={{
                    name: 'logout',
                    size: ICON_BACK_SIZE,
                    color: styleCommon.headerTitleColor,
                    type: 'material-community',
                  }}
                  iconRight={true}
                  containerStyle={styles.actionsButtonStyle}
                  buttonStyle={styles.actionsButtonStyle}
                  titleStyle={styles.actionsButtonTitleStyle}
                  onPress={this.logoutUser}
                />
              </View>
            </View>
            <Animated.ScrollView
              style={styles.scrollViewContainerStyle}
              contentContainerstyle={styles.scrollViewContentContainer}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.profileHeaderScrollY,
                      },
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              scrollEventThrottle={16}>
              <Text style={styles.profileBannerHeaderTitleStyle}>{name}</Text>
              <View style={styles.avatarContainer}>
                <LottieView
                  source={profileAvatar}
                  autoPlay
                  loop
                  style={styles.avatarAnimationStyle}
                  enableMergePathsAndroidForKitKatAndAbove
                />
              </View>
              <View style={styles.profileBannerStyle}>
                {phoneNumber && (
                  <Text style={styles.profileBannerSubTitleStyle}>
                    {phoneNumber}
                  </Text>
                )}
                {(firebase && firebase.sign_in_provider && email) ||
                  (provider && email && (
                    <Text style={styles.profileBannerSubTitleStyle}>
                      {email}
                    </Text>
                  ))}
                {username && (
                  <Text style={styles.profileBannerTitleStyle}>{username}</Text>
                )}
              </View>
              <View style={styles.profileSubBannerStyle}>
                <SelectButton
                  containerStyle={styles.subHeaderButtonContainerStyle}
                  buttonStyle={styles.subHeaderButtonStyle}
                  titleStyle={styles.subHeaderButtonTitle}
                  title="Edit"
                  iconSize={ICON_SIZE_MED}
                  iconName="scale-bathroom"
                  buttonIcon={styles.buttonIcon}
                  //iconRight={true}
                  onPress={this.goToEditProfile}
                  iconImageStyle={styles.iconImageStyle}
                  shouldUseImage={true}
                  imageUrl={EDIT_PROFILE_ICON}
                />
                <SelectButton
                  containerStyle={styles.subHeaderButtonContainerStyle}
                  buttonStyle={styles.subHeaderButtonStyle}
                  titleStyle={styles.subHeaderButtonTitle}
                  title="Purchases"
                  iconSize={ICON_SIZE_MED}
                  iconName="scale-bathroom"
                  buttonIcon={styles.buttonIcon}
                  //iconRight={true}
                  onPress={() => {
                    this.setState({showPurchases: true});
                  }}
                  iconImageStyle={styles.iconImageStyle}
                  shouldUseImage={true}
                  imageUrl={PURCHASES_ICON}
                />
                <SelectButton
                  containerStyle={styles.subHeaderButtonContainerStyle}
                  buttonStyle={styles.subHeaderButtonStyle}
                  titleStyle={styles.subHeaderButtonTitle}
                  title="Contact Us"
                  iconSize={ICON_SIZE_MED}
                  iconName="scale-bathroom"
                  buttonIcon={styles.buttonIcon}
                  //iconRight={true}
                  onPress={() => {
                    this.setState({showContactUs: true});
                  }}
                  iconImageStyle={styles.iconImageStyle}
                  shouldUseImage={true}
                  imageUrl={CONTACT_US_ICON}
                />
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
                    <View style={styles.profileSubBannerBoxStyle}>
                      <Image source={levelImage} style={imageStyle} />
                      <Text style={styles.profileBannerTextStyle}>
                        {levelTitle}
                      </Text>
                    </View>
                    <View style={styles.boxContentTextStyle}>
                      <View style={styles.boxTextContainer}>
                        <Icon
                          name="weight-kilogram"
                          size={ICON_SIZE_SMALL}
                          color="#4CAF50"
                          style={styles.weightIconStyle}
                        />
                        <Text style={styles.boxTextStyle}>
                          Current Weight: {weight} kgs
                        </Text>
                      </View>
                      <View style={styles.boxTextContainer}>
                        <Icon
                          name="bullseye-arrow"
                          size={ICON_SIZE_SMALL}
                          color="#4CAF50"
                          style={styles.weightIconStyle}
                        />
                        <Text style={styles.boxTextStyle}>
                          Target Weight:{' '}
                          {currentDiet && currentDiet.targetWeight} kgs
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Animated.ScrollView>
            <ContactUs
              showContactUs={showContactUs}
              onCancel={this.closeContactUs}
            />
            <MyPurchases
              showPurchases={showPurchases}
              onCancel={this.closeMyPurchases}
              diets={myDiets}
            />
          </View>
        )}
      </View>
    );
  }
}
