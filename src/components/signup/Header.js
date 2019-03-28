import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: 200,
    marginTop: 150,
    marginBottom: 40,
    marginHorizontal: 50
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#004a94"
  },
})

class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    );
  }
}

export default Header;
