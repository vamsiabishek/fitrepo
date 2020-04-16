import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import SelectButton from '../components/SelectButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import NumberPicker from '../components/Picker/NumberPicker';
import TargetWeightTimeline from './TargetWeightTimeline';
import {
  MIN_DATE,
  MAX_DATE,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_WEIGHT,
  MAX_WEIGHT,
  WEIGHT_RANGE_FINAL,
  HEIGHT_RANGE_FINAL,
} from '../common/Common';
import {
  ICON_SIZE,
  ICON_SIZE_LARGE,
} from '../../assets/style/stylesCommonValues';
import {styles} from '../../assets/style/stylesPersonalDetails';
import {
  BIRTHDAY_ICON,
  WEIGHT_ICON,
  HEIGHT_ICON,
  TARGET_ICON,
} from '../common/Common';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDTPickerVisible: false,
      isWeightNumPickerVisible: false,
      isHeightNumPickerVisible: false,
      isTargetWeightTimelineVisible: false,
    };
  }
  showDTPicker = () => {
    this.setState({isDTPickerVisible: true});
  };
  showWeightNumPicker = () => {
    this.setState({isWeightNumPickerVisible: true});
  };
  showHeightNumPicker = () => {
    this.setState({isHeightNumPickerVisible: true});
  };
  showTargetWeightTimeline = () => {
    this.setState({isTargetWeightTimelineVisible: true});
  };
  hideDTPicker = () => {
    this.setState({isDTPickerVisible: false});
  };
  hideWeightNumPicker = () => {
    this.setState({isWeightNumPickerVisible: false});
  };
  hideHeightNumPicker = () => {
    this.setState({isHeightNumPickerVisible: false});
  };
  hideTargetWeightTimeline = () => {
    this.setState({isTargetWeightTimelineVisible: false});
  };
  handleDTPicker = (date) => {
    let currentDate = new Date();
    let dateFormat = new Date(date);
    let newDate = dateFormat.toDateString().substring(4);
    let ageFromDate = currentDate.getFullYear() - dateFormat.getFullYear();
    this.props.setDob(newDate, ageFromDate);
    this.hideDTPicker();
  };
  handleNumPickerForWeight = (number) => {
    this.props.setWeight(number);
    this.hideWeightNumPicker();
  };
  handleNumPickerForHeight = (number) => {
    this.props.setHeight(number);
    this.hideHeightNumPicker();
  };
  handleTargetWeightAndProgram = (targetWeight, program) => {
    this.props.setTargetWeightAndProgram(targetWeight, program);
    this.hideTargetWeightTimeline();
  };

  render() {
    const {
      goal,
      fitnessLevel,
      dob,
      weight,
      height,
      program,
      programs,
      targetWeight,
      showTargetWeightButton,
    } = this.props;
    const {
      isDTPickerVisible,
      isWeightNumPickerVisible,
      isHeightNumPickerVisible,
      isTargetWeightTimelineVisible,
    } = this.state;
    return (
      <View style={styles.mainContent}>
        <KeyboardAvoidingView behaviour="position">
          <View style={styles.inputOuterViewContainer}>
            <TouchableOpacity>
              <DateTimePicker
                mode="date"
                minimumDate={MIN_DATE}
                maximumDate={MAX_DATE}
                isVisible={isDTPickerVisible}
                onConfirm={this.handleDTPicker}
                onCancel={this.hideDTPicker}
              />
              <SelectButton
                title={dob.length === 0 ? 'Your Birthday' : dob}
                buttonStyle={
                  dob.length === 0
                    ? styles.buttonStyle
                    : styles.activeButtonStyle
                }
                titleStyle={
                  dob.length === 0
                    ? styles.buttonTitle
                    : styles.activeButtonTitle
                }
                iconSize={dob.length === 0 ? ICON_SIZE : ICON_SIZE_LARGE}
               // iconName={dob.length === 0 ? 'calendar-star' : 'birthday'}
                buttonIcon={
                  dob.length === 0 ? styles.buttonIcon : styles.activeButtonIcon
                }
                iconRight={true}
                //shouldUseEmoji={dob.length === 0 ? false : true}
                onPress={this.showDTPicker}
                iconImageStyle={styles.iconImageStyle}
                shouldUseImage={true}
                imageUrl={BIRTHDAY_ICON}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <NumberPicker
                minNumber={MIN_WEIGHT}
                maxNumber={MAX_WEIGHT}
                unit="kilograms"
                selectedNum={weight}
                numberArray={WEIGHT_RANGE_FINAL}
                isVisible={isWeightNumPickerVisible}
                onConfirm={this.handleNumPickerForWeight}
                onCancel={this.hideWeightNumPicker}
              />
              <SelectButton
                title={weight === undefined ? 'Your Weight' : weight + ' kgs'}
                buttonStyle={
                  weight === undefined
                    ? styles.buttonStyle
                    : styles.activeButtonStyle
                }
                titleStyle={
                  weight === undefined
                    ? styles.buttonTitle
                    : styles.activeButtonTitle
                }
                iconSize={weight === undefined ? ICON_SIZE : ICON_SIZE_LARGE}
                iconName={weight === undefined ? 'scale-bathroom' : 'scales'}
                buttonIcon={
                  weight === undefined
                    ? styles.buttonIcon
                    : styles.activeButtonIcon
                }
                iconRight={true}
                //shouldUseEmoji={weight === undefined ? false : true}
                onPress={this.showWeightNumPicker}
                iconImageStyle={styles.iconImageStyle}
                shouldUseImage={true}
                imageUrl={WEIGHT_ICON}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <NumberPicker
                minNumber={MIN_HEIGHT}
                maxNumber={MAX_HEIGHT}
                unit="centimeters"
                selectedNum={height}
                numberArray={HEIGHT_RANGE_FINAL}
                isVisible={isHeightNumPickerVisible}
                onConfirm={this.handleNumPickerForHeight}
                onCancel={this.hideHeightNumPicker}
              />
              <SelectButton
                title={height === undefined ? 'Your Height' : height + ' cms'}
                buttonStyle={
                  height === undefined
                    ? styles.buttonStyle
                    : styles.activeButtonStyle
                }
                titleStyle={
                  height === undefined
                    ? styles.buttonTitle
                    : styles.activeButtonTitle
                }
                iconSize={height === undefined ? ICON_SIZE : ICON_SIZE_LARGE}
                iconName={height === undefined ? 'ruler' : 'straight_ruler'}
                buttonIcon={
                  height === undefined
                    ? styles.buttonIcon
                    : styles.activeButtonIcon
                }
                iconRight={true}
                //shouldUseEmoji={height === undefined ? false : true}
                onPress={this.showHeightNumPicker}
                iconImageStyle={styles.iconImageStyle}
                shouldUseImage={true}
                imageUrl={HEIGHT_ICON}
              />
            </TouchableOpacity>
            {showTargetWeightButton && (
              <TouchableOpacity>
                <TargetWeightTimeline
                  isVisible={isTargetWeightTimelineVisible}
                  goal={goal}
                  fitnessLevel={fitnessLevel}
                  weight={weight}
                  programs={programs}
                  program={program}
                  targetWeight={targetWeight}
                  onConfirm={this.handleTargetWeightAndProgram}
                  onClose={this.hideTargetWeightTimeline}
                />
                <SelectButton
                  title={
                    targetWeight === undefined && program === undefined
                      ? 'Your Target Weight'
                      : targetWeight + ' kgs in ' + program + ' Weeks'
                  }
                  buttonStyle={
                    targetWeight === undefined
                      ? styles.buttonStyle
                      : styles.activeButtonStyle
                  }
                  titleStyle={
                    targetWeight === undefined
                      ? styles.buttonTitle
                      : styles.activeButtonTitle
                  }
                  iconSize={
                    targetWeight === undefined ? ICON_SIZE : ICON_SIZE_LARGE
                  }
                  iconName={targetWeight === undefined ? 'bullseye' : 'dart'}
                  buttonIcon={
                    targetWeight === undefined
                      ? styles.buttonIcon
                      : styles.activeButtonIcon
                  }
                  iconRight={true}
                  //shouldUseEmoji={targetWeight === undefined ? false : true}
                  onPress={this.showTargetWeightTimeline}
                  iconImageStyle={styles.iconImageStyle}
                  shouldUseImage={true}
                  imageUrl={TARGET_ICON}
                />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
