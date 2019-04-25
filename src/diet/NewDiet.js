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
import { GRADIENT_BG_IMAGE } from "../common/Common";
import { f, database } from "../common/FirebaseConfig";
import { commonStyles } from "../../assets/style/stylesCommon";
import Header from "../components/signup/Header";
import NavNextButton from "../components/signup/NavNextButton";
import Goal from "../signup/Goal";
import PersonalDetails from "../signup/PersonalDetails";
import PreferenceDetails from "../signup/PreferenceDetails";
import FitnessLevel from "../signup/FitnessLevel";
import FoodSources from "../signup/FoodSources";
import LoadingAnimation from "../components/LoadingAnimation";
import { createDiet } from "../signup/UpdateDiet";
import { styles } from "../../assets/style/stylesSignup";
import {
  SCREEN_WIDTH,
  styleCommon
} from "../../assets/style/stylesCommonValues";
import { getSourcesWithImages } from "../common/SourceUtil";

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class NewDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      gender: "",
      fitnessLevel: "",
      weight: undefined,
      height: undefined,
      dob: "",
      age: undefined,
      program: undefined,
      targetWeight: undefined,
      healthCond: undefined,
      foodPreference: 0,
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
      onPasswordValid: true,
      user: {},
      uid: undefined,
      isLoading: false,
      isLoadingDiet: false
    };
  }
  gotToNext = () => {
    setTimeout(() => this.onNext(this.state.screen), 400);
  };
  setGoal = goal => {
    this.setState({ goal });
    this.gotToNext();
  };
  setFitnessLevel = fitnessLevel => {
    this.setState({ fitnessLevel });
    this.gotToNext();
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
  setTargetWeightAndProgram = (targetWeight, program) => {
    this.setState({ targetWeight, program, navButtonActive: true });
  };
  setHealthCond = healthCond => {
    this.setState({ healthCond });
  };
  setFoodPref = foodPreference => {
    const { numberOfMeals } = this.state;
    let { proteinSources, carbSources, fatSources, isVeg } = this.state;
    isVeg = foodPreference === 0;
    proteinSources = getSourcesWithImages("protein", isVeg);
    carbSources = getSourcesWithImages("carb", isVeg);
    fatSources = getSourcesWithImages("fat", isVeg);
    this.setState({
      foodPreference,
      isVeg,
      navButtonActive: this.changeNavButtonToActive(
        foodPreference,
        numberOfMeals
      ),
      proteinSources,
      carbSources,
      fatSources
    });
  };
  setNoOfMeals = numberOfMeals => {
    const { foodPreference } = this.state;
    this.setState({
      numberOfMeals,
      navButtonActive: this.changeNavButtonToActive(
        foodPreference,
        numberOfMeals
      )
    });
  };
  changeShowTargetWeightButton = (dob, weight, height) => {
    if (dob.length > 0 && weight !== undefined && height !== undefined) {
      return true;
    } else {
      return false;
    }
  };
  changeNavButtonToActive = (foodPreference, numberOfMeals) => {
    if (
      foodPreference >= 0 &&
      foodPreference.length !== 0 &&
      numberOfMeals > 0
    ) {
      return true;
    } else {
      return false;
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

  onNext = async currentScreen => {
    const {
      goal,
      fitnessLevel,
      weight,
      targetWeight,
      foodPreference,
      numberOfMeals
    } = this.state;
    let isScrollable = false;
    if (currentScreen === 1 && (goal >= 0 && goal.length !== 0))
      isScrollable = true;
    if (currentScreen === 2 && (fitnessLevel > 0 && fitnessLevel.length !== 0))
      isScrollable = true;
    if (
      currentScreen === 3 &&
      (weight !== undefined && targetWeight !== undefined)
    )
      isScrollable = true;
    if (
      currentScreen === 4 &&
      foodPreference.length !== 0 &&
      foodPreference >= 0 &&
      numberOfMeals > 0
    )
      isScrollable = true;
    if (currentScreen === 5) {
      await this.saveUserDetails();
      await this.createDietAndMeals();
    }
    if (isScrollable && this.scrollRef) {
      this.scrollToNextScreen(currentScreen);
    }
  };
  onBack = currentScreen => {
    const { navigate } = this.props.navigation;
    if (currentScreen !== 1) {
      const scrollValue = SCREEN_WIDTH * (currentScreen - 1) - SCREEN_WIDTH;
      this.scrollRef.scrollTo({ x: scrollValue });
      this.setState({ screen: this.state.screen - 1, navButtonActive: true });
    } else {
      navigate("Diet");
    }
  };
  scrollToNextScreen = currentScreen => {
    const scrollValue = SCREEN_WIDTH * currentScreen;
    this.scrollRef.scrollTo({ x: scrollValue });
    this.setState({ screen: this.state.screen + 1, navButtonActive: false });
  };

  saveUserDetails = async () => {
    this.setState({ isLoadingDiet: true });
    const { fitnessLevel, dob, age, weight, height, uid } = this.state;
    console.log(fitnessLevel, dob, age, weight, height, uid);
    let { user } = this.state;
    user = {
      ...user,
      fitnessLevel,
      dob,
      age,
      weight,
      height
    };
    await database
      .ref("users")
      .child(uid)
      .set(user)
      .then(() => {
        this.setState({ isLoadingDiet: false });
      })
      .catch(error => {
        this.setState({ isLoadingDiet: false });
      });
  };
  createDietAndMeals = async () => {
    const {
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources,
      weight,
      targetWeight,
      goal,
      program,
      numberOfMeals,
      user,
      uid
    } = this.state;
    console.log(
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources,
      weight,
      targetWeight,
      goal,
      program,
      numberOfMeals,
      user,
      uid
    );
    const dietInfo = {
      selectedProteinSources,
      selectedFatSources,
      selectedCarbSources,
      selectedGoal: goal,
      selectedProgram: program,
      selectedMeals: numberOfMeals,
      currentWeight: weight,
      targetWeight,
      isVeg: false
    };
    const dietId = await createDiet({ uid, dietInfo });
    this.setState({ isLoadingDiet: false });
    this.props.navigation.navigate("MyDiet", { dietId });
  };
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const { uid } = await f.auth().currentUser;
    await database
      .ref("users")
      .child(uid)
      .once("value")
      .then(snapshot => {
        const userLoggedIn = snapshot.val();
        LayoutAnimation.easeInEaseOut();
        this.setState({
          uid: uid,
          user: userLoggedIn,
          age: userLoggedIn.age,
          dob: userLoggedIn.dob,
          weight: userLoggedIn.weight,
          height: userLoggedIn.height,
          gender: userLoggedIn.gender === "Male" ? 1 : 2,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(
          "error while fetching user details in componentDidMount of Diet:",
          error
        );
      });
  };

  render() {
    const {
      isLoading,
      isLoadingDiet,
      goal,
      gender,
      dob,
      fitnessLevel,
      sourcesButtonLabel,
      selectedProteinSources,
      selectedCarbSources,
      selectedFatSources,
      showModal,
      modalContains,
      selectedSources,
      filteredSources,
      weight,
      height,
      program,
      targetWeight,
      navButtonActive,
      showTargetWeightButton,
      screen,
      healthCond,
      foodPreference,
      numberOfMeals,
      user
    } = this.state;
    return (
      <View style={commonStyles.container}>
        <StatusBar hidden={true} />
        <ImageBackground
          source={GRADIENT_BG_IMAGE}
          style={commonStyles.bgImage}
        >
          {isLoading ? (
            <ActivityIndicator
              color={styleCommon.textColor1}
              size="large"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          ) : isLoadingDiet ? (
            <LoadingAnimation />
          ) : (
            <ScrollView
              horizontal="true"
              scrollEnabled={false}
              ref={scrollView => {
                this.scrollRef = scrollView;
              }}
              style={commonStyles.scrollContainer}
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
                    alterDimensions={true}
                    changeFactor={-20}
                  />
                </View>
              </View>
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title="Lets's get to know you Better !"
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
                    showTargetWeightButton={true}
                    programs={[4, 8, 12, 16]}
                    program={program}
                    targetWeight={targetWeight}
                    setTargetWeightAndProgram={this.setTargetWeightAndProgram}
                  />
                  <NavNextButton
                    isActive={navButtonActive}
                    screen={screen}
                    onNext={this.onNext}
                    hasBottomBar={true}
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
                    foodPreference={foodPreference}
                    setFoodPref={this.setFoodPref}
                    numberOfMeals={numberOfMeals}
                    numberOfMealsOptions={[3, 4, 5, 6]}
                    setNoOfMeals={this.setNoOfMeals}
                  />
                  <NavNextButton
                    isActive={true}
                    screen={screen}
                    onNext={this.onNext}
                    hasBottomBar={true}
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
                  hasBottomBar={true}
                />
              </View>
            </ScrollView>
          )}
        </ImageBackground>
      </View>
    );
  }
}
