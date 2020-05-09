import React, {Component} from 'react';
import {KeyboardAvoidingView, Platform, UIManager, View} from 'react-native';
import {Button} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import {styles} from '../../assets/style/stylesEditProfileScreen';
import EditProfileSubScreen1 from './EditProfileSubScreen1';
import {
  styleCommon,
  ICON_BACK_SIZE,
} from '../../assets/style/stylesCommonValues';
import api from '../common/Api';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      isLoading: false,
      user: navigation.getParam('userLoggedIn'),
      userId: navigation.getParam('userId'),
      avatarSource: '',
      avatarChanged: false,
      selectedSubScreen: 1,
      subScreens: 2,
    };
  }
  changeSelectedSubScreen = (progress) => {
    const {selectedSubScreen, subScreens} = this.state;
    const nextScreen = progress ? selectedSubScreen + 1 : selectedSubScreen - 1;
    if (nextScreen > 0 && nextScreen <= subScreens) {
      this.setState({
        selectedSubScreen: nextScreen,
      });
    }
  };
  setSubScreen1UserVals = (setUserPartial) => {
    // progress
    this.updateUserProfile(setUserPartial); // (subScreen2 = false));
    // this.changeSelectedSubScreen(progress);
  };
  setSubScreen2UserVals = (setUserPartial) => {
    this.updateUserProfile(setUserPartial);
  };
  updateUserProfile = async (setUserPartial) => {
    const {user} = this.state;
    const {navigation} = this.props;
    const {navigate} = navigation;
    const haveNavigated = true;
    this.setState({isLoading: true});
    const updateUserOnProfile = navigation.getParam('updateProfileCall');
    const updateUser = await api.post('/updateUser', setUserPartial);
    this.setState({
      user: {...user, ...setUserPartial},
      isLoading: false,
    });
    updateUserOnProfile(setUserPartial, haveNavigated);
    navigate('Profile');
  };

  render() {
    const {user, isLoading} = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.contactUsAnimationContainer}>
            <LottieView
              resizeMode="contain"
              source={require('../../assets/jsons/saving_profile_animation.json')}
              autoPlay
              loop
              enableMergePathsAndroidForKitKatAndAbove
            />
          </View>
        ) : (
          <KeyboardAvoidingView
            style={styles.innerContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled>
            <View style={styles.profileButtonHeaderContainer}>
              <Button
                icon={{
                  size: ICON_BACK_SIZE,
                  type: 'material-community',
                  name: 'arrow-left-thick',
                  color: styleCommon.headerTitleColor,
                }}
                containerStyle={styles.profileButtonContainerStyle}
                buttonStyle={styles.profileButtonStyle}
                titleStyle={styles.profileButtonTitleStyle}
                onPress={() => navigate('Profile')}
              />
            </View>
            <View style={styles.subScreenContainer}>
              <EditProfileSubScreen1
                userDets={user}
                onScreenChange={this.changeSelectedSubScreen}
                setSubScreenUserVals={this.setSubScreen1UserVals}
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}
