import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SocialIcon, Divider } from "react-native-elements";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import EmailOrMobileSignup from "./EmailOrMobileSignup";
import { styleCommon } from "../../assets/style/stylesCommonValues";

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: "center",
    alignItems: "center"
    // flexDirection: "row",
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    // borderWidth: 5, // overlap left and mainContent margin depends on this value
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center"
  },
  iconStyle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 10,
    borderRightWidth: 0,
    borderColor: "#66ffff"
  },
  overlapOne: {
    //borderWidth: 5,
    borderRightWidth: 0
  },
  overlapTwo: {
    borderRightWidth: 0,
    position: "relative",
    left: -10
  },
  overlapThree: {
    position: "relative",
    left: -20
  }
});

export default class SocialMediaSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    
  }

  onPressLogin = () => {
      LoginManager.logInWithReadPermissions(['public_profile', 'user_birthday', 'email', 'user_photos'])
      .then((result) => this.handleCallBackFromFB(result),
        function(error) {
          alert('Login fail with error: ' + error);
        }
      )
  }

  handleCallBackFromFB = result => {
    console.log('result from FB:', result)
  }

  render() {
    const {signupObject} = this.props;
    return (
      <View style={styles.mainContent}>
        <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 15 }}>
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

        <View style={{ marginTop: 30 }}>
          <Text style={{ color: styleCommon.textColor1 }}>
            ──────── OR ────────
          </Text>
        </View>

        <View>
          <EmailOrMobileSignup signupObject={signupObject}/>
        </View>
      </View>
    );
  }
}
