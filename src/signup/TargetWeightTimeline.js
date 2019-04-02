import React, { Component } from "react";
import { UIManager, View, Text } from "react-native";
import { Button, ButtonGroup } from "react-native-elements";
import Modal from "react-native-modal";
import HorizontalSelectView from "../components/HorizontalSelectView";
import { styles } from "../../assets/style/stylesPersonalDetails";
import { getPossibleTargetWeights } from "../diet/Algorithm/DietAlgorithm";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class TargetWeightTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProgram: this.props.programs[0],
      selectedTargetWeight: undefined,
      targetWeightIndex: 1
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
            <View style={styles.targetContainer}>
              <Text style={styles.headerText}>These are Best for you !</Text>
            </View>
            <View style={styles.targetContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}> Choosen Program: </Text>
                <Text style={styles.selectedOptionLabel}>
                  {" "}
                  {selectedProgram} Weeks Program{" "}
                </Text>
              </View>
              <HorizontalSelectView
                items={programs}
                selectedItem={selectedProgram}
                onSelectionChange={this._onProgramChange}
              />
            </View>
            <View style={styles.targetContainer}>
              <Text style={styles.labelText}>
                Possible Target weights for {selectedProgram} Week Program
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
            <Button title="Confirm" onPress={this._handleConfirm} />
          </View>
        </Modal>
      </View>
    );
  }
}

//{programLabelValue} {programs} {program} 2 {targetWeightIndex} {this.targetWeightLabels}
