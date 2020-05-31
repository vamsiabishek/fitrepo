import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
//import EmailOrMobileSignup from './EmailOrMobileSignup';
import Loading from '../components/Loading';
import {styles} from '../../assets/style/stylesSocialMediaSignup';
import {ICON_SELECT_SIGNUP_OPTION} from '../../assets/style/stylesCommonValues';
import {setCurrentUser} from '../common/Util';
import PhoneAuth from './PhoneAuthScreen';
import api from '../common/Api';

export default class SocialMediaSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      media: '',
      showSocialOptions: true,
    };
    this.animatedFBValue = new Animated.Value(1);
    this.animatedGValue = new Animated.Value(1);
    this.animatedTValue = new Animated.Value(1);
  }
  componentDidMount() {}
  handlePressIn = (media) => {
    let animatedValue = this.animatedGValue;
    if (media === 'G') {
      animatedValue = this.animatedGValue;
    } else if (media === 'FB') {
      animatedValue = this.animatedFBValue;
    } else if (media === 'T') {
      animatedValue = this.animatedTValue;
    }
    Animated.spring(animatedValue, {
      toValue: 0.5,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
      });
    });
  };
  handlePressOut = (media) => {
    let animatedValue = this.animatedGValue;
    if (media === 'G') {
      animatedValue = this.animatedGValue;
    } else if (media === 'FB') {
      animatedValue = this.animatedFBValue;
    } else if (media === 'T') {
      animatedValue = this.animatedTValue;
    }

    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3, //default 7
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
      });
    });

    if (media === 'FB') {
      this.onPressFBLogin();
    } else if (media === 'G') {
      this.googleLogin();
    }
  };
  // Calling this function will open Google for login.
  googleLogin = async () => {
    const {setdisableBackAndClose} = this.props;
    setdisableBackAndClose(true);
    this.setState({isLoading: true, media: 'Google'});
    try {
      // Add any configuration settings here:
      if (Platform.OS === 'android') {
        await GoogleSignin.configure({
          webClientId: api.clientIdGoogleSignIn,
          scopes: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/user.birthday.read',
          ],
        });
      } else {
        await GoogleSignin.configure({
          scopes: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/user.birthday.read',
          ],
        });
      }
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      //(idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      //console.log(googleCredential);

      // Sign-in the user with the credential
      const currentUser = await auth().signInWithCredential(googleCredential);
      //console.log(currentUser);

      // Setting current user
      setCurrentUser(currentUser.user);

      const googleUser = await GoogleSignin.getCurrentUser();

      const userString = JSON.stringify(currentUser);
      const userObject = JSON.parse(userString);
      // console.log('userString:', userString);
      // console.log('userObject:', userObject);
      // console.log('googleUser:', googleUser);
      this.createUserWithGoogleDetails({userObject, googleUser});
      this.setState({isLoading: false});
      setdisableBackAndClose(false);
    } catch (error) {
      console.log('error: ', error);
      Alert.alert(
        error.code === -5 ? 'Cancelled!' : 'Failed !',
        error.code === -5
          ? 'Looks like you cancelled the login process. Do choose your sign up method from the given options.'
          : 'Looks like an error occurred while trying to sign you up. Please try again later.',
      );
      console.log(
        'Error occured while signing up user through google sign up: ',
        error.code,
      );
      this.setState({isLoading: false});
      setdisableBackAndClose(false);
    }
  };
  createUserWithGoogleDetails = async ({userObject: {user}, googleUser}) => {
    // user object also contains phone number
    const {setGoogleUser} = this.props;
    const {
      user: {id, name, photo, email},
    } = googleUser;
    const newUser = {
      uid: user.uid,
      email,
      //dob,
      //age,
      name,
      avatar: photo,
      provider: 'google.com',
      providerId: id,
    };
    setGoogleUser(newUser);
  };
  onPressFBLogin = () => {
    const {setdisableBackAndClose} = this.props;
    this.setState({isLoading: true, media: 'Facebook'});
    setdisableBackAndClose(true);
    LoginManager.logInWithPermissions([
      'public_profile',
      'user_birthday',
      'email',
    ])
      .then((result) => this.getFBTokenFromResponse(result))
      .then((data) => this.getFBCredentialsUsingToken(data))
      .then((currentUser) => {
        //console.log('current FB User:', currentUser);
        setCurrentUser(currentUser.user);
        this.createUserWithFBDetails(currentUser);
        this.setState({isLoading: false});
        setdisableBackAndClose(false);
      })
      .catch((error) => {
        console.log('error: ', error);
        Alert.alert(
          error.toString().includes('user cancelled')
            ? 'Cancelled!'
            : 'Failed!',
          error.toString().includes('user cancelled')
            ? 'Looks like you cancelled the login process. Do choose your sign up method from the given options.'
            : 'Looks like an error occurred while trying to sign you up. Please try again later.',
        );
        console.log(
          'Error occured while signing up user through facebook sign up: ',
          error,
        );
        this.setState({isLoading: false});
        setdisableBackAndClose(false);
      });
  };
  getFBTokenFromResponse = (result) => {
    if (result.isCancelled) {
      this.setState({isLoading: false});
      return Promise.reject(new Error('The user cancelled the request'));
    }
    //get access token
    return AccessToken.getCurrentAccessToken();
  };
  getFBCredentialsUsingToken = async (data) => {
    const credentials = auth.FacebookAuthProvider.credential(data.accessToken);
    //console.log('credentials:', credentials);
    return auth().signInWithCredential(credentials);
  };

  createUserWithFBDetails = async ({user, additionalUserInfo}) => {
    const {setFBUser} = this.props;
    const {birthday} = additionalUserInfo.profile;
    const dob = new Date(birthday).toDateString().substring(4);
    const age = new Date().getFullYear() - new Date(birthday).getFullYear();
    // user object also contains phone number
    const newUser = {
      uid: user.uid,
      email: user.email,
      dob,
      age,
      name: user.displayName,
      avatar: user.photoURL,
    };
    setFBUser(newUser);
  };

  createUserWithPhoneNumber = (user) => {
    const {setPhoneNumberUser, setdisableBackAndClose} = this.props;
    const newUser = {
      phoneNumber: user.phoneNumber,
      uid: user.uid,
    };
    setdisableBackAndClose(false);
    setPhoneNumberUser(newUser);
  };

  setShowSocialOptions = (show = undefined, disableButtons = undefined) => {
    const {setdisableBackAndClose} = this.props;
    show !== undefined && this.setState({showSocialOptions: show});
    disableButtons !== undefined && setdisableBackAndClose(disableButtons);
  };

  render() {
    const {isLoading, showSocialOptions, media} = this.state;
    const animatedFBStyle = {
      transform: [{scale: this.animatedFBValue}],
    };
    const animatedGStyle = {
      transform: [{scale: this.animatedGValue}],
    };
    /*const animatedTStyle = {
      transform: [{scale: this.animatedTValue}],
    };*/
    return (
      <KeyboardAvoidingView
        style={styles.mainContent}
        contentContainerStyle={styles.mainContent}
        behavior="padding"
        enabled>
        {isLoading ? (
          <Loading
            text={'Opening ' + media + ' Login...'}
            isTextBold={true}
            animationStr={
              media === 'Facebook'
                ? require('../../assets/jsons/facebook_loading_animation.json')
                : require('../../assets/jsons/google_loading_animation.json')
            }
          />
        ) : (
          <React.Fragment>
            {showSocialOptions && (
              <View style={styles.iconsWrapper}>
                <Animated.View
                  style={[
                    styles.iconContainer,
                    styles.overlapOne,
                    animatedFBStyle,
                  ]}>
                  <TouchableOpacity
                    onPressIn={() => this.handlePressIn('FB')}
                    onPressOut={() => this.handlePressOut('FB')}>
                    <SocialIcon
                      iconSize={ICON_SELECT_SIGNUP_OPTION}
                      style={styles.iconStyle}
                      type="facebook"
                    />
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.iconContainer,
                    styles.overlapTwo,
                    animatedGStyle,
                  ]}>
                  <TouchableOpacity
                    onPressIn={() => this.handlePressIn('G')}
                    onPressOut={() => this.handlePressOut('G')}>
                    <SocialIcon
                      iconSize={ICON_SELECT_SIGNUP_OPTION}
                      style={styles.iconStyle}
                      type="google-plus-official"
                    />
                  </TouchableOpacity>
                </Animated.View>
                {/*<Animated.View
                  style={[
                    styles.iconContainer,
                    styles.overlapThree,
                    animatedTStyle,
                  ]}>
                  <TouchableOpacity
                    onPressIn={() => this.handlePressIn('T')}
                    onPressOut={() => this.handlePressOut('T')}>
                    <SocialIcon
                      iconSize={ICON_SELECT_SIGNUP_OPTION}
                      style={styles.iconStyle}
                      type="twitter"
                    />
                  </TouchableOpacity>
                </Animated.View>*/}
              </View>
            )}
            {showSocialOptions && (
              <View>
                <Text style={styles.textColor}>──────── OR ────────</Text>
              </View>
            )}
            <View>
              {/* <EmailOrMobileSignup signupObject={signupObject} /> */}
              <PhoneAuth
                isSignup={true}
                setShowSocialOptions={this.setShowSocialOptions}
                createUserWithPhoneNumber={this.createUserWithPhoneNumber}
                loadingMessage={'Signing you up with DietRepo'}
              />
            </View>
          </React.Fragment>
        )}
      </KeyboardAvoidingView>
    );
  }
}
