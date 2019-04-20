import React, { Component } from "react";
import { ActivityIndicator, Text, View, ImageBackground } from "react-native";
import Loading from "../components/Loading";
import { styles } from "../../assets/style/stylesHomeScreen";
import { f, database } from "../common/FirebaseConfig";
import { GRADIENT_BG_IMAGE } from "../common/Common";
import { styleCommon } from "../../assets/style/stylesCommonValues";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: "",
      name: ""
    };
  }
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const currentUser = await f.auth().currentUser;
    database
      .ref("users")
      .child(currentUser.uid)
      .once("value")
      .then(snapshot => {
        const userLoggedIn = snapshot.val();
        this.setState({
          username: userLoggedIn.username,
          name: userLoggedIn.name,
          isLoading: false
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
    const { isLoading, name } = this.state;
    return (
      <ImageBackground source={GRADIENT_BG_IMAGE} style={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <View style={styles.viewContainer}>
            <Text style={styles.headerText}>Welcome {name}!</Text>
            <Text style={styles.normalText}>This is the Home page.</Text>
          </View>
        )}
      </ImageBackground>
    );
  }
}

{
  /*<ActivityIndicator color={styleCommon.textColor1} size="large" />*/
}
