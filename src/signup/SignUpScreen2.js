import React, { Component } from "react";
import {
  LayoutAnimation,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  Alert
} from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RadioForm from "react-native-simple-radio-button";
import DateTimePicker from "react-native-modal-datetime-picker";
import { styles } from "../../assets/style/stylesSignUpScreen2";
import { auth, database } from "../common/FirebaseConfig";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class SignUpScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: "",
      nameValid: true,
      genders: [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" },
        { label: "Transgender", value: "Transgender" }
      ],
      gender: "",
      dob: "",
      isDTPickerVisible: false,
      dobValid: true,
      age: null,
      ageString: "",
      ageValid: true,
      levels: [
        { label: "Beginner", value: "Beginner" },
        { label: "Intermediate", value: "Intermediate" },
        { label: "Advanced", value: "Advanced" }
      ],
      level: "",
      weight: null,
      weightString: "",
      weightValid: true,
      height: null,
      heightString: "",
      heightValid: true,
      latitude: null,
      longitude: null,
      error: ""
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  onGenderChange = value => {
    this.setState({
      gender: value
    });
  };
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
    this.setState({
      dob: newDate,
      age: ageFromDate,
      ageString: ageFromDate.toString()
    });
    this.hideDTPicker();
  };
  onLevelChange = value => {
    this.setState({
      level: value
    });
  };
  validateName = () => {
    const { name } = this.state;
    const nameValid = name.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ nameValid });
    nameValid || this.nameInput.shake();
    return nameValid;
  };
  validateDob = () => {
    const { dob } = this.state;
    const dobValid = dob.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ dobValid });
    dobValid || this.dobInput.shake();
    return dobValid;
  };
  validateAge = () => {
    const { age } = this.state;
    const ageValid = age > 18;
    LayoutAnimation.easeInEaseOut();
    this.setState({ ageValid });
    ageValid || this.ageInput.shake();
    return ageValid;
  };
  validateWeight = () => {
    const { weight, weightString } = this.state;
    this.setState({ weight: parseFloat(weightString) });
    const weightValid = weight < 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ weightValid });
    weightValid || this.weightInput.shake();
    return weightValid;
  };
  validateHeight = () => {
    const { height, heightString } = this.state;
    this.setState({ height: parseFloat(heightString) });
    const heightValid = height < 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ heightValid });
    heightValid || this.heightInput.shake();
    return heightValid;
  };
  goToHomeScreen = async () => {
    LayoutAnimation.easeInEaseOut();
    const nameValid = this.validateName();
    const dobValid = this.validateDob();
    const ageValid = this.validateAge();
    const weightValid = this.validateWeight();
    const heightValid = this.validateHeight();
    const {
      name,
      gender,
      dob,
      age,
      level,
      weight,
      height,
      latitude,
      longitude
    } = this.state;
    if (nameValid && dobValid && ageValid && weightValid && heightValid) {
      this.setState({ isLoading: true });
      try {
        await auth
          .updateCurrentUser(user)
          .then(userObj => this.updateUserWithOtherDetails(userObj.user))
          .catch(error => {
            this.setState({ isLoading: false });
            console.log("error while updating user:", error);
            alert(error.message);
          });
      } catch (error) {
        this.setState({ isLoading: false });
        console.log("error before updating user:", error);
      }
    }
  };

  updateUserWithOtherDetails = async user => {
    const {
      name,
      gender,
      dob,
      age,
      level,
      weight,
      height,
      latitude,
      longitude
    } = this.state;
    const { navigate } = this.props.navigation;
    const extraUserDetails = {
      name,
      gender,
      dob,
      age,
      level,
      weight,
      height,
      latitude,
      longitude
    };
    database
      .ref("users")
      .child(user.id)
      .update(extraUserDetails)
      .then(() => {
        console.log("Successfully updated existing user with details");
        this.setState({ isLoading: false });
        navigate("HomeScreen");
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log("error while updating new user with details:", error);
      });
  };

  render() {
    const {
      isLoading,
      name,
      nameValid,
      genders,
      gender,
      isDTPickerVisible,
      dob,
      dobValid,
      ageString,
      ageValid,
      weightString,
      weightValid,
      heightString,
      heightValid,
      levels,
      level
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          behaviour="position"
          contentContainerStyle={styles.formContainer}
        >
          <View style={styles.viewContainer}>
            <Text style={styles.signUpText}>Other Details...</Text>
          </View>
          <ScrollView
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.scrollViewContentContainer}
          >
            <View style={styles.inputOuterViewContainer}>
              <Input
                placeholder="Name"
                placeholderTextColor={styles.inputStyle.color}
                leftIcon={
                  <Icon name="alpha-n-circle" color="black" size={25} />
                }
                containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                onChangeText={name => this.setState({ name })}
                value={name}
                keyboardAppearance="light"
                keyboardType="email-address"
                autoCapitalize="words"
                autoCorrect={false}
                blurOnSubmit={false}
                returnKeyType="next"
                ref={input => (this.nameInput = input)}
                onSubmitEditing={() => {
                  this.setState({ nameValid: this.validateName });
                  this.dobInput.focus();
                }}
                errorMessage={nameValid ? null : "Name can not be blank."}
              />
              <TouchableOpacity onPress={this.showDTPicker}>
                <Input
                  placeholder="Date of Birth"
                  placeholderTextColor={styles.inputStyle.color}
                  leftIcon={<Icon name="calendar" color="black" size={25} />}
                  containerStyle={styles.inputViewContainer}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  errorStyle={styles.errorInputStyle}
                  onChangeText={dob => this.setState({ dob })}
                  value={dob}
                  keyboardAppearance="light"
                  keyboardType="email-address"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  editable={true}
                  returnKeyType="next"
                  ref={input => (this.dobInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ nameValid: this.validateDob });
                    this.ageInput.focus();
                  }}
                  errorMessage={
                    dobValid ? null : "Date of Birth can not be empty."
                  }
                />
              </TouchableOpacity>
              <DateTimePicker
                mode="date"
                isVisible={isDTPickerVisible}
                onConfirm={this.handleDTPicker}
                onCancel={this.hideDTPicker}
              />
              <Input
                placeholder="Age"
                placeholderTextColor={styles.inputStyle.color}
                leftIcon={<Icon name="numeric" color="black" size={25} />}
                containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                onChangeText={ageString => this.setState({ ageString })}
                value={ageString}
                keyboardAppearance="light"
                keyboardType="numeric"
                autoCorrect={false}
                blurOnSubmit={false}
                editable={false}
                returnKeyType="next"
                ref={input => (this.ageInput = input)}
                onSubmitEditing={() => {
                  this.setState({ ageValid: this.validateAge });
                  this.weightInput.focus();
                }}
                errorMessage={
                  ageValid ? null : "Age should be 18 Years and over."
                }
              />
              <View style={styles.radioButtonView}>
                <View styles={styles.radioButtonTextIconStyle}>
                  <View style={styles.radioButtonTextStyle}>
                    <Icon
                      name="gender-transgender"
                      size={25}
                      style={{ color: "black", marginBottom: 10 }}
                    />
                    <Text style={styles.radioButtonText}>Gender</Text>
                  </View>
                </View>
                <RadioForm
                  formHorizontal={true}
                  labelHorizontal={true}
                  radio_props={genders}
                  value={gender}
                  initial={0}
                  borderWidth={1}
                  buttonColor={"#00DB8D"}
                  selectedButtonColor={"#00DB8D"}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonStyle={{ color: "#000" }}
                  labelStyle={{
                    paddingLeft: 4,
                    paddingRight: 4,
                    color: "#44484E"
                  }}
                  buttonWrapStyle={{ marginLeft: 20 }}
                  onPress={this.onGenderChange}
                />
              </View>
              <Input
                placeholder="Weight"
                placeholderTextColor={styles.inputStyle.color}
                leftIcon={
                  <Icon name="weight-kilogram" color="black" size={25} />
                }
                containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                onChangeText={weightString =>
                  this.setState({
                    weightString
                  })
                }
                value={weightString}
                keyboardAppearance="light"
                keyboardType="numeric"
                autoCorrect={false}
                blurOnSubmit={false}
                returnKeyType="next"
                ref={input => (this.weightInput = input)}
                onSubmitEditing={() => {
                  this.setState({ weightValid: this.validateWeight });
                  this.heightInput.focus();
                }}
                errorMessage={weightValid ? null : "Invalid value for Weight."}
              />
              <Input
                placeholder="Height"
                placeholderTextColor={styles.inputStyle.color}
                leftIcon={<Icon name="ruler" color="black" size={25} />}
                containerStyle={styles.inputViewContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorInputStyle}
                onChangeText={heightString =>
                  this.setState({
                    heightString
                  })
                }
                value={heightString}
                keyboardAppearance="light"
                keyboardType="numeric"
                autoCorrect={false}
                blurOnSubmit={false}
                returnKeyType="next"
                ref={input => (this.heightInput = input)}
                onSubmitEditing={() => {
                  this.setState({ heightValid: this.validateHeight });
                }}
                errorMessage={heightValid ? null : "Invalid value for Height."}
              />
              <View style={styles.radioButtonView}>
                <View styles={styles.radioButtonTextIconStyle}>
                  <View style={styles.radioButtonTextStyle}>
                    <Icon
                      name="account-star"
                      size={25}
                      style={{ color: "black", marginBottom: 10 }}
                    />
                    <Text style={styles.radioButtonText}>Level</Text>
                  </View>
                </View>
                <RadioForm
                  formHorizontal={true}
                  labelHorizontal={true}
                  radio_props={levels}
                  value={level}
                  initial={0}
                  borderWidth={1}
                  buttonColor={"#00DB8D"}
                  selectedButtonColor={"#00DB8D"}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonStyle={{ color: "#000" }}
                  labelStyle={{
                    paddingLeft: 4,
                    //paddingRight: 4,
                    color: "#44484E"
                  }}
                  buttonWrapStyle={{ marginLeft: 20 }}
                  onPress={this.onLevelChange}
                />
              </View>
            </View>
          </ScrollView>
          <Button
            title="DONE"
            loading={isLoading}
            containerStyle={styles.signUpButtonContainer}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            disabled={isLoading}
            onPress={this.updateAndGoToHome}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
