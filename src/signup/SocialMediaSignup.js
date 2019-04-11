import React, { Component } from "react";
import { View, Text } from "react-native";
import { SocialIcon } from "react-native-elements";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { f, database } from "../common/FirebaseConfig";
import EmailOrMobileSignup from "./EmailOrMobileSignup";
import { styles } from "../../assets/style/stylesSocialMediaSignup";

export default class SocialMediaSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  onPressLogin = () => {
    LoginManager.logInWithReadPermissions([
      "public_profile",
      "user_birthday",
      "email"
    ])
      .then(result => this.getFBTokenFromResponse(result))
      .then(data => this.getFBCredentialsUsingToken(data))
      .then(currentUser => {
        console.log("current FB User:", currentUser);
        this.createUserWithDetails(currentUser);
      })
      .catch(error => {
        alert("Login fail with error: " + error);
      });
  };
  getFBTokenFromResponse = result => {
    if (result.isCancelled)
      return Promise.reject(new Error("The user cancelled the request"));
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
  createUserWithDetails = async ({ user, additionalUserInfo }) => {
    const { setFBUser } = this.props;
    const { birthday } = additionalUserInfo;
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
    return (
      <View style={styles.mainContent}>
        <View style={styles.iconsWrapper}>
          <View style={[styles.iconContainer, styles.overlapOne]}>
            <SocialIcon
              iconSize={50}
              style={styles.iconStyle}
              type="facebook"
              onPress={() => this.onPressLogin()}
            />
          </View>
          <View style={[styles.iconContainer, styles.overlapTwo]}>
            <SocialIcon
              iconSize={50}
              style={styles.iconStyle}
              type="google-plus-official"
            />
          </View>
          <View style={[styles.iconContainer, styles.overlapThree]}>
            <SocialIcon iconSize={50} style={styles.iconStyle} type="twitter" />
          </View>
        </View>
        <View>
          <Text style={styles.textColor}>──────── OR ────────</Text>
        </View>
        <View>
          <EmailOrMobileSignup signupObject={signupObject} />
        </View>
      </View>
    );
  }
}
