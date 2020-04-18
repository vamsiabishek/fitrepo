import React, {Component} from 'react';
import {
  Appearance,
  LayoutAnimation,
  KeyboardAvoidingView,
  TouchableOpacity,
  UIManager,
  View,
  Alert,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectButton from '../components/SelectButton';
import {styles} from '../../assets/style/stylesEditProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MIN_DATE, MAX_DATE, EMAIL_VERIFICATION} from '../common/Common';
import {
  styleCommon,
  ICON_SIZE,
  btnGradientColorLeft,
  btnGradientColorRight,
  btnGradientColorRightDisabled,
  ICON_SELECT_GENDER_MED,
} from '../../assets/style/stylesCommonValues';
import LinearGradient from 'react-native-linear-gradient';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class EditProfileSubScreen1 extends Component {
  constructor(props) {
    super(props);
    const user = props.userDets || {};
    const {gender} = user;
    this.state = {
      isLoading: false,
      user,
      usernameValid: true,
      emailValid: true,
      nameValid: true,
      isDTPickerVisible: false,
      dobAgeValid: true,
      errorMsgWtAge: '',
      isActive: false,
      showGender: gender >= 0 ? false : true,
    };
    this.selectedDate = this.state.user.dob
      ? new Date(this.state.user.dob)
      : new Date();
  }

  validateUsername = () => {
    const {username} = this.state.user;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({usernameValid});
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  };
  validateEmail = () => {
    const {email} = this.state.user;
    const emailValid = EMAIL_VERIFICATION.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({emailValid});
    emailValid || this.emailInput.shake();
    return emailValid;
  };
  showDTPicker = () => {
    this.setState({isDTPickerVisible: true});
  };
  hideDTPicker = () => {
    this.setState({isDTPickerVisible: false});
  };
  handleDTPicker = (date) => {
    const {user} = this.state;
    let currentDate = new Date();
    let dateFormat = new Date(date);
    let newDate = dateFormat.toDateString().substring(4);
    let ageFromDate = currentDate.getFullYear() - dateFormat.getFullYear();
    //LayoutAnimation.easeInEaseOut();
    this.setState({
      user: {...user, dob: newDate, age: ageFromDate},
      isActive: true,
    });
    this.hideDTPicker();
  };
  onDateChangePicker = (date) => {
    this.selectedDate = date;
  };
  validateName = () => {
    const {name} = this.state.user;
    const nameValid = name.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({nameValid});
    nameValid || this.nameInput.shake();
    return nameValid;
  };
  validateDobAndAge = () => {
    const {dob, age} = this.state.user;
    if (age !== null) {
      const dobAgeValid = dob.length > 0 && age > 15;
      const errorMsgWtAge = 'You should be 15 years & above!';
      //LayoutAnimation.easeInEaseOut();
      this.setState({dobAgeValid, errorMsgWtAge});
      dobAgeValid || this.dobInput.shake();
      return dobAgeValid;
    } else {
      const dobAgeValid = dob.length > 0;
      const errorMsgWtAge = 'Please select a Date!';
      //LayoutAnimation.easeInEaseOut();
      this.setState({dobAgeValid, errorMsgWtAge});
      dobAgeValid || this.dobInput.shake();
      return dobAgeValid;
    }
  };
  validateGender = () => {
    const {gender} = this.state.user;
    if (gender === 0 || gender === 1) {
      return true;
    } else {
      Alert.alert('*Select gender*');
    }
    return false;
  };
  goToNextSubSection = () => {
    LayoutAnimation.easeInEaseOut();
    const {name, username, dob, age, email, gender} = this.state.user;
    const usernameValid = this.validateUsername();
    const emailValid = this.validateEmail();
    const nameValid = this.validateName();
    const dobageValid = this.validateDobAndAge();
    const validGender = this.validateGender();
    // const progress = true;
    if (
      usernameValid &&
      emailValid &&
      dobageValid &&
      nameValid &&
      validGender
    ) {
      const setUserPartial = {
        name,
        username,
        dob,
        age,
        email,
        gender,
      };
      this.props.setSubScreenUserVals(setUserPartial); // progress
    }
  };

  setGender = (gender) => {
    const {user} = this.state;
    this.setState({user: {...user, gender}, isActive: true});
  };
  render() {
    const {
      isLoading,
      user,
      emailValid,
      usernameValid,
      nameValid,
      isDTPickerVisible,
      dobAgeValid,
      errorMsgWtAge,
      isActive,
      showGender,
    } = this.state;
    const dateInDatetime = new Date(user.dob);
    const {gender} = user || {};
    const buttonIconColor = styleCommon.secondaryButtonTextColor;
    const buttonIconActiveColor = styleCommon.textColor2;
    return (
      <View>
        <KeyboardAvoidingView
          behaviour="position"
          contentContainerStyle={styles.formContainer}>
          <View style={styles.inputOuterViewContainer}>
            {showGender && (
              <View style={styles.mainContent}>
                <SelectButton
                  buttonStyle={
                    gender === 1 ? styles.activeButtonStyle : styles.buttonStyle
                  }
                  iconSize={ICON_SELECT_GENDER_MED}
                  iconName={gender === 1 ? 'man-raising-hand' : 'man'}
                  buttonIcon={styles.buttonIcon}
                  buttonIconColor={
                    gender === 1 ? buttonIconActiveColor : buttonIconColor
                  }
                  iconLeft
                  shouldUseEmoji={true}
                  onPress={this.setGender}
                  value={1}
                />
                <SelectButton
                  buttonStyle={
                    gender === 0 ? styles.activeButtonStyle : styles.buttonStyle
                  }
                  titleStyle={
                    gender === 0 ? styles.activeButtonTitle : styles.buttonTitle
                  }
                  iconSize={ICON_SELECT_GENDER_MED}
                  iconName={gender === 0 ? 'woman-raising-hand' : 'woman'}
                  buttonIcon={styles.buttonIcon}
                  buttonIconColor={
                    gender === 0 ? buttonIconActiveColor : buttonIconColor
                  }
                  iconLeft
                  shouldUseEmoji={true}
                  onPress={this.setGender}
                  value={0}
                />
              </View>
            )}
            <Input
              placeholder="Username"
              placeholderTextColor={styles.inputStyle.color}
              rightIcon={
                <Icon
                  name="account-box"
                  color={styleCommon.iconColor}
                  size={ICON_SIZE}
                />
              }
              containerStyle={styles.inputViewContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errorStyle={styles.errorInputStyle}
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={true}
              keyboardAppearance="light"
              keyboardType="default"
              returnKeyType="done"
              onChangeText={(username) =>
                this.setState({
                  user: {...user, username},
                  isActive: true,
                })
              }
              value={user.username}
              ref={(input) => (this.usernameInput = input)}
              onSubmitEditing={() => {
                this.setState({usernameValid: this.validateUsername});
                this.emailInput.focus();
              }}
              errorMessage={
                usernameValid ? null : "Your username can't be blank"
              }
            />
            <Input
              placeholder="Email"
              placeholderTextColor={styles.inputStyle.color}
              rightIcon={
                <Icon
                  name="email"
                  color={styleCommon.iconColor}
                  size={ICON_SIZE}
                />
              }
              containerStyle={styles.inputViewContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errorStyle={styles.errorInputStyle}
              editable={true}
              keyboardAppearance="light"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={true}
              returnKeyType="done"
              onChangeText={(email) =>
                this.setState({user: {...user, email}, isActive: true})
              }
              value={user.email}
              ref={(input) => (this.emailInput = input)}
              onSubmitEditing={() => {
                this.setState({emailValid: this.validateEmail});
                this.passwordInput.focus();
              }}
              errorMessage={
                emailValid ? null : 'Please enter a valid email address!'
              }
            />
            <Input
              placeholder="Name"
              placeholderTextColor={styles.inputStyle.color}
              rightIcon={
                <Icon
                  name="alpha-n-box"
                  color={styleCommon.iconColor}
                  size={ICON_SIZE}
                />
              }
              containerStyle={styles.inputViewContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errorStyle={styles.errorInputStyle}
              onChangeText={(name) =>
                this.setState({user: {...user, name}, isActive: true})
              }
              value={user.name}
              keyboardAppearance="light"
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              blurOnSubmit={true}
              returnKeyType="done"
              ref={(input) => (this.nameInput = input)}
              onSubmitEditing={() => {
                this.setState({nameValid: this.validateName});
                this.dobInput.focus();
              }}
              errorMessage={nameValid ? null : 'Please enter a Name!'}
            />
            <TouchableOpacity onPress={this.showDTPicker}>
              <DateTimePickerModal
                mode="date"
                isDarkModeEnabled={Appearance.getColorScheme() === 'dark'}
                date={this.selectedDate ? this.selectedDate : dateInDatetime}
                minimumDate={MIN_DATE}
                maximumDate={MAX_DATE}
                isVisible={isDTPickerVisible}
                onDateChange={this.onDateChangePicker}
                onConfirm={this.handleDTPicker}
                onCancel={this.hideDTPicker}
              />
              <View pointerEvents="none">
                <Input
                  placeholder="Date of Birth"
                  placeholderTextColor={styles.inputStyle.color}
                  rightIcon={
                    <Icon
                      name="calendar"
                      color={styleCommon.iconColor}
                      size={ICON_SIZE}
                    />
                  }
                  containerStyle={styles.inputViewContainer}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  onChangeText={(date) =>
                    this.setState({
                      user: {...user, dob: date},
                      isActive: true,
                    })
                  }
                  value={user.dob}
                  keyboardAppearance="light"
                  keyboardType="default"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  editable={false}
                  returnKeyType="done"
                  ref={(input) => (this.dobInput = input)}
                  onSubmitEditing={() => {
                    this.setState({dobAgeValid: this.validateDobAndAge});
                  }}
                  errorMessage={dobAgeValid ? null : errorMsgWtAge}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Button
            title="SAVE & GO BACK"
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [
                btnGradientColorLeft,
                isActive
                  ? btnGradientColorRight
                  : btnGradientColorRightDisabled,
              ],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            containerStyle={styles.btsButtonContainer}
            buttonStyle={
              isActive ? styles.btsButtonStyle : styles.btsButtonDisableStyle
            }
            titleStyle={
              isActive ? styles.btsButtonText : styles.btsButtonDisableText
            }
            loading={isLoading}
            onPress={this.goToNextSubSection}
            disabled={!isActive}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
