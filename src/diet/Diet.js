import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesDietScreen";

export default class Diet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.viewContainer}>
          <Text style={styles.titleContainer}>Your Diet Plans..</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="NEW DIET"
            containerStyle={styles.nextButtonContainerStyle}
            buttonStyle={styles.nextButtonStyle}
            titleStyle={styles.nextButtonTitleStyle}
            icon={
              <Icon
                name="new-box"
                size={20}
                style={{ color: "white", paddingHorizontal: 3 }}
              />
            }
            iconRight={true}
            onPress={() => this.props.navigation.navigate("CreateDiet")}
          />
        </View>
      </View>
    );
  }
}
