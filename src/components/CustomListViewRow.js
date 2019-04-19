import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NON_VEG_ICON, VEG_ICON } from "../common/Common";
import { timeConverter } from "../common/Util";
import { styles } from "../../assets/style/stylesCustomListView";
import {
  styleCommon,
  ICON_SIZE_MED,
  ICON_SIZE_LARGE
} from "../../assets/style/stylesCommonValues";

const CustomListViewRow = ({
  item: {
    key,
    value: {
      selectedGoal,
      selectedProgram,
      isVeg,
      selectedMeals,
      likes,
      createdDate
    }
  },
  navigation
}) => (
  <View style={styles.rowContainer}>
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
      <Text style={styles.timeStampLabel}>
        Created: {timeConverter(createdDate)}
      </Text>
    </View>

    <View style={styles.rightIcon}>
      <TouchableOpacity
        onPress={() => navigation.navigate("MyDiet", { dietId: key })}
      >
        <Icon
          name="chevron-right"
          size={ICON_SIZE_LARGE}
          color={styleCommon.textColor1}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default CustomListViewRow;
