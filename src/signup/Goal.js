import React from 'react';
import {View} from 'react-native';
import SelectButton from '../components/SelectButton';
import {styles} from '../../assets/style/stylesGoal';
import {
  styleCommon,
  ICON_SIZE_EXTRA_LARGE,
} from '../../assets/style/stylesCommonValues';

export default class Goal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const buttonIconColor = styleCommon.textColor1;
    const buttonIconActiveColor = styleCommon.textColor2;
    const {goal, setGoal} = this.props;
    return (
      <View style={styles.mainContent}>
        <SelectButton
          buttonStyle={
            goal === 0 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            goal === 0 ? styles.activeButtonTitle : styles.buttonTitle
          }
          title="Fat Loss"
          iconSize={ICON_SIZE_EXTRA_LARGE}
          iconName="scale-bathroom"
          buttonIcon={styles.buttonIcon}
          buttonIconColor={goal === 0 ? buttonIconActiveColor : buttonIconColor}
          onPress={setGoal}
          value={0}
        />
        <SelectButton
          buttonStyle={
            goal === 1 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            goal === 1 ? styles.activeButtonTitle : styles.buttonTitle
          }
          title="Be Healthy"
          iconSize={ICON_SIZE_EXTRA_LARGE}
          iconName="heart-pulse"
          buttonIcon={styles.buttonIcon}
          buttonIconColor={goal === 1 ? buttonIconActiveColor : buttonIconColor}
          onPress={setGoal}
          value={1}
        />
        <SelectButton
          buttonStyle={
            goal === 2 ? styles.activeButtonStyle : styles.buttonStyle
          }
          titleStyle={
            goal === 2 ? styles.activeButtonTitle : styles.buttonTitle
          }
          title="Gain Weight"
          iconSize={ICON_SIZE_EXTRA_LARGE}
          iconName="scale-bathroom"
          buttonIcon={styles.buttonIcon}
          buttonIconColor={goal === 2 ? buttonIconActiveColor : buttonIconColor}
          onPress={setGoal}
          value={2}
        />
      </View>
    );
  }
}
