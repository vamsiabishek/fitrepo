import React, {Component} from 'react';
import {
  Appearance,
  KeyboardAvoidingView,
  TouchableOpacity,
  UIManager,
  View,
  Alert,
  Platform,
} from 'react-native';
import SelectButton from '../components/SelectButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatetimeAndroidPicker from '../components/Picker/DatetimeAndroidPicker';
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
  getHeightLabel,
  getWeightLabel,
} from '../common/Common';
import Heights from '../common/HeightValues';
import Weights from '../common/WeightValues';

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

  componentDidUpdate() {
    const {targetWeight, showNavButtonIfTargetWeightAvailable} = this.props;
    if (targetWeight) {
      showNavButtonIfTargetWeightAvailable();
    }
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
    if (ageFromDate < 15) {
      Alert.alert(
        'Incorrect Date !',
        'Age must be 15 years & above. Please choose another date.',
      );
    } else {
      this.props.setDob(newDate, ageFromDate);
      this.hideDTPicker();
    }
  };
  handleNumPickerForWeight = (number) => {
    const weight = parseFloat(number.split('kg')[0]);
    this.props.setWeight(weight);
    this.hideWeightNumPicker();
  };
  handleNumPickerForHeight = (number) => {
    const height = parseInt(number.split('cm')[0]);
    this.props.setHeight(height);
    this.hideHeightNumPicker();
  };
  handleTargetWeightAndProgram = (targetWeight, program) => {
    this.props.setTargetWeightAndProgram(targetWeight, program);
    this.hideTargetWeightTimeline();
  };

  isValidNumValue = (value) => value !== undefined && value > 0;

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
    const hasWeight = this.isValidNumValue(weight);
    const hasHeight = this.isValidNumValue(height);
    const currentDate = new Date();
    const selectedHeight = Heights.find((hght) =>
      hght.startsWith(`${height}cm`),
    );
    const selectedWeight = Weights.find((wgt) => wgt.startsWith(`${weight}kg`));
    const dateValue =
      dob && !dob.includes('Date') ? new Date(dob) : currentDate;
    // const dateValue = birthDate ? birthDate : currentDate;
    // console.log('props personal details : ', this.props);
    return (
      <View style={styles.mainContent}>
        <KeyboardAvoidingView behaviour="position">
          <View style={styles.inputOuterViewContainer}>
            <TouchableOpacity>
              {Platform.OS === 'ios' ? (
                <DateTimePickerModal
                  mode="date"
                  isDarkModeEnabled={Appearance.getColorScheme() === 'dark'}
                  date={dateValue}
                  minimumDate={MIN_DATE}
                  maximumDate={MAX_DATE}
                  isVisible={isDTPickerVisible}
                  onConfirm={this.handleDTPicker}
                  onCancel={this.hideDTPicker}
                />
              ) : (
                <DatetimeAndroidPicker
                  isVisible={isDTPickerVisible}
                  minDate={MIN_DATE}
                  maxDate={MAX_DATE}
                  date={dateValue}
                  onConfirm={this.handleDTPicker}
                  onCancel={this.hideDTPicker}
                />
              )}
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
                unit="kilograms | pounds"
                selectedNum={selectedWeight}
                numberArray={WEIGHT_RANGE_FINAL}
                isVisible={isWeightNumPickerVisible}
                onConfirm={this.handleNumPickerForWeight}
                onCancel={this.hideWeightNumPicker}
              />
              <SelectButton
                title={hasWeight ? getWeightLabel(weight) : 'Your Weight'}
                buttonStyle={
                  hasWeight ? styles.activeButtonStyle : styles.buttonStyle
                }
                titleStyle={
                  hasWeight ? styles.activeButtonTitle : styles.buttonTitle
                }
                iconSize={hasWeight ? ICON_SIZE_LARGE : ICON_SIZE}
                iconName={hasWeight ? 'scales' : 'scale-bathroom'}
                buttonIcon={
                  hasWeight ? styles.activeButtonIcon : styles.buttonIcon
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
                unit="centimeters | feet inch"
                selectedNum={selectedHeight}
                numberArray={HEIGHT_RANGE_FINAL}
                isVisible={isHeightNumPickerVisible}
                onConfirm={this.handleNumPickerForHeight}
                onCancel={this.hideHeightNumPicker}
              />
              <SelectButton
                title={hasHeight ? getHeightLabel(height) : 'Your Height'}
                buttonStyle={
                  hasHeight ? styles.activeButtonStyle : styles.buttonStyle
                }
                titleStyle={
                  hasHeight ? styles.activeButtonTitle : styles.buttonTitle
                }
                iconSize={hasHeight ? ICON_SIZE_LARGE : ICON_SIZE}
                iconName={hasHeight ? 'straight_ruler' : 'ruler'}
                buttonIcon={
                  hasHeight ? styles.activeButtonIcon : styles.buttonIcon
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
