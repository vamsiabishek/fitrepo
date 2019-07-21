import React, { Component } from "react";
import { View, Text, TouchableOpacity, Animated, KeyboardAvoidingView } from "react-native";
import { SocialIcon } from "react-native-elements";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import { f } from "../common/FirebaseConfig";
import EmailOrMobileSignup from "./EmailOrMobileSignup";
import Loading from "../components/Loading";
import { styles } from "../../assets/style/stylesSocialMediaSignup";
import { ICON_SELECT_SIGNUP_OPTION } from "../../assets/style/stylesCommonValues";
import { setCurrentUser } from "../common/Util"

export default class SocialMediaSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.animatedFBValue = new Animated.Value(1);
    this.animatedGValue = new Animated.Value(1);
    this.animatedTValue = new Animated.Value(1);
  }
  componentDidMount() {}
  handlePressIn = media => {
    let animatedValue = this.animatedGValue;
    if (media === "G") animatedValue = this.animatedGValue;
    else if (media === "FB") animatedValue = this.animatedFBValue;
    else if (media === "T") animatedValue = this.animatedTValue;
    Animated.spring(animatedValue, {
      toValue: 0.5
    }).start();
  };
  handlePressOut = media => {
    let animatedValue = this.animatedGValue;
    if (media === "G") animatedValue = this.animatedGValue;
    else if (media === "FB") animatedValue = this.animatedFBValue;
    else if (media === "T") animatedValue = this.animatedTValue;

    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3, //default 7
      tension: 40
    }).start();

    if (media === "FB") {
      this.onPressFBLogin();
    } else if (media === "G") {
      this.googleLogin();
    }
  };
  // Calling this function will open Google for login.
  googleLogin = async () => {
    this.setState({ isLoading: true });
    try {
      // Add any configuration settings here:
      //await GoogleSignin.configure();
      if (Platform.OS === "android")
        await GoogleSignin.configure({
          webClientId:
            "784097360045-qjliaef9a4kphpdlcoo1v6ff2jj4oaum.apps.googleusercontent.com",
          scopes: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/user.birthday.read"
          ]
        });
      else
        await GoogleSignin.configure({
          scopes: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/user.birthday.read"
          ]
        });
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = f.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      // login with credential
      const currentUser = await f
        .auth()
        .signInAndRetrieveDataWithCredential(credential);
      setCurrentUser(currentUser.user);

      const googleUser = await GoogleSignin.getCurrentUser();

      const userString = JSON.stringify(currentUser);
      const userObject = JSON.parse(userString);
      console.log("userString:", userString);
      console.log("userObject:", userObject);
      console.log("googleUser:", googleUser);
      this.createUserWithGoogleDetails({ userObject, googleUser });
      this.setState({ isLoading: false });
    } catch (error) {
      alert("Login failed with error ", error.code);
    }
  };
  createUserWithGoogleDetails = async ({
    userObject: { user },
    googleUser
  }) => {
    // user object also contains phone number
    const { setGoogleUser } = this.props;
    const {
      user: { id, name, photo, email }
    } = googleUser;
    /* const { accessToken, apiKey } = user.stsTokenManager
    fetch(`https://people.googleapis.com/v1/people/${uid}/?key=${apiKey}&personFields=names,birthdays`, {
         method: 'GET',
         headers: {
           Authorisation: `Bearer ${accessToken}`
         }
      })
      .then((response) => {
        console.log("response: ", response)
        response.json()
      })
      .then((responseJson) => {
         console.log("responseJson", responseJson);
      })
      .catch((error) => {
         console.error(error);
      }); */
    const newUser = {
      uid: user.uid,
      email,
      //dob,
      //age,
      name,
      avatar: photo,
      provider: "google.com",
      providerId: id
    };
    setGoogleUser(newUser);
  };
  onPressFBLogin = () => {
    this.setState({ isLoading: true });
    LoginManager.logInWithReadPermissions([
      "public_profile",
      "user_birthday",
      "email"
    ])
      .then(result => this.getFBTokenFromResponse(result))
      .then(data => this.getFBCredentialsUsingToken(data))
      .then(currentUser => {
        console.log("current FB User:", currentUser);
        setCurrentUser(currentUser.user);
        this.createUserWithFBDetails(currentUser);
      })
      .catch(error => {
        alert("Login fail with error: " + error);
      });
  };
  getFBTokenFromResponse = result => {
    if (result.isCancelled) {
      this.setState({ isLoading: false });
      return Promise.reject(new Error("The user cancelled the request"));
    }
    console.log(
      "FB login success with permission: ",
      result.grantedPermissions.toString()
    );
    //get access token
    return AccessToken.getCurrentAccessToken();
  };
  getFBCredentialsUsingToken = data => {
    const credentials = f.auth.FacebookAuthProvider.credential(
      data.accessToken
    );
    console.log("credentials:", credentials);
    return f.auth().signInAndRetrieveDataWithCredential(credentials);
  };

  createUserWithFBDetails = async ({ user, additionalUserInfo }) => {
    const { setFBUser } = this.props;
    const { birthday } = additionalUserInfo.profile;
    const dob = new Date(birthday).toDateString().substring(4);
    const age = new Date().getFullYear() - new Date(birthday).getFullYear();
    // user object also contains phone number
    const newUser = {
      uid: user.uid,
      email: user.email,
      dob,
      age,
      name: user.displayName,
      avatar: user.photoURL
    };
    setFBUser(newUser);
  };
  render() {
    const { signupObject } = this.props;
    const { isLoading } = this.state;
    const animatedFBStyle = {
      transform: [{ scale: this.animatedFBValue }]
    };
    const animatedGStyle = {
      transform: [{ scale: this.animatedGValue }]
    };
    const animatedTStyle = {
      transform: [{ scale: this.animatedTValue }]
    };
    return (
      <KeyboardAvoidingView
        style={styles.mainContent}
        contentContainerStyle={styles.mainContent}
        behavior="padding"
        enabled
      >
        {isLoading ? (
          <Loading
            text={"Signing you up with Fitrepo ..."}
            isTextBold={false}
            animationStr={require("../../assets/jsons/user_animation_4.json")}
          />
        ) : (
          <React.Fragment>
            <View style={styles.iconsWrapper}>
              <Animated.View
                style={[
                  styles.iconContainer,
                  styles.overlapOne,
                  animatedFBStyle
                ]}
              >
                <TouchableOpacity
                  onPressIn={() => this.handlePressIn("FB")}
                  onPressOut={() => this.handlePressOut("FB")}
                >
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
                  animatedGStyle
                ]}
              >
                <TouchableOpacity
                  onPressIn={() => this.handlePressIn("G")}
                  onPressOut={() => this.handlePressOut("G")}
                >
                  <SocialIcon
                    iconSize={ICON_SELECT_SIGNUP_OPTION}
                    style={styles.iconStyle}
                    type="google-plus-official"
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={[
                  styles.iconContainer,
                  styles.overlapThree,
                  animatedTStyle
                ]}
              >
                <TouchableOpacity
                  onPressIn={() => this.handlePressIn("T")}
                  onPressOut={() => this.handlePressOut("T")}
                >
                  <SocialIcon
                    iconSize={ICON_SELECT_SIGNUP_OPTION}
                    style={styles.iconStyle}
                    type="twitter"
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View>
              <Text style={styles.textColor}>──────── OR ────────</Text>
            </View>
            <View>
              <EmailOrMobileSignup signupObject={signupObject} />
            </View>
          </React.Fragment>
        )}
      </KeyboardAvoidingView>
      //)}
    );
  }
}

{
  /*isLoading ? (
        <Loading />
      ) : (*/
}
