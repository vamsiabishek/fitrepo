import React, { Component } from "react";
import { UIManager, View, Text } from "react-native";
import { Button, ButtonGroup, Icon } from "react-native-elements";
import Modal from "react-native-modal";
import HorizontalSelectView from "./HorizontalSelectView";
import { styles } from "../../assets/style/stylesPersonalDetails";
import { getPossibleTargetWeights } from "../diet/Algorithm/DietAlgorithm";
import MyButton from "../components/MyButton";
import { styleCommon } from "../../assets/style/stylesCommonValues";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class TargetWeightTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProgram: this.props.programs[0],
      targetWeightIndex: 1,
      selectedTargetWeight: undefined
    };
    this.targetWeightLabels = [];
    this.targetWeightOptions = [];
  }

  _resetProgramAndTargetWeight = () => {
    this.setState({
      selectedProgram: this.props.programs[0],
      selectedTargetWeight: undefined,
      targetWeightIndex: 1
    });
  };

  _handleConfirm = () => {
    const { selectedProgram, selectedTargetWeight } = this.state;
    const { onConfirm } = this.props;
    onConfirm(selectedTargetWeight, selectedProgram);
    this._resetProgramAndTargetWeight();
  };

  _handleClose = () => {
    const { onClose } = this.props;
    onClose();
    this._resetProgramAndTargetWeight();
  };
  _onProgramChange = selectedProgram => {
    this.setState({
      selectedProgram
    });
  };

  _updateTargetWeight = targetWeightIndex => {
    this.setState({
      targetWeightIndex,
      selectedTargetWeight: this.targetWeightOptions[targetWeightIndex]
    });
  };

  _getTargetWeightOptions = () => {
    this.targetWeightOptions = [];
    this.targetWeightLabels = [];
    const { goal, weight, fitnessLevel } = this.props;
    const { selectedProgram } = this.state;
    let dummyGoal = goal;
    if (goal === 1) dummyGoal = 0;
    getPossibleTargetWeights(
      dummyGoal,
      selectedProgram,
      weight,
      fitnessLevel
    ).map(targetWeight => {
      this.targetWeightLabels.push(`${targetWeight} kg`);
      this.targetWeightOptions.push(targetWeight);
    });
    console.log(this.targetWeightOptions);
  };

  render() {
    const { selectedProgram, targetWeightIndex } = this.state;
    const { isVisible, programs } = this.props;
    this._getTargetWeightOptions();
    return (
      <View>
        <Modal
          isVisible={isVisible}
          backdropColor="black"
          backdropOpacity={0.5}
        >
          <View style={styles.modalInsideStyle}>
            <Button
              icon={
                <Icon
                  name="close"
                  size={20}
                  color={styleCommon.secondaryButtonTextColor}
                />
              }
              type="clear"
              onPress={this._handleClose}
              containerStyle={{
                position: "relative",
                top: -22,
                left: 152
              }}
            />
            <View style={styles.targetContainer}>
              <Text style={styles.headerText}>What can you target ?</Text>
            </View>
            <View style={styles.targetContainer}>
              <Text style={styles.labelText}>
                Choosen Program: {selectedProgram} Weeks
              </Text>
              <HorizontalSelectView
                items={programs}
                selectedItem={selectedProgram}
                onSelectionChange={this._onProgramChange}
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
                innerBorderStyle={{ width: 0 }}
                selectedButtonStyle={styles.selectedButtonStyle}
              />
            </View>
            <View style={styles.targetContainer}>
              <MyButton label="CONFIRM" onButtonClick={this._handleConfirm} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
