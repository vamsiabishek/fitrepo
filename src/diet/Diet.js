import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Diet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this.props;
    return (
      <View style={styles.container}>
        <Text>Diet Home Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
