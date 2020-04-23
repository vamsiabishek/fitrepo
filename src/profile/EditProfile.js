import React, {Component} from 'react';
import {KeyboardAvoidingView, UIManager, View} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from '../../assets/style/stylesEditProfileScreen';
import EditProfileSubScreen1 from './EditProfileSubScreen1';
import {database} from '../common/FirebaseConfig';
import {
  styleCommon,
  ICON_BACK_SIZE,
} from '../../assets/style/stylesCommonValues';

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
    // subScreen2 = true
    const {userId, user} = this.state;
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    const haveNavigated = true;
    const updateUserOnProfile = navigation.getParam('updateProfileCall');
    database
      .ref('users')
      .child(userId)
      .update(setUserPartial)
      .then(() => {
        // console.log('Successfully updated existing user with details');
        this.setState({
          user: {...user, ...setUserPartial},
        });
        updateUserOnProfile(setUserPartial, haveNavigated);
        // if (subScreen2 === true) {
        navigate('Profile');
        // }
      })
      .catch((error) => {
        console.log('Error while updating new user with details:', error);
      });
  };

  render() {
    const {user} = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior="padding"
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
      </View>
    );
  }
}
