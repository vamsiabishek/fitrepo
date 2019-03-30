import React, { Component } from "react";
import {
  LayoutAnimation,
  KeyboardAvoidingView,
  Modal,
  StatusBar,
  TouchableOpacity,
  UIManager,
  View
} from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { styles } from "../../assets/style/stylesPersonalDetails";
import { commonStyles } from "../../assets/style/stylesCommon";
import NumberPicker from "../components/Picker/WeightPicker";
import { auth, database } from "../common/FirebaseConfig";
import {
  ICON_SIZE,
  MIN_DATE,
  MAX_DATE,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_WEIGHT,
  MAX_WEIGHT
} from "../common/Common";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: "",
      firstNameValid: true,
      lastName: "",
      name: "",
      selectedGenderIndex: 1,
      gender: "",
      genderValid: true,
      dob: "",
      isDTPickerVisible: false,
      dobAgeValid: true,
      age: null,
      errorMsgWtAge: ""
    };
    this.genders = ["Female", "Male", "Other"];
  }
  showDTPicker = () => {
    this.setState({ isDTPickerVisible: true });
  };
  hideDTPicker = () => {
    this.setState({ isDTPickerVisible: false });
  };
  handleDTPicker = date => {
    let currentDate = new Date();
    let dateFormat = new Date(date);
    let newDate = dateFormat.toDateString().substring(4);
    let ageFromDate = currentDate.getFullYear() - dateFormat.getFullYear();
    LayoutAnimation.easeInEaseOut();
    this.setState({
      dob: newDate,
      age: ageFromDate
    });
    this.hideDTPicker();
  };
  validateDobAndAge = () => {
    const { dob, age } = this.state;
    if (age !== null) {
      const dobAgeValid = dob.length > 0 && age > 18;
      const errorMsgWtAge = "You should be 18 years & above!";
      LayoutAnimation.easeInEaseOut();
      this.setState({ dobAgeValid, errorMsgWtAge });
      dobAgeValid || this.dobInput.shake();
      return dobAgeValid;
    } else {
      const dobAgeValid = dob.length > 0;
      const errorMsgWtAge = "Please select a Date!";
      LayoutAnimation.easeInEaseOut();
      this.setState({ dobAgeValid, errorMsgWtAge });
      dobAgeValid || this.dobInput.shake();
      return dobAgeValid;
    }
  };
  goToSignUpScreen3 = async () => {
    LayoutAnimation.easeInEaseOut();
    this.createName();
    const firstNameValid = this.validateFirstName();
    const dobValid = this.validateDobAndAge();
    const genderValid = this.validateGender();
    if (firstNameValid && dobValid && genderValid) {
      this.setState({ isLoading: true });
      try {
        const user = await auth.currentUser;
        this.updateUserWithDetails(user);
      } catch (error) {
        this.setState({ isLoading: false });
        console.log("Error before updating from :", error);
      }
    }
  };
  updateUserWithDetails = async user => {
    const { name, dob, age, gender } = this.state;
    const { navigate } = this.props.navigation;
    const extraUserDetails = {
      name,
      dob,
      age,
      gender
    };
    database
      .ref("users")
      .child(user.uid)
      .update(extraUserDetails)
      .then(() => {
        console.log(
          "Successfully updated existing user with details in page SignUpScreen2."
        );
        this.setState({ isLoading: false });
        navigate("SignUpScreen3", {
          screenName: name
        });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(
          "error while updating new user with details in page SignUpScreen2.",
          error
        );
      });
  };

  render() {
    const {
      isLoading,
      firstName,
      firstNameValid,
      lastName,
      selectedGenderIndex,
      genderValid,
      isDTPickerVisible,
      dob,
      dobAgeValid,
      errorMsgWtAge
    } = this.state;
    return (
      <View
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={commonStyles.mainContent}
      >
        <StatusBar hidden={true} />
        <KeyboardAvoidingView behaviour="position">
          <View style={styles.inputOuterViewContainer}>
            <TouchableOpacity onPress={this.showDTPicker}>
              <DateTimePicker
                mode="date"
                minimumDate={MIN_DATE}
                maximumDate={MAX_DATE}
                isVisible={isDTPickerVisible}
                onConfirm={this.handleDTPicker}
                onCancel={this.hideDTPicker}
              />
              <Input
                placeholder="Your Birthday"
                placeholderTextColor={styles.inputStyle.color}
                rightIcon={
                  <Icon
                    name="cake-variant"
                    style={styles.inputIconStyle}
                    size={ICON_SIZE}
                  />
                }
                //containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                onChangeText={dob => this.setState({ dob })}
                value={dob}
                keyboardAppearance="light"
                keyboardType="default"
                autoCorrect={false}
                blurOnSubmit={false}
                editable={false}
                returnKeyType="next"
                ref={input => (this.dobInput = input)}
                onSubmitEditing={() => {
                  this.setState({ dobAgeValid: this.validateDobAndAge });
                }}
                errorMessage={dobAgeValid ? null : errorMsgWtAge}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Input
                placeholder="Your Weight"
                placeholderTextColor={styles.inputStyle.color}
                rightIcon={
                  <Icon
                    name="scale-bathroom"
                    style={styles.inputIconStyle}
                    size={ICON_SIZE}
                  />
                }
                //containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                onChangeText={dob => this.setState({ dob })}
                value={dob}
                keyboardAppearance="light"
                keyboardType="default"
                autoCorrect={false}
                blurOnSubmit={false}
                editable={false}
                returnKeyType="next"
                ref={input => (this.dobInput = input)}
                onSubmitEditing={() => {
                  this.setState({ dobAgeValid: this.validateDobAndAge });
                }}
                errorMessage={dobAgeValid ? null : errorMsgWtAge}
              />
              {/*<NumberPicker
                minNumber={MIN_WEIGHT}
                maxNumber={MAX_WEIGHT}
                visible={true}
              />*/}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
