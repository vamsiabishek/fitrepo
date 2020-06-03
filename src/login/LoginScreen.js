import React, {Component} from 'react';
import {
  Alert,
  Platform,
  Text,
  View,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Animated,
  ImageBackground,
} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {Button, SocialIcon} from 'react-native-elements';
import {styles} from '../../assets/style/stylesLoginScreen';
import auth from '@react-native-firebase/auth';
import {
  EMAIL_VERIFICATION,
  PASSWORD_LENGTH_MINIMUM,
  PROVIDER_GOOGLE,
  PROVIDER_FACEBOOK,
  LOGIN_BG_IMAGE,
} from '../common/Common';
import {setCurrentUser, getCurrentUser} from '../common/Util';
import {fontsCommon} from '../../assets/style/stylesCommonValues';
import {commonStyles} from '../../assets/style/stylesCommon';
import PhoneAuth from '../signup/PhoneAuthScreen';
import Loading from '../components/Loading';
import analytics from '@react-native-firebase/analytics';
import PrivacyAndTerms from '../documents/PrivacyAndTerms';
import api from '../common/Api';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    (async () => {
      // All async code here
      //await removeCurrentUser()
      const user = await getCurrentUser();
      if (user) {
        // console.log('uid:', user.uid);
        this.onLoginSuccess();
      }
    })();
    this.state = {
      email: 'jake@brooklyn99.com',
      password: 'jake@1234',
      emailValid: true,
      passwordValid: true,
      login_failed: false,
      isLoading: false,
      isLoadingPostPrivacy: false,
      selectedIndex: 0,
      secureTextKey: true,
      showSocialOptions: true,
      showPrivacyTerms: false,
      user: null,
      media: '',
    };
    this.shakeAnimation = new Animated.Value(0);
  }

  componentDidMount() {
    this.startShake();
    // Alert.alert('__DEV__', __DEV__);
  }

  shakeInIntervals = () => {
    this.shakeInterval = setInterval(() => {
      if (this.shakeInterval) {
        clearInterval(this.shakeInterval);
      }
      this.startShake();
    }, 3000);
  };

  startShake = () => {
    Animated.sequence([
      Animated.timing(this.shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => this.shakeInIntervals());
  };

  /*logoutGoogleUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    //this.setState({ currentUser });
    if (currentUser) {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        //this.setState({ user: null }); // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    }
  }*/
  onEyeIconPress = () => {
    this.setState({secureTextKey: false});
  };
  onEyeOffIconPress = () => {
    this.setState({secureTextKey: true});
  };
  onEmailChange = (email) => {
    this.setState({email});
  };
  validateEmail = () => {
    const {email} = this.state;
    const emailValid = EMAIL_VERIFICATION.test(email);
    LayoutAnimation.easeInEaseOut();
    emailValid || this.emailInput.shake();
    return emailValid;
  };
  onPasswordChange = (password) => {
    this.setState({password});
  };
  validatePassword = () => {
    const {password} = this.state;
    const passwordValid = password.length >= PASSWORD_LENGTH_MINIMUM;
    LayoutAnimation.easeInEaseOut();
    this.setState({passwordValid});
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  };
  submitLoginCredentials = () => {
    const {email, password} = this.state;
    const emailValid = this.validateEmail(email);
    const passwordValid = this.validatePassword(password);
    this.setState({emailValid, passwordValid});
    if (emailValid && passwordValid) {
      this.setState({isLoading: true});
      this.login();
    }
  };
  login = async () => {
    const {email, password} = this.state;
    try {
      const credentials = await auth.signInWithEmailAndPassword(
        email,
        password,
      );
      setCurrentUser(credentials.user);
      this.onLoginSuccess();
    } catch (error) {
      this.setState({isLoading: false});
      Alert.alert(
        'Login Failed',
        'Seems like you have entered an invalid email/password. Please check and try again.',
      );
    }
  };
  onFBLogin = () => {
    this.setState({isLoading: true, media: 'Facebook'});
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then((result) => this.getFBTokenFromResponse(result))
      .then((data) => this.getFBCredentialsUsingToken(data))
      .then((currentUser) => {
        //console.log("current FB User:", currentUser);
        setCurrentUser(currentUser.user);
        this.navigateLoggedInUser(currentUser, PROVIDER_FACEBOOK);
      })
      .catch((error) => {
        Alert.alert(
          error.toString().includes('user cancelled')
            ? 'Cancelled!'
            : 'Failed!',
          error.toString().includes('user cancelled')
            ? 'Looks like you cancelled the login process. Do choose your login method from the given options.'
            : 'Looks like an error occurred while trying to sign you up. Please try again later.',
        );
        // analytics().logEvent('Facebook log in failure', {
        //   error: error,
        // });
        // console.log('Error occurred in the FB login: ', error);
        this.setState({isLoading: false});
      });
  };
  getFBTokenFromResponse = (result) => {
    if (result.isCancelled) {
      this.setState({isLoading: false});
      return Promise.reject(new Error('The user cancelled the request'));
    }
    /*console.log(
      'FB login success with permission: ',
      result.grantedPermissions.toString(),
    );*/
    //get access token
    return AccessToken.getCurrentAccessToken();
  };
  getFBCredentialsUsingToken = (data) => {
    const credentials = auth.FacebookAuthProvider.credential(data.accessToken);
    // console.log('credentials:', credentials);
    return auth().signInWithCredential(credentials);
  };
  onGoogleLogin = async () => {
    this.setState({isLoading: true, media: 'Google'});
    try {
      // Add any configuration settings here:
      if (Platform.OS === 'android') {
        await GoogleSignin.configure({
          webClientId: api.clientIdGoogleSignIn,
        });
      } else {
        await GoogleSignin.configure();
      }
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      //console.log(idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      //console.log(googleCredential);

      // Sign-in the user with the credential
      const currentUser = await auth().signInWithCredential(googleCredential);
      //console.log(currentUser);

      // Setting current user
      setCurrentUser(currentUser.user);
      this.navigateLoggedInUser(currentUser, PROVIDER_GOOGLE);
    } catch (error) {
      Alert.alert(
        error.code.toString() === '-5' ? 'Cancelled!' : 'Failed !',
        error.code.toString() === '-5'
          ? 'Looks like you cancelled the login process. Do choose your login method from the given options.'
          : 'Looks like an error occurred while trying to sign you up. Please try again later.',
      );
      // console.log('google log in failed/cancelled: ', error.code);
      // analytics().logEvent('Google Log in Error/Cancelled', {
      //   error: error,
      // });
      this.setState({isLoading: false});
    }
  };
  navigateLoggedInUser = async (currentUser, provider) => {
    this.setState({media: ''});
    const {
      user: {uid},
    } = currentUser;
    const {navigation} = this.props;
    const isExistingUser = await this.checkForExistingUserWithDiets();
    //console.log('isExistingUser: ', isExistingUser);
    if (isExistingUser) {
      this.onLoginSuccess();
      analytics().logEvent('Login', {
        uid,
        provider: provider || 'Phone Number',
      });
    } else {
      let newUser = {};
      if (provider === PROVIDER_GOOGLE) {
        const googleUser = await GoogleSignin.getCurrentUser();
        const {
          user: {id, name, photo, email},
        } = googleUser;
        newUser = {
          uid,
          email,
          //dob,
          //age,
          name,
          avatar: photo,
          provider: PROVIDER_GOOGLE,
          providerId: id,
        };
      } else if (provider === PROVIDER_FACEBOOK) {
        const {user, additionalUserInfo} = currentUser;
        const {birthday} = additionalUserInfo.profile;
        const dob = new Date(birthday).toDateString().substring(4);
        const age = new Date().getFullYear() - new Date(birthday).getFullYear();
        // user object also contains phone number
        newUser = {
          uid,
          email: user.email,
          dob,
          age,
          name: user.displayName,
          avatar: user.photoURL,
          provider: PROVIDER_FACEBOOK,
        };
      } else {
        const {user} = currentUser;
        newUser = {
          phoneNumber: user.phoneNumber,
          uid,
        };
      }

      analytics().logEvent('Login_without_signup', {
        provider: provider || 'Phone Number',
      });

      const user = {
        isExistingUser: true,
        hasAtleastOneDiet: isExistingUser,
        newLogin: true,
        uid,
        newUser,
        provider,
      };

      const userInDB = await api.get('/getLoggedInUser');
      if (userInDB && !userInDB.privacyTermsAccepted) {
        this.setState({showPrivacyTerms: true, user});
      } else {
        navigation.navigate('Signup', {fromLogin: true});
      }
    }
  };

  checkForExistingUserWithDiets = async () => {
    let isExistingUser = false;
    try {
      const {diets} = await api.get('/userDiets');
      if (diets.length > 0) {
        isExistingUser = true;
      }
    } catch (err) {
      console.log('error while fetching my diets in SignUp page', err);
    }
    return isExistingUser;
  };
  onLoginSuccess = () => {
    this.setState({isLoading: false});
    this.props.navigation.navigate('HomeScreen');
  };
  signUpButttonClicked = () => {
    const {navigate} = this.props.navigation;
    navigate('SignUp');
  };
  onClickForgotPassword = () => {
    const {navigate} = this.props.navigation;
    navigate('ForgotPasswordScreen');
  };

  loginWithPhoneNumber = async (user) => {
    // console.log('the user dets post phone auth log in: ', user);
    setCurrentUser(user);
    const currentUser = {user};
    // console.log('the currentUser dets post phone auth log in: ', currentUser);
    await this.navigateLoggedInUser(currentUser);
    //this.onLoginSuccess();
  };

  setShowSocialOptions = (show) => {
    this.setState({showSocialOptions: show, isLoading: false});
  };

  saveUserPrivacyTerms = async () => {
    const {user} = this.state;
    const {navigation} = this.props;
    user.newUser.privacyTermsAccepted = true;
    this.setState({
      showPrivacyTerms: false,
      isLoading: true,
      isLoadingPostPrivacy: true,
    });
    try {
      await api.post('/saveUser', user.newUser);
      navigation.navigate('Signup', {fromLogin: true});
    } catch (err) {
      Alert.alert(
        'Oops!',
        'Something went wrong while saving your user details. Please try again after sometime.',
      );
      console.log(
        'Error has occurred while saving user with privacy settings changes: ',
        err,
      );
      return false;
    }
  };

  render() {
    const {
      isLoading,
      isLoadingPostPrivacy,
      showSocialOptions,
      showPrivacyTerms,
      media,
    } = this.state;
    const socialLoginContainerStyle = {
      ...styles.buttonContainer,
      flexDirection: 'row',
    };
    return (
      <View style={commonStyles.container}>
        <View
          style={
            showSocialOptions && !isLoading
              ? styles.container
              : styles.containerLoading
          }>
          {isLoading ? (
            <Loading
              resizeMode={isLoadingPostPrivacy && 'contain'}
              text={
                isLoadingPostPrivacy
                  ? 'Signing you up with DietRepo...'
                  : media.length !== 0
                  ? 'Redirecting you to ' + media + ' Login...'
                  : 'Logging you into DietRepo...'
              }
              animationStr={
                isLoadingPostPrivacy
                  ? require('../../assets/jsons/user_animation_4.json')
                  : media.length !== 0
                  ? media.includes('Facebook')
                    ? require('../../assets/jsons/facebook_loading_animation.json')
                    : require('../../assets/jsons/google_loading_animation.json')
                  : require('../../assets/jsons/logging_animation.json')
              }
              isTextBold={true}
              takeFullHeight={false}
            />
          ) : (
            <ImageBackground
              source={showSocialOptions && LOGIN_BG_IMAGE}
              style={commonStyles.bgImage}>
              <PhoneAuth
                setShowSocialOptions={this.setShowSocialOptions}
                createUserWithPhoneNumber={this.loginWithPhoneNumber}
                loadingMessage={
                  isLoadingPostPrivacy
                    ? 'Signing you up with DietRepo...'
                    : 'Logging you into DietRepo...'
                }
              />
              {showSocialOptions && !isLoading && (
                <View>
                  <View style={socialLoginContainerStyle}>
                    <SocialIcon
                      style={styles.socialMediaLoginBtn}
                      title="Facebook"
                      button
                      type="facebook"
                      onPress={() => this.onFBLogin()}
                      iconSize={fontsCommon.font22}
                    />
                    <SocialIcon
                      style={styles.socialMediaLoginBtn}
                      title="Google"
                      button
                      type="google-plus-official"
                      onPress={() => this.onGoogleLogin()}
                      iconSize={fontsCommon.font22}
                    />
                  </View>
                  <View style={styles.signUpHereContainer}>
                    <Text style={styles.newUserText}>New here ?</Text>
                    <Button
                      title="SIGN UP"
                      titleStyle={styles.signUpButtonTitle}
                      type="clear"
                      onPress={() => this.signUpButttonClicked()}
                    />
                  </View>
                </View>
              )}
            </ImageBackground>
          )}
        </View>
        {showPrivacyTerms && (
          <PrivacyAndTerms
            showPrivacyTerms={showPrivacyTerms}
            onAccept={this.saveUserPrivacyTerms}
            showCloseBtn={false}
          />
        )}
      </View>
    );
  }
}
