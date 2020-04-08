import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {timeConverter} from '../common/Util';
import {styles} from '../../assets/style/stylesCustomListView';
import {
  styleCommon,
  ICON_SIZE_SMALL,
  ICON_SIZE_MED,
  ICON_SIZE_LARGE,
} from '../../assets/style/stylesCommonValues';
import {getGoalString} from '../common/Util';

const CustomListViewRow = ({
  uid,
  item: {
    key,
    value: {
      selectedGoal,
      selectedProgram,
      isVeg,
      selectedMeals,
      likes,
      createdDate,
      fitnessLevel,
    },
  },
  navigation,
}) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('MyDiet', {
        uid,
        dietId: key,
        selectedProgram,
        selectedGoal,
        fitnessLevel,
      })
    }>
    <View style={styles.rowContainer}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.badgeContainer}>
          <Icon
            name="calendar-range"
            size={ICON_SIZE_MED}
            color="white"
            style={styles.nextButtonIconStyle}
          />
          <Text style={styles.badgeTitle}>{selectedProgram} Week</Text>
          <Text style={styles.badgeDescription}>Program</Text>
        </View>
        <View style={styles.container_text}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{getGoalString(selectedGoal)}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Icon
              name="silverware-fork-knife"
              size={ICON_SIZE_SMALL}
              color="#e87517"
              style={styles.nextButtonIconStyle}
            />
            <Text style={styles.description}>{selectedMeals} meals/day</Text>
          </View>

          <View style={styles.timeStampContainer}>
            <Text style={styles.timeStampLabel}>
              Created: {timeConverter(createdDate)}
            </Text>
          </View>
        </View>

        {/*<View style={styles.likesContainer}>
        <Icon
          name="star"
          size={ICON_SIZE_MED}
          color="gold"
          style={styles.nextButtonIconStyle}
        />
        <Text style={styles.likesLabel}>{likes} Likes</Text>
        </View>*/}
      </View>

      <View style={styles.rightIcon}>
        <Icon
          name="chevron-right"
          size={ICON_SIZE_LARGE}
          color={styleCommon.textColor1}
        />
      </View>
    </View>
  </TouchableOpacity>
);

export default CustomListViewRow;
