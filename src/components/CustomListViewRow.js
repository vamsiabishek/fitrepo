import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ICON_SIZE_MED, ICON_SIZE_LARGE } from "../common/Common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingLeft: 5,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    borderRadius: 5,
    backgroundColor: "#494b50",
    elevation: 2
  },
  title: {
    fontSize: 17,
    color: "#FFF"
  },
  container_text: {
    marginLeft: 12
  },
  description: {
    fontSize: 13,
    fontStyle: "italic",
    color: "lightgrey"
  },
  photo: {
    height: 25,
    width: 25
  },
  likesLabel: {
    textShadowColor: "black",
    textShadowOffset: { width: -3, height: 2 },
    textShadowRadius: 30,
    fontSize: 12,
    color: "#00DB8D",
    padding: 3,
    fontWeight: "bold"
  },
  rightIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  }
});

const CustomListViewRow = ({
  item: { goal, program, isVegetarian, numberOfMeals, likes, dietId },
  navigation
}) => (
  <View style={styles.container}>
    <View style={styles.container_text}>
      <Text style={styles.title}>{goal}</Text>
      <Text style={styles.description}>{program}</Text>
      <Text style={styles.description}>{numberOfMeals}</Text>

      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Icon
          name="star"
          size={ICON_SIZE_MED}
          color="gold"
          style={styles.nextButtonIconStyle}
        />
        <Text style={styles.likesLabel}>{likes} Likes</Text>
      </View>
    </View>
    <View>
      <Badge
        value={isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
        status={isVegetarian ? "success" : "error"}
      />
    </View>
    <View style={styles.rightIcon}>
      <TouchableOpacity onPress={() => navigation.navigate("MyDiet")}>
        <Icon name="chevron-right" size={ICON_SIZE_LARGE} color="grey" />
      </TouchableOpacity>
    </View>
  </View>
);

export default CustomListViewRow;
