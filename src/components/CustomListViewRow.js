import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ICON_SIZE_MED,
  ICON_SIZE_LARGE,
  NON_VEG_ICON,
  VEG_ICON
} from "../common/Common";
import { timeConverter } from "../common/Util";

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
  titleContainer: {
    flexDirection: "row"
  },
  title: {
    fontSize: 17,
    color: "#FFF"
  },
  container_text: {
    marginLeft: 12
  },
  vegContainer: {
    backgroundColor: "white",
    marginLeft: 10,
    borderRadius: 4
  },
  vegIcon: {
    height: 24,
    width: 24,
    paddingLeft: 10
  },
  descriptionContainer: {
    paddingVertical: 6
  },
  description: {
    fontSize: 13,
    fontStyle: "italic",
    color: "lightgrey"
  },
  likesContainer: {
    flexDirection: "row",
    paddingTop: 5
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
  timeStampContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: 60
  },
  timeStamp: {
    fontSize: 12,
    color: "lightgrey"
  },
  timeStampLabel: {
    fontSize: 12,
    color: "lightgrey"
  },
  rightIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  }
});

const CustomListViewRow = ({
  item: {
    key,
    value: { selectedGoal, selectedProgram, isVeg, selectedMeals, likes, createdDate }
  },
  navigation
}) => (
  <View style={styles.container}>
    <View style={styles.container_text}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{selectedGoal}</Text>
        <TouchableOpacity style={styles.vegContainer}>
          <Image
            style={styles.vegIcon}
            source={isVeg ? VEG_ICON : NON_VEG_ICON}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{selectedProgram}</Text>
        <Text style={styles.description}>{selectedMeals}</Text>
      </View>

      <View style={styles.likesContainer}>
        <Icon
          name="star"
          size={ICON_SIZE_MED}
          color="gold"
          style={styles.nextButtonIconStyle}
        />
        <Text style={styles.likesLabel}>{likes} Likes</Text>
      </View>
    </View>
    <View style={styles.timeStampContainer}>
      <Text style={styles.timeStampLabel}>Created:</Text>
      <Text style={styles.timeStamp}>{timeConverter(createdDate)}</Text>
    </View>

    <View style={styles.rightIcon}>
      <TouchableOpacity onPress={() => navigation.navigate("MyDiet", {dietId: key})}>
        <Icon name="chevron-right" size={ICON_SIZE_LARGE} color="grey" />
      </TouchableOpacity>
    </View>
  </View>
);

export default CustomListViewRow;
