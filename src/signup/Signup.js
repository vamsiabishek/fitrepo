import React, { Component } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  LayoutAnimation,
  ScrollView,
  StatusBar,
  UIManager,
  View
} from "react-native";
import {
  GRADIENT_BG_IMAGE,
  EMAIL_VERIFICATION,
  PASSWORD_LENGTH_MINIMUM
} from "../common/Common";
import { commonStyles } from "../../assets/style/stylesCommon";
import Header from "../components/signup/Header";
import NavNextButton from "../components/signup/NavNextButton";
import Goal from "./Goal";
import Gender from "./Gender";
import PersonalDetails from "./PersonalDetails";
import PreferenceDetails from "./PreferenceDetails";
import FitnessLevel from "./FitnessLevel";
import FoodSources from "./FoodSources";
import SocialMediaSignup from "./SocialMediaSignup";
import Loading from "../components/Loading";
import { styles } from "../../assets/style/stylesSignup";
import {
  styleCommon,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from "../../assets/style/stylesCommonValues";
import { auth, database } from "../common/FirebaseConfig";
import { createDiet } from "./UpdateDiet";
import { getSourcesWithImages } from "../common/SourceUtil";
import {
  FOOD_PREF_VEG,
  FOOD_PREF_NON_VEG,
  FOOD_PREF_EGGETARIAN
} from "../common/SourceUtil";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Signup extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    console.log(navigation.getParam("isExistingUser"));
    this.state = {
      goal: "",
      gender: "",
      fitnessLevel: "",
      dob: "",
      age: undefined,
      weight: undefined,
      height: undefined,
      program: undefined,
      targetWeight: undefined,
      healthCond: undefined,
      foodPreference: FOOD_PREF_NON_VEG,
      foodPrefBtn: 2,
      numberOfMeals: 4,
      showTargetWeightButton: false,
      navButtonActive: false,
      screen: 1,
      proteinSources: getSourcesWithImages("protein"),
      carbSources: getSourcesWithImages("carb"),
      fatSources: getSourcesWithImages("fat"),
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
      uid:
        navigation.getParam("uid") !== undefined
          ? navigation.getParam("uid")
          : "",
      user: {},
      isLoading: false,
      isLoadingComponent: false,
      isLoggedIn: false,
      isExistingUser:
        navigation.getParam("isExistingUser") === true ? true : false
    };
  }

  componentDidMount = async () => {
    const { isExistingUser, uid } = this.state;
    if (isExistingUser) {
      this.setState({ isLoadingComponent: true });
      await database
        .ref("users")
        .child(uid)
        .once("value")
        .then(snapshot => {
          const userLoggedIn = snapshot.val();
          LayoutAnimation.easeInEaseOut();
          this.setState({
            user: userLoggedIn,
            age: userLoggedIn.age,
            dob: userLoggedIn.dob,
            weight: userLoggedIn.weight,
            height: userLoggedIn.height,
            gender: userLoggedIn.gender === "Male" ? 1 : 0,
            fitnessLevel: userLoggedIn.fitnessLevel,
            foodPrefBtn:
              userLoggedIn.foodPreference === FOOD_PREF_NON_VEG
                ? 2
                : userLoggedIn.foodPreference === FOOD_PREF_EGGETARIAN
                ? 1
                : 0,
            foodPreference: userLoggedIn.foodPreference,
            proteinSources: getSourcesWithImages("protein", userLoggedIn.foodPreference),
            carbSources: getSourcesWithImages("carb"),
            fatSources: getSourcesWithImages("fat"),
            isLoadingComponent: false
          });
        })
        .catch(error => {
          console.log(
            "error while fetching user details in componentDidMount of Diet:",
            error
          );
        });
    }
  };

  gotToNext = () => {
    setTimeout(() => this.onNext(this.state.screen), 400);
  };

  setGoal = goal => {
    this.setState({ goal });
    this.gotToNext();
  };
  setGender = gender => {
    this.setState({ gender });
    this.gotToNext();
  };
  setFitnessLevel = fitnessLevel => {
    this.setState({ fitnessLevel });
    this.gotToNext();
  };
  setFBUser = user => {
    this.setState({ user, dob: user.dob, age: user.age });
    this.scrollToNextScreen(4);
  };
  setDob = (dob, age) => {
    const { weight, height } = this.state;
    let showTargetWeightButton = this.changeShowTargetWeightButton(
      dob,
      weight,
      height
    );
    this.setState({ dob, age, showTargetWeightButton });
  };
  setWeight = weight => {
    const { dob, height } = this.state;
    let showTargetWeightButton = this.changeShowTargetWeightButton(
      dob,
      weight,
      height
    );
    this.setState({ weight, showTargetWeightButton });
  };
  setHeight = height => {
    const { dob, weight } = this.state;
    let showTargetWeightButton = this.changeShowTargetWeightButton(
      dob,
      weight,
      height
    );
    this.setState({ height, showTargetWeightButton });
  };
  setHealthCond = healthCond => {
    this.setState({ healthCond });
  };
  setFoodPref = foodPrefBtn => {
    const { numberOfMeals } = this.state;
    let {
      proteinSources,
      carbSources,
      fatSources,
      foodPreference
    } = this.state;
    if (foodPrefBtn === 0) foodPreference = FOOD_PREF_VEG;
    else if (foodPrefBtn === 1) foodPreference = FOOD_PREF_EGGETARIAN;
    else if (foodPrefBtn === 2) foodPreference = FOOD_PREF_NON_VEG;
    proteinSources = getSourcesWithImages("protein", foodPreference);
    carbSources = getSourcesWithImages("carb");
    fatSources = getSourcesWithImages("fat");
    this.setState({
      foodPrefBtn,
      foodPreference,
      navButtonActive: this.changeNavButtonToActive(foodPrefBtn, numberOfMeals),
      proteinSources,
      carbSources,
      fatSources
    });
  };
  setNoOfMeals = numberOfMeals => {
    const { foodPrefBtn } = this.state;
    this.setState({
      numberOfMeals,
      navButtonActive: this.changeNavButtonToActive(foodPrefBtn, numberOfMeals)
    });
  };
  changeShowTargetWeightButton = (dob, weight, height) => {
    if (dob.length > 0 && weight !== undefined && height !== undefined) {
      return true;
    } else {
      return false;
    }
  };
  changeNavButtonToActive = (foodPrefBtn, numberOfMeals) => {
    if (foodPrefBtn >= 0 && foodPrefBtn.length !== 0 && numberOfMeals > 0) {
      return true;
    } else {
      return false;
    }
  };
  setTargetWeightAndProgram = (targetWeight, program) => {
    this.setState({ targetWeight, program, navButtonActive: true });
  };

  scrollToNextScreen = (currentScreen, isLoggedIn) => {
    if (isLoggedIn && currentScreen === 3) {
      const scrollValue = SCREEN_WIDTH * (currentScreen + 1);
      this.scrollRef.scrollTo({ x: scrollValue });
      this.setState({ screen: this.state.screen + 2, navButtonActive: false });
    } else {
      const scrollValue = SCREEN_WIDTH * currentScreen;
      this.scrollRef.scrollTo({ x: scrollValue });
      this.setState({ screen: this.state.screen + 1, navButtonActive: false });
    }
  };

  scrollToNextScreenForExistingUser = currentScreen => {
    const scrollValue = SCREEN_WIDTH * currentScreen;
    this.scrollRef.scrollTo({ x: scrollValue });
    this.setState({ screen: this.state.screen + 1, navButtonActive: false });
  };

  onBack = currentScreen => {
    const { isExistingUser } = this.state;
    const { navigate } = this.props.navigation;
    if (currentScreen === 5 && !isExistingUser) {
      const scrollValue = SCREEN_WIDTH * (currentScreen - 2) - SCREEN_WIDTH;
      this.scrollRef.scrollTo({ x: scrollValue });
      this.setState({
        screen: this.state.screen - 2,
        navButtonActive: true,
        isLoggedIn: true
      });
    } else if (currentScreen !== 1) {
      const scrollValue = SCREEN_WIDTH * (currentScreen - 1) - SCREEN_WIDTH;
      this.scrollRef.scrollTo({ x: scrollValue });
      this.setState({ screen: this.state.screen - 1, navButtonActive: true });
    } else {
      !isExistingUser ? navigate("StartUp") : navigate("Diet");
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
    let maxSourcesAllowed = 4
    if(modalContains === "fat") maxSourcesAllowed = 2

    if (selectedSources.length < maxSourcesAllowed || sources[index].selected) {
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
    //console.log("selectedSources:", this.state.selectedSources);
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

    //console.log("filteredSources: ", filteredSources);

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
    if (confirmPasswordRef)
      confirmationPasswordValid || confirmPasswordRef.shake();
    return confirmationPasswordValid;
  };
  onEmailChange = email => {
    const { password, confirmationPassword } = this.state;
    const navButtonActive = this.validateCredentials({
      email,
      password,
      confirmationPassword
    });
    this.setState({ email, navButtonActive });
  };
  onPasswordChange = password => {
    const { email, confirmationPassword } = this.state;
    const navButtonActive = this.validateCredentials({
      email,
      password,
      confirmationPassword
    });
    this.setState({ password, navButtonActive });
  };
  onConfirmPasswordChange = confirmationPassword => {
    const { password, email } = this.state;
    const navButtonActive = this.validateCredentials({
      email,
      password,
      confirmationPassword
    });
    this.validateConfirmationPassword(confirmationPassword);
    this.setState({ confirmationPassword, navButtonActive });
  };

  validateCredentials = ({ email, password, confirmationPassword }) => {
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
    this.setState({ isLoading: true, isLoggedIn: true });
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(userObj => {
          const user = {
            uid: userObj.user.uid
          };
          this.setState({ user, isLoading: false });
        })
        .catch(error => {
          this.setState({ isLoading: false });
          alert(error.message);
        });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  onNext = async currentScreen => {
    const {
      goal,
      gender,
      fitnessLevel,
      dob,
      age,
      weight,
      height,
      foodPrefBtn,
      numberOfMeals,
      isLoggedIn,
      isExistingUser
    } = this.state;
    let isScrollable = false;
    if (!isExistingUser) {
      if (currentScreen === 1 && (goal >= 0 && goal.length !== 0))
        isScrollable = true;
      if (currentScreen === 2 && (gender >= 0 && gender.length !== 0))
        isScrollable = true;
      if (
        currentScreen === 3 &&
        (fitnessLevel > 0 && fitnessLevel.length !== 0)
      )
        isScrollable = true;
      if (currentScreen === 4) {
        await this.createNewUser();
        isScrollable = true;
      }
      if (
        currentScreen === 5 &&
        (dob.length > 0 &&
          age !== undefined &&
          weight !== undefined &&
          height !== undefined)
      )
        isScrollable = true;
      if (
        currentScreen === 6 &&
        foodPrefBtn.length !== 0 &&
        foodPrefBtn >= 0 &&
        numberOfMeals > 0
      )
        isScrollable = true;
      if (currentScreen === 7) {
        await this.saveUserDetails();
        await this.createDietAndMeals();
      }
      if (isScrollable && this.scrollRef) {
        this.scrollToNextScreen(currentScreen, isLoggedIn);
      }
    } else {
      if (currentScreen === 1 && (goal >= 0 && goal.length !== 0))
        isScrollable = true;
      if (
        currentScreen === 2 &&
        (fitnessLevel > 0 && fitnessLevel.length !== 0)
      )
        isScrollable = true;
      if (
        currentScreen === 3 &&
        (dob.length > 0 &&
          age !== undefined &&
          weight !== undefined &&
          height !== undefined)
      )
        isScrollable = true;
      if (
        currentScreen === 4 &&
        foodPrefBtn.length !== 0 &&
        foodPrefBtn >= 0 &&
        numberOfMeals > 0
      )
        isScrollable = true;
      if (currentScreen === 5) {
        await this.saveUserDetails();
        await this.createDietAndMeals();
      }
      if (isScrollable && this.scrollRef) {
        this.scrollToNextScreenForExistingUser(currentScreen);
      }
    }
  };

  saveUserDetails = async () => {
    this.setState({ isLoading: true });
    const {
      email,
      password,
      dob,
      age,
      weight,
      height,
      foodPreference
    } = this.state;
    let { user, gender, fitnessLevel } = this.state;
    gender = gender === 0 ? "Female" : "Male";
    if (password !== "") {
      user.email = email;
    }
    user = {
      ...user,
      gender,
      fitnessLevel,
      dob,
      age,
      weight,
      height,
      foodPreference
    };
    await database
      .ref("users")
      .child(user.uid)
      .set(user)
      .then(() => {
        //this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  createDietAndMeals = async () => {
    //this.setState({ isLoading: true });
    const {
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources,
      weight,
      targetWeight,
      goal,
      program,
      numberOfMeals,
      fitnessLevel,
      foodPreference,
      user: { uid }
    } = this.state;
    const dietInfo = {
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources,
      selectedGoal: goal,
      selectedProgram: program,
      selectedMeals: numberOfMeals,
      currentWeight: weight,
      targetWeight,
      fitnessLevel,
      foodPreference,
      uid
    };
    //console.log('dietInfo:', dietInfo)
    const dietId = await createDiet({ uid, dietInfo });
    this.setState({ isLoading: false });
    this.props.navigation.navigate("MyDiet", { dietId });
  };

  render() {
    const {
      user,
      goal,
      gender,
      fitnessLevel,
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
      isLoading,
      isLoadingComponent,
      dob,
      weight,
      height,
      program,
      targetWeight,
      navButtonActive,
      showTargetWeightButton,
      screen,
      healthCond,
      foodPrefBtn,
      numberOfMeals,
      foodPreference,
      isExistingUser
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
        <StatusBar hidden={true} />
        <ImageBackground
          source={GRADIENT_BG_IMAGE}
          style={commonStyles.bgImage}
        >
          {isLoadingComponent ? (
            <ActivityIndicator
              color={styleCommon.textColor1}
              style={{ flex: 1 }}
              size="large"
            />
          ) : isLoading ? (
            <Loading
              takeFullHeight={true}
              text={"We are creating your diet ..."}
              animationStr={require("../../assets/jsons/watermelon.json")}
              animationHeight={SCREEN_HEIGHT * 0.615}
            />
          ) : (
            <ScrollView
              horizontal="true"
              scrollEnabled={false}
              ref={scrollView => {
                this.scrollRef = scrollView;
              }}
              style={commonStyles.container}
              contentContainerStyle={commonStyles.scrollContentContainer}
            >
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title="What is your goal ?"
                    screen={screen}
                    onBack={this.onBack}
                  />
                  <Goal goal={goal} setGoal={this.setGoal} />
                </View>
              </View>
              {!isExistingUser && (
                <View style={commonStyles.subContainer}>
                  <View style={styles.contentWrapper}>
                    <Header
                      title="Your gender ?"
                      screen={screen}
                      onBack={this.onBack}
                    />
                    <Gender gender={gender} setGender={this.setGender} />
                  </View>
                </View>
              )}
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title="What is your activity level ?"
                    screen={screen}
                    onBack={this.onBack}
                  />
                  <FitnessLevel
                    gender={gender}
                    selectedLevel={fitnessLevel}
                    setFitnessLevel={this.setFitnessLevel}
                    levels={[1, 2, 3]}
                  />
                </View>
              </View>
              {!isExistingUser && (
                <View style={commonStyles.subContainer}>
                  <View style={styles.contentWrapper}>
                    <Header
                      title="SIGN UP !"
                      screen={screen}
                      onBack={this.onBack}
                    />
                    <SocialMediaSignup
                      signupObject={signupObject}
                      setFBUser={this.setFBUser}
                    />
                    <NavNextButton
                      isActive={navButtonActive}
                      screen={screen}
                      onNext={this.onNext}
                    />
                  </View>
                </View>
              )}
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title={"Lets's get to know you Better," + user.name + " !"}
                    screen={screen}
                    onBack={this.onBack}
                  />
                  <PersonalDetails
                    goal={goal}
                    fitnessLevel={fitnessLevel}
                    dob={dob}
                    setDob={this.setDob}
                    weight={weight}
                    setWeight={this.setWeight}
                    height={height}
                    setHeight={this.setHeight}
                    showTargetWeightButton={
                      isExistingUser ? true : showTargetWeightButton
                    }
                    programs={[4, 8, 12, 16]}
                    program={program}
                    targetWeight={targetWeight}
                    setTargetWeightAndProgram={this.setTargetWeightAndProgram}
                  />
                  <NavNextButton
                    isActive={navButtonActive}
                    screen={screen}
                    onNext={this.onNext}
                  />
                </View>
              </View>
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title="Choose your Preference !"
                    screen={screen}
                    onBack={this.onBack}
                  />
                  <PreferenceDetails
                    healthCond={healthCond}
                    setHealthCond={this.setHealthCond}
                    foodPreference={foodPrefBtn}
                    setFoodPref={this.setFoodPref}
                    numberOfMeals={numberOfMeals}
                    numberOfMealsOptions={[3, 4, 5, 6]}
                    setNoOfMeals={this.setNoOfMeals}
                  />
                  <NavNextButton
                    isActive={true}
                    screen={screen}
                    onNext={this.onNext}
                  />
                </View>
              </View>
              <View style={commonStyles.subContainer}>
                <Header
                  title="Would you like to choose ?"
                  screen={screen}
                  onBack={this.onBack}
                />
                <FoodSources
                  selectedProteinSources={selectedProteinSources}
                  selectedCarbSources={selectedCarbSources}
                  selectedFatSources={selectedFatSources}
                  foodPreference={foodPreference}
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
          )}
        </ImageBackground>
      </View>
    );
  }
}
