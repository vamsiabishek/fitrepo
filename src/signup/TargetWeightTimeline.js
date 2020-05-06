import React, {Component} from 'react';
import {Text, UIManager, View, Alert} from 'react-native';
import {Button, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {styles} from '../../assets/style/stylesTargetWeightTimeline';
import {getPossibleTargetWeights} from '../diet/Algorithm/DietAlgorithm';
import MyButton from '../components/MyButton';
import {
  styleCommon,
  ICON_SIZE_MED,
  SCREEN_WIDTH,
} from '../../assets/style/stylesCommonValues';
import {WEIGHT_LOSS, WEIGHT_GAIN} from '../common/Common';
import {convertGoal} from '../common/Util';
import NumberSlider from 'react-native-number-slider';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class TargetWeightTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProgram: this.props.programs[0],
      targetWeightIndex: 1,
      selectedTargetWeight: undefined,
    };
    this.targetWeightLabels = [];
    this.targetWeightOptions = [];
  }

  _getTargetWeightOptions = () => {
    this.targetWeightOptions = [];
    this.targetWeightLabels = [];
    const {goal, weight, fitnessLevel} = this.props;
    const {selectedProgram} = this.state;
    getPossibleTargetWeights(goal, selectedProgram, weight, fitnessLevel).map(
      (targetWeight) => {
        this.targetWeightLabels.push(`${targetWeight} kg`);
        this.targetWeightOptions.push(targetWeight);
      },
    );
  };

  _resetProgramAndTargetWeight = () => {
    this.setState({
      selectedProgram: this.props.programs[0],
      selectedTargetWeight: undefined,
      targetWeightIndex: 1,
    });
  };

  _onProgramChange = (selectedProgram) => {
    this.setState({
      selectedProgram,
    });
  };

  _updateTargetWeight = (targetWeightIndex) => {
    let {goal} = this.props;
    goal = convertGoal(goal);
    if (
      targetWeightIndex === 2 &&
      (goal === WEIGHT_LOSS || goal === WEIGHT_GAIN)
    ) {
      let msg =
        'By chosing this option you might have to consume very less calories';
      if (goal === WEIGHT_GAIN) {
        msg =
          'By chosing this option you might have to consume very high calories and you might gain little fat';
      }
      Alert.alert(
        'Are you sure ?',
        msg,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Continue',
            onPress: () => this.setTargetWeight(targetWeightIndex),
          },
        ],
        {cancelable: false},
      );
    } else {
      this.setTargetWeight(targetWeightIndex);
    }
  };

  setTargetWeight = (targetWeightIndex) => {
    this.setState({
      targetWeightIndex,
      selectedTargetWeight: this.targetWeightOptions[targetWeightIndex],
    });
  };

  _handleConfirm = () => {
    const {
      selectedProgram,
      selectedTargetWeight,
      targetWeightIndex,
    } = this.state;
    let weightToBeUsed = selectedTargetWeight;
    if (selectedTargetWeight === undefined) {
      weightToBeUsed = this.targetWeightOptions[targetWeightIndex];
    }
    const {onConfirm} = this.props;
    onConfirm(weightToBeUsed, selectedProgram);
    this._resetProgramAndTargetWeight();
  };

  _handleClose = () => {
    const {onClose} = this.props;
    onClose();
    this._resetProgramAndTargetWeight();
  };

  render() {
    const {selectedProgram, targetWeightIndex} = this.state;
    const {isVisible, programs} = this.props;
    this._getTargetWeightOptions();
    return (
      <View>
        <Modal
          isVisible={isVisible}
          backdropColor="black"
          backdropOpacity={0.5}>
          <View style={styles.modalInsideStyle}>
            <Button
              icon={
                <Icon
                  name="close"
                  size={ICON_SIZE_MED}
                  color={styleCommon.textColor1}
                />
              }
              type="clear"
              onPress={this._handleClose}
              containerStyle={styles.closeButtonContainerStyle}
            />
            <View style={styles.targetContainer}>
              <Text style={styles.headerText}>What can you Target ?</Text>
            </View>
            <LottieView
              source={require('../../assets/jsons/target.json')}
              resizeMode="cover"
              autoPlay
              loop
              style={styles.animationStyle}
              enableMergePathsAndroidForKitKatAndAbove
            />
            <View style={styles.viewTargetsContainer}>
              <View style={styles.targetContainer}>
                <Text style={styles.labelText}>
                  Chosen Program: {selectedProgram} Weeks
                </Text>
                {/* <HorizontalSelectView
                  items={programs}
                  selectedItem={selectedProgram}
                  onSelectionChange={this._onProgramChange}
                /> */}
                <NumberSlider
                  displayValues={programs}
                  value={selectedProgram}
                  onValueChange={this._onProgramChange}
                  width={SCREEN_WIDTH * 0.7}
                  fontSize={14}
                />
              </View>
              <View style={styles.targetContainer}>
                <Text style={styles.labelText}>
                  Possible Target weights in {selectedProgram} Weeks:
                </Text>
                <ButtonGroup
                  onPress={this._updateTargetWeight}
                  selectedIndex={targetWeightIndex}
                  buttons={this.targetWeightLabels}
                  containerStyle={styles.buttonGroupStyle}
                  innerBorderStyle={{width: 0}}
                  selectedButtonStyle={styles.selectedButtonStyle}
                />
              </View>
              <MyButton
                label="CONFIRM"
                onButtonClick={this._handleConfirm}
                containerStyle={styles.targetButtonContainer}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
