import React, { Component } from "react";
import {
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  ImageBackground
} from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../../assets/style/stylesHomeScreen";
import { f, database } from "../common/FirebaseConfig";
import { GRADIENT_BG_IMAGE } from "../common/Common";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: ""
    };
  }
  componentDidMount = async () => {
    const currentUser = await f.auth().currentUser;
    database
      .ref("users")
      .child(currentUser.uid)
      .once("value")
      .then(snapshot => {
        const userLoggedIn = snapshot.val();
        this.setState({
          username: userLoggedIn.username,
          name: userLoggedIn.name
        });
      })
      .catch(error => {
        console.log(
          "error while fetching user details in componentDidMount of Home:",
          error
        );
      });
  };
  render() {
    const { username, name } = this.state;
    return (
      <ImageBackground source={GRADIENT_BG_IMAGE} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.viewContainer}>
          <Text style={styles.headerText}>Welcome {name}!</Text>
          <Text style={styles.normalText}>This is the Home page.</Text>
        </View>
      </ImageBackground>
    );
  }
}
