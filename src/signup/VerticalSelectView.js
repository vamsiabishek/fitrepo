import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {
  MALE_BEGINNER_ICON,
  MALE_INTERMEDIATE_ICON,
  MALE_ADVANCED_ICON,
  FEMALE_BEGINNER_ICON,
  FEMALE_INTERMEDIATE_ICON,
  FEMALE_ADVANCED_ICON,
  BEGINNER_LABEL,
  INTERMEDIATE_LABEL,
  ADVANCED_LABEL,
  BEGINNER_DESC,
  INTERMEDIATE_DESC,
  ADVANCED_DESC,
} from '../common/Common';
import {styles} from '../../assets/style/stylesVerticalSelectView';
import {styleCommon, fontsCommon} from '../../assets/style/stylesCommonValues';

export default class VerticalSelectView extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(1);
  }

  _keyExtractor = (item) => `key${item}`;

  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.5,
    }).start();
  };
  handlePressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3, //default 7
      tension: 40,
    }).start();
  };

  render() {
    const {
      levels,
      gender,
      selectedLevel,
      setFitnessLevel,
      alterDimensions,
      changeFactor,
    } = this.props;
    const animatedStyle = {
      transform: [{scale: this.animatedValue}],
    };
    return (
      <FlatList
        scrollEnabled={false}
        style={styles.flatListContainer}
        contentContainerStyle={styles.flatListContentContainer}
        data={levels}
        renderItem={({item, index}) => {
          let {
            iconStyle,
            iconImageStyle,
            iconDataStyle,
            levelDecriptionContainer,
            lineContainer,
            levelDescriptionStyle,
            levelTitleStyle,
          } = styles;
          if (alterDimensions) {
            iconStyle = {
              ...iconStyle,
              height: iconStyle.height + changeFactor,
              width: iconStyle.width + changeFactor,
            };
            iconDataStyle = {
              ...iconDataStyle,
              height: iconDataStyle.height + changeFactor,
              width: iconDataStyle.width + changeFactor,
            };
          }
          if (item === selectedLevel) {
            iconStyle = {
              ...iconStyle,
              backgroundColor: styleCommon.selectedButtonColor,
            };
            iconImageStyle = {
              ...iconImageStyle,
              tintColor: styleCommon.textColor2,
            };
            levelTitleStyle = {
              ...levelTitleStyle,
              fontSize: fontsCommon.font18,
            };
            levelDescriptionStyle = {
              ...levelDescriptionStyle,
              fontSize: fontsCommon.font14,
              fontWeight: '600',
            };
          }
          let levelImage =
            gender === 1 ? MALE_BEGINNER_ICON : FEMALE_BEGINNER_ICON;
          let levelTitle = BEGINNER_LABEL;
          let levelDec = BEGINNER_DESC;
          let levelDescriptionStyles = [levelDecriptionContainer];
          if (index === 1) {
            levelImage =
              gender === 1 ? MALE_INTERMEDIATE_ICON : FEMALE_INTERMEDIATE_ICON;
            levelTitle = INTERMEDIATE_LABEL;
            levelDec = INTERMEDIATE_DESC;
            levelDescriptionStyles.push({marginTop: lineContainer.height});
          } else if (index === 2) {
            levelImage =
              gender === 1 ? MALE_ADVANCED_ICON : FEMALE_ADVANCED_ICON;
            levelTitle = ADVANCED_LABEL;
            levelDec = ADVANCED_DESC;
            levelDescriptionStyles.push({marginTop: lineContainer.height});
          }

          return (
            <View style={styles.returnViewContainer}>
              <View style={styles.subContainer}>
                {index !== 0 && <View style={styles.lineContainer} />}
                <TouchableOpacity
                  style={styles.touchableContainerView}
                  onPress={() => setFitnessLevel(item)}
                  onPressIn={() => this.handlePressIn()}
                  onPressOut={() => this.handlePressOut()}>
                  <Animated.View style={[iconStyle, animatedStyle]}>
                    <View style={styles.iconDataStyle}>
                      <Image source={levelImage} style={iconImageStyle} />
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              </View>
              <View style={levelDescriptionStyles}>
                <Text style={levelTitleStyle}>{levelTitle}</Text>
                <Text style={levelDescriptionStyle}>{levelDec}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={this._keyExtractor}
        extraData={selectedLevel}
      />
    );
  }
}
