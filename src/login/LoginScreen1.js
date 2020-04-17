import React, {Component} from 'react';
import {
  Alert,
  Platform,
  Text,
  View,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {Button, SocialIcon} from 'react-native-elements';
import {styles} from '../../assets/style/stylesLoginScreen';
import {f, database, auth} from './../common/FirebaseConfig';
import {
  EMAIL_VERIFICATION,
  PASSWORD_LENGTH_MINIMUM,
  PROVIDER_GOOGLE,
  PROVIDER_FACEBOOK,
} from '../common/Common';
import {setCurrentUser, getCurrentUser} from '../common/Util';
import {fontsCommon} from '../../assets/style/stylesCommonValues';
import {commonStyles} from '../../assets/style/stylesCommon';
import PhoneAuth from '../signup/PhoneAuthScreen';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LoginScreen1 extends Component {
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
      selectedIndex: 0,
      secureTextKey: true,
      showSocialOptions: true,
    };
    //this.logoutGoogleUser()
  }

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
      Alert.alert('Invalid username/password');
    }
  };
  onFBLogin = () => {
    this.setState({isLoading: true});
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then((result) => this.getFBTokenFromResponse(result))
      .then((data) => this.getFBCredentialsUsingToken(data))
      .then((currentUser) => {
        //console.log("current FB User:", currentUser);
        setCurrentUser(currentUser.user);
        this.navigateLoggedInUser(currentUser, PROVIDER_FACEBOOK);
      })
      .catch((error) => {
        Alert.alert('Login fail with error: ' + error);
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
    const credentials = f.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    // console.log('credentials:', credentials);
    return f.auth().signInWithCredential(credentials);
  };
  onGoogleLogin = async () => {
    this.setState({isLoading: true});
    try {
      // Add any configuration settings here:
      if (Platform.OS === 'android') {
        await GoogleSignin.configure({
          webClientId:
            '784097360045-qjliaef9a4kphpdlcoo1v6ff2jj4oaum.apps.googleusercontent.com',
        });
      } else {
        await GoogleSignin.configure();
      }
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = f.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      // login with credential
      const currentUser = await f.auth().signInWithCredential(credential);
      setCurrentUser(currentUser.user);
      this.navigateLoggedInUser(currentUser, PROVIDER_GOOGLE);
      this.onLoginSuccess();
    } catch (error) {
      Alert.alert('Login failed with error ', error.message);
    }
  };
  navigateLoggedInUser = async (currentUser, provider) => {
    const {
      user: {uid},
    } = currentUser;
    const isExistingUser = await this.checkForExistingUserWithDiets(uid);
    if (isExistingUser) {
      this.onLoginSuccess();
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

      const {navigation} = this.props;
      navigation.navigate('Signup', {
        isExistingUser: true,
        hasAtleastOneDiet: isExistingUser,
        newLogin: true,
        uid,
        newUser,
        provider,
      });
    }
  };
  checkForExistingUserWithDiets = async (uid) => {
    let isExistingUser = false;
    await database
      .ref(`diets/${uid}`)
      .once('value')
      .then((snap) => {
        if (snap.val()) {
          isExistingUser = true;
        }
      })
      .catch((error) => {
        console.log('error while fetching my diets in Diet page', error);
      });
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

  render() {
    const {
      // email,
      // password,
      // passwordValid,
      // emailValid,
      isLoading,
      // secureTextKey,
      showSocialOptions,
    } = this.state;
    // const socialLoginContainerStyle = {
    //   ...styles.buttonContainer,
    //   flexDirection: 'row',
    // };
    return (
      <View style={commonStyles.bgImage}>
        <KeyboardAvoidingView
          style={styles.container}
          contentContainerStyle={styles.container}
          behavior="padding"
          enabled>
          {/* {isLoading ? (
            <Loading
              text={'Logging you into Fitrepo...'}
              animationStr={require('../../assets/jsons/user_animation_4.json')}
              isTextBold={false}
            />
          ) : ( */}
          <View style={styles.loginView}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>FITREPO</Text>
            </View>
            <View style={styles.loginInputContainer}>
              <PhoneAuth
                setShowSocialOptions={this.setShowSocialOptions}
                createUserWithPhoneNumber={this.loginWithPhoneNumber}
                loadingMessage={'Logging you into Fitrepo...'}
              />
              {/* <Input
                  placeholder="Email"
                  placeholderTextColor={styleCommon.textColor1}
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  leftIcon={
                    <Icon
                      name="account"
                      color={styles.loginButtonDes.color}
                      size={ICON_SIZE}
                    />
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="dark"
                  keyboardType="email-address"
                  returnKeyType="done"
                  value={email}
                  onChangeText={(value) => this.onEmailChange(value)}
                  ref={(input) => (this.emailInput = input)}
                  onSubmitEditing={() => {
                    this.setState({emailValid: this.validateEmail});
                    this.passwordInput.focus();
                  }}
                  errorMessage={
                    emailValid ? null : 'Please enter a valid email address'
                  }
                  style={{
                    fontSize: fontsCommon.font16,
                  }}
                />
                <Input
                  placeholder="Password"
                  placeholderTextColor={styleCommon.textColor1}
                  leftIcon={
                    <Icon
                      name="key-variant"
                      color={styles.loginButtonDes.color}
                      size={ICON_SIZE}
                    />
                  }
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  keyboardAppearance="dark"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="go"
                  secureTextEntry={secureTextKey}
                  value={password}
                  onChangeText={(passwordChg) =>
                    this.onPasswordChange(passwordChg)
                  }
                  ref={(input) => (this.passwordInput = input)}
                  onSubmitEditing={() => {
                    this.setState({passwordValid: this.validatePassword});
                  }}
                  errorMessage={
                    passwordValid ? null : 'Please enter a valid password'
                  }
                  rightIcon={
                    <Button
                      icon={
                        <Icon
                          name={secureTextKey ? 'eye' : 'eye-off'}
                          size={ICON_SIZE}
                          style={{color: styleCommon.textColor1}}
                        />
                      }
                      buttonStyle={styles.seeUnseeButtonStyle}
                      onPress={
                        secureTextKey
                          ? this.onEyeIconPress
                          : this.onEyeOffIconPress
                      }
                    />
                  }
                /> */}
            </View>
            {/* <View style={styles.buttonContainer}>
                <Button
                  title="LOGIN"
                  icon={
                    <Icon
                      name="login"
                      size={ICON_SIZE}
                      style={styles.loginButtonIcon}
                    />
                  }
                  iconRight={true}
                  ViewComponent={LinearGradient}
                  linearGradientProps={{
                    colors: [btnGradientColorLeft, modalBtnGradientColorRight], //btnGradientColorRight
                    start: {x: 0, y: 0.5},
                    end: {x: 1, y: 0.5},
                  }}
                  containerStyle={styles.loginButtonContainerStyle}
                  buttonStyle={styles.loginButtonStyle}
                  titleStyle={styles.loginButtonText}
                  onPress={() => this.submitLoginCredentials()}
                />
                <Button
                  title="Forgot Password ?"
                  titleStyle={styles.signUpButtonTitle}
                  type="clear"
                  onPress={() => this.onClickForgotPassword()}
                />
              </View> */}
            {showSocialOptions && !isLoading && (
              <View>
                <View style={{...styles.buttonContainer, flexDirection: 'row'}}>
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
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
