import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, ScrollView , ActivityIndicator, LayoutAnimation} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { commonStyles, SCREEN_WIDTH } from "../../assets/style/stylesCommon";
import { GRADIENT_BG_IMAGE, EMAIL_VERIFICATION, PASSWORD_LENGTH_MINIMUM } from "../common/Common";
import Header from "../components/signup/Header";
import NavNextButton from "../components/signup/NavNextButton";
import Goal from "./Goal";
import Gender from "./Gender";
import PersonalDetails from "./PersonalDetails";
import FitnessLevel from "./FitnessLevel";
import FoodSources from "./FoodSources";
import SocialMediaSignup from "./SocialMediaSignup";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      gender: "",
      fitnessLevel: "",
      navButtonActive: false,
      screen: 1,
      proteinSources: [
        {
          name: "Chicken breast",
          uri: require("../../assets/images/sources/chicken-breast.png")
        },
        {
          name: "Salmon",
          uri: require("../../assets/images/sources/salmon.png")
        },
        { name: "Eggs", uri: require("../../assets/images/sources/eggs.png") },
        {
          name: "Panner",
          uri: require("../../assets/images/sources/panner.png")
        },
        { name: "Tofu", uri: require("../../assets/images/sources/tofu.png") },
        { name: "Rajma", uri: require("../../assets/images/sources/rajma.png") }
      ],
      carbSources: [
        { name: "White rice" },
        { name: "Chapati" },
        { name: "Bread" }
      ],
      fatSources: [
        { name: "Chia seeds" },
        { name: "Flax seeds" },
        { name: "Almonds" }
      ],
      selectedProteinSources: [],
      selectedCarbSources: [],
      selectedFatSources: [],
      showModal: false,
      modalContains: "",
      searchTerm: "",
      selectedSources: [],
      sources: [],
      filteredSources: [],
      searchTerm: "",
      sourcesButtonLabel: "SKIP",
      email: "",
      password: "",
      confirmationPassword: "",
      emailValid: true,
      passwordValid: true,
      confirmationPasswordValid: true,
      user: {},
      isLoading: false,
    };
  }
  setGoal = goal => {
    this.setState({ goal, navButtonActive: true });
  };
  setGender = gender => {
    this.setState({ gender, navButtonActive: true });
  };
  setFitnessLevel = fitnessLevel => {
    this.setState({ fitnessLevel, navButtonActive: true });
  };

  setUser = user => {
    this.setState({ user });
  };

  onNext = async currentScreen => {
    let isScrollable = false;
    if (currentScreen === 1 && this.state.goal > 0) isScrollable = true;
    if (currentScreen === 2 && this.state.gender >= 0) isScrollable = true;
    if (currentScreen === 3 && this.state.fitnessLevel > 0) isScrollable = true;
    if (currentScreen === 4) {
      await this.createNewUser()
      isScrollable = true;
    }
    if (currentScreen === 5) isScrollable = true;
    if (currentScreen === 6) isScrollable = true;
    if (isScrollable && this.scrollRef) {
      const scrollValue = SCREEN_WIDTH * currentScreen;
      this.scrollRef.scrollTo({ x: scrollValue });
      this.setState({ screen: this.state.screen + 1, navButtonActive: false });
    }
  };

  // source selection methods
  removeProteinSource = index => {
    if (index > -1) {
      let { selectedProteinSources } = this.state;
      const sources = this.unSelectSource(selectedProteinSources[index]);
      selectedProteinSources.splice(index, 1);
      let sourcesButtonLabel = this.changeSourceButtonLabel();
      this.setState({ selectedProteinSources, sources, sourcesButtonLabel });
    }
  };
  removeCarbSource = index => {
    if (index > -1) {
      let { selectedCarbSources } = this.state;
      const sources = this.unSelectSource(selectedCarbSources[index]);
      selectedCarbSources.splice(index, 1);
      let sourcesButtonLabel = this.changeSourceButtonLabel();
      this.setState({ selectedCarbSources, sources, sourcesButtonLabel });
    }
  };
  removeFatSource = index => {
    if (index > -1) {
      let { selectedFatSources } = this.state;
      const sources = this.unSelectSource(selectedFatSources[index]);
      selectedFatSources.splice(index, 1);
      let sourcesButtonLabel = this.changeSourceButtonLabel();
      this.setState({ selectedFatSources, sources, sourcesButtonLabel });
    }
  };
  removeSource = (index, sourceType) => {
    if (sourceType === "protein") this.removeProteinSource(index);
    else if (sourceType === "carbs") this.removeCarbSource(index);
    else if (sourceType === "fat") this.removeFatSource(index);
  };
  unSelectSource = selectedSource => {
    let { sources } = this.state;
    const selectedIndexFromSources = sources.findIndex(
      source => source.name === selectedSource.name
    );
    sources[selectedIndexFromSources].selected = false;
    return sources;
  };
  addProtein = () => {
    this.setState({
      showModal: true,
      modalContains: "protein",
      selectedSources: this.state.selectedProteinSources,
      sources: this.state.proteinSources,
      filteredSources: this.state.proteinSources,
      searchTerm: ""
    });
  };
  addCarbs = () => {
    this.setState({
      showModal: true,
      modalContains: "carbs",
      selectedSources: this.state.selectedCarbSources,
      sources: this.state.carbSources,
      filteredSources: this.state.carbSources,
      searchTerm: ""
    });
  };
  addFat = () => {
    this.setState({
      showModal: true,
      modalContains: "fat",
      selectedSources: this.state.selectedFatSources,
      sources: this.state.fatSources,
      filteredSources: this.state.fatSources,
      searchTerm: ""
    });
  };
  addSource = sourceType => {
    if (sourceType === "protein") this.addProtein();
    else if (sourceType === "carbs") this.addCarbs();
    else if (sourceType === "fat") this.addFat();
  };
  onSourceToggle = (index, selected) => {
    const { sources, selectedSources, modalContains } = this.state;

    if (selectedSources.length < 4) {
      const selectedSource = sources[index];
      sources[index].selected = !selected;
      if (!selected) selectedSources.push(this.state.sources[index]);
      else {
        const selectedIndex = selectedSources.findIndex(
          source => source.name === selectedSource.name
        );
        if (selectedIndex > -1) selectedSources.splice(selectedIndex, 1);
      }

      let sourcesButtonLabel = this.changeSourceButtonLabel();

      if (modalContains === "protein")
        this.setState({
          sources,
          selectedSources,
          selectedProteinSources: selectedSources,
          sourcesButtonLabel
        });
      else if (modalContains === "carbs")
        this.setState({
          sources,
          selectedSources,
          selectedCarbSources: selectedSources,
          sourcesButtonLabel
        });
      else if (modalContains === "fat")
        this.setState({
          sources,
          selectedSources,
          selectedFatSources: selectedSources,
          sourcesButtonLabel
        });
    } else {
      alert("You can only select 4 " + modalContains + " sources");
    }
  };

  changeSourceButtonLabel = () => {
    const {
      selectedProteinSources,
      selectedCarbSources,
      selectedFatSources
    } = this.state;
    let { sourcesButtonLabel } = this.state;
    if (
      selectedProteinSources.length > 0 ||
      selectedCarbSources.length > 0 ||
      selectedFatSources.length > 0
    )
      sourcesButtonLabel = "NEXT";
    else sourcesButtonLabel = "SKIP";
    return sourcesButtonLabel;
  };

  onCancel = () => {
    this.setState({ showModal: false });
  };

  onConfirm = () => {
    console.log("selectedSources:", this.state.selectedSources);
    this.setState({ showModal: false });
  };

  filterSources = searchTerm => {
    const { sources } = this.state;
    this.setState({ searchTerm });

    let filteredSources = [];

    sources &&
      sources.forEach(source => {
        const parts = searchTerm
          .replace(/[\^$\\.*+?()[\]{}|]/g, "\\$&")
          .trim()
          .split(" ");
        const regex = new RegExp(`(${parts.join("|")})`, "i");

        if (regex.test(source.name)) {
          filteredSources.push(source);
        }
      });

    console.log("filteredSources: ", filteredSources);

    this.setState({ searchTerm, filteredSources });
  };

  // signup methods
  validateEmail = (email, emailRef) => {
    //const { email } = this.state;
    const emailValid = EMAIL_VERIFICATION.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    if (!emailValid) {
      emailRef.focus();
      emailRef.shake();
    }
    return emailValid;
  };
  validatePassword = (password, passwordRef) => {
    // const { password } = this.state;
    const passwordValid = password.length >= PASSWORD_LENGTH_MINIMUM;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    if (!passwordValid) {
      passwordRef.focus();
      passwordRef.shake();
    }
    return passwordValid;
  };
  validateConfirmationPassword = (confirmationPassword, confirmPasswordRef) => {
    const { password } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    if(confirmPasswordRef)
      confirmationPasswordValid || confirmPasswordRef.shake();
    return confirmationPasswordValid;
  };
  onEmailChange = email => {
    const {password, confirmationPassword} = this.state
    const navButtonActive = this.validateCredentials({email, password, confirmationPassword})
    this.setState({ email, navButtonActive });
  };
  onPasswordChange = password => {
    const {email, confirmationPassword} = this.state
    const navButtonActive = this.validateCredentials({email, password, confirmationPassword})
    this.setState({ password, navButtonActive });
  };
  onConfirmPasswordChange = confirmationPassword => {
    const {password, email} = this.state
    const navButtonActive = this.validateCredentials({email, password, confirmationPassword})
    this.validateConfirmationPassword(confirmationPassword);
    this.setState({ confirmationPassword, navButtonActive });
  };

  validateCredentials = ({email, password, confirmationPassword}) => {
    const { emailValid, passwordValid } = this.state;
    if (
      email !== "" &&
      password !== "" &&
      confirmationPassword !== "" &&
      password === confirmationPassword &&
      emailValid &&
      passwordValid
    )
      return true;
    return false;
  };

  createNewUser = async () => {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(userObj => {
          const user = {
            uid: userObj.user.uid
          };
          this.setState({ user });
        })
        .catch(error => {
          this.setState({ isLoading: false });
          //console.log(
          //  "error while creating user with email and password",
          //  error
          //);
          alert(error.message);
        });
    } catch (error) {
      this.setState({ isLoading: false });
      //console.log(
      //  "error before creating user with email and password",
      //  error
      //);
    }
  };

  render() {
    const {
      goal,
      gender,
      fitnessLevel,
      navButtonActive,
      screen,
      sourcesButtonLabel,
      selectedProteinSources,
      selectedCarbSources,
      selectedFatSources,
      showModal,
      modalContains,
      selectedSources,
      filteredSources,
      email,
      password,
      confirmationPassword,
      usernameValid,
      emailValid,
      passwordValid,
      confirmationPasswordValid,
      isLoading
    } = this.state;
    const signupObject = {
      email,
      password,
      confirmationPassword,
      usernameValid,
      emailValid,
      passwordValid,
      confirmationPasswordValid,
      onEmailChange: this.onEmailChange,
      onPasswordChange: this.onPasswordChange,
      onConfirmPasswordChange: this.onConfirmPasswordChange,
      validateEmail: this.validateEmail,
      validatePassword: this.validatePassword,
      validateConfirmationPassword: this.validateConfirmationPassword
    };
    return (
      <View style={commonStyles.container}>
        <ImageBackground
          source={GRADIENT_BG_IMAGE}
          style={commonStyles.bgImage}
        > 
          {isLoading && <ActivityIndicator/>}
          {!isLoading && 
          <ScrollView
            horizontal="true"
            scrollEnabled="false"
            ref={scrollView => {
              this.scrollRef = scrollView;
            }}
          >
            <View style={commonStyles.subContainer}>
              <Header title="What is your goal ?" />
              <Goal goal={goal} setGoal={this.setGoal} />
              <NavNextButton
                isActive={navButtonActive}
                screen={screen}
                onNext={this.onNext}
              />
            </View>
            <View style={commonStyles.subContainer}>
              <Header title="GENDER !" />
              <Gender gender={gender} setGender={this.setGender} />
              <NavNextButton
                isActive={navButtonActive}
                screen={screen}
                onNext={this.onNext}
              />
            </View>
            <View style={commonStyles.subContainer}>
              <Header title="What is your activity level ?" marginTop={120} />
              <FitnessLevel
                gender={gender}
                selectedLevel={fitnessLevel}
                setFitnessLevel={this.setFitnessLevel}
                levels={[1, 2, 3]}
              />
              <NavNextButton
                isActive={navButtonActive}
                screen={screen}
                onNext={this.onNext}
              />
            </View>
            <View style={commonStyles.subContainer}>
              <Header title="SIGN UP !" />
              <SocialMediaSignup
                signupObject={signupObject}
                setUser={this.setUser}
              />
              <NavNextButton
                isActive={navButtonActive}
                screen={screen}
                onNext={this.onNext}
              />
            </View>
            <View style={commonStyles.subContainer}>
              <Header title="Lets's get to know you Better !" />
              <PersonalDetails />
              <NavNextButton
                isActive={navButtonActive}
                screen={screen}
                onNext={this.onNext}
              />
            </View>
            <View style={commonStyles.subContainer}>
              <Header title="Would you like to choose ?" marginTop={110} />
              <FoodSources
                selectedProteinSources={selectedProteinSources}
                selectedCarbSources={selectedCarbSources}
                selectedFatSources={selectedFatSources}
                showModal={showModal}
                modalContains={modalContains}
                selectedSources={selectedSources}
                filteredSources={filteredSources}
                removeSource={this.removeSource}
                addSource={this.addSource}
                onSourceToggle={this.onSourceToggle}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                filterSources={this.filterSources}
              />
              <NavNextButton
                isActive={true}
                screen={screen}
                onNext={this.onNext}
                buttonText={sourcesButtonLabel}
              />
            </View>
          </ScrollView>
          }
        </ImageBackground>
      </View>
    );
  }
}
