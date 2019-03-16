import React, { Component } from "react";
import { LayoutAnimation, Text, View, StatusBar } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesDietScreen";
import { f, database } from "../common/FirebaseConfig";
import { ICON_SIZE_MED } from "../common/Common";

export default class Diet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: ""
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
        LayoutAnimation.easeInEaseOut();
        this.setState({
          username: userLoggedIn.username,
          name: userLoggedIn.name
        });
      })
      .catch(error => {
        console.log(
          "error while fetching user details in componentDidMount of Diet:",
          error
        );
      });
  };

  render() {
    const { name, username } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.buttonHeaderContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title="CREATE NEW"
              containerStyle={styles.nextButtonContainerStyle}
              buttonStyle={styles.nextButtonStyle}
              titleStyle={styles.nextButtonTitleStyle}
              icon={
                <Icon
                  name="pencil-outline"
                  size={ICON_SIZE_MED}
                  style={styles.nextButtonIconStyle}
                />
              }
              iconRight={true}
              onPress={() =>
                this.props.navigation.navigate("CreateDiet", {
                  screenName: name
                })
              }
            />
          </View>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.titleContainer}>Your Diet Plans..</Text>

          <Text style={styles.textContainer}>
            Hi, {name} you can see your current Diets here.
          </Text>
        </View>
      </View>
    );
  }
}
