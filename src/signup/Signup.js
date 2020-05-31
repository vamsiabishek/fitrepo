import React, {useState, useEffect, useRef} from 'react';
import {
  Alert,
  LayoutAnimation,
  ScrollView,
  StatusBar,
  UIManager,
  View,
  Text,
} from 'react-native';
import {debounce} from 'lodash';
import {commonStyles} from '../../assets/style/stylesCommon';
import Header from '../components/signup/Header';
import NavNextButton from '../components/signup/NavNextButton';
import Goal from './Goal';
import Gender from './Gender';
import PersonalDetails from './PersonalDetails';
import PreferenceDetails from './PreferenceDetails';
import FitnessLevel from './FitnessLevel';
import FoodSources from './FoodSources';
import SocialMediaSignup from './SocialMediaSignup';
import LottieView from 'lottie-react-native';
import Loading from '../components/Loading';
import {styles} from '../../assets/style/stylesSignup';
import {
  SCREEN_WIDTH,
  commonValues,
} from '../../assets/style/stylesCommonValues';
import {createDiet} from './UpdateDiet';
import {
  getSourcesWithImages,
  FOOD_PREF_NON_VEG,
  getFoodPrefByIndex,
} from '../common/SourceUtil';
import {setFirstTimeUser} from '../common/Util';
import {normalizeUserForSignup} from '../common/Normalize';
import analytics from '@react-native-firebase/analytics';
import PrivacyAndTerms from '../documents/PrivacyAndTerms';
import api from '../common/Api';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

function Signup(props) {
  const onNextDelayed = debounce((screen) => onNext(screen), 600);

  const scrollRef = useRef();

  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState(undefined);
  const [weight, setWeight] = useState(undefined);
  const [height, setHeight] = useState(undefined);
  const [program, setProgram] = useState(undefined);
  const [targetWeight, setTargetWeight] = useState(undefined);
  const [foodPreference, setFoodPreference] = useState(FOOD_PREF_NON_VEG);
  const [showTargetWeightButton, setShowTargetWeightButton] = useState(false);
  const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);
  const [privacyTermsAccepted, setPrivacyTermsAccepted] = useState(false);
  const [foodPrefBtn, setFoodPrefBtn] = useState(3);
  const [numberOfMeals, setNumberOfMeals] = useState(4);
  const [navButtonActive, setNavButtonActive] = useState(false);
  const [screen, setScreen] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [selectedProteinSources, setSelectedProteinSources] = useState([]);
  const [selectedCarbSources, setSelectedCarbSources] = useState([]);
  const [selectedFatSources, setSelectedFatSources] = useState([]);
  const [sourcesButtonLabel, setSourcesButtonLabel] = useState('SKIP');
  const [user, setUser] = useState({});
  const [showGender, setShowGender] = useState(true);
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoginAnimation, setUserLoginAnimation] = useState(false);
  const [disableBackAndClose, setDisableBackAndClose] = useState(false);
  const [navigation, setNavigation] = useState(props.navigation);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fromLoginScreen = navigation.getParam('fromLogin');
    const fromAddNew = navigation.getParam('fromAddNew');
    if (fromLoginScreen || fromAddNew) {
      try {
        setIsLoadingComponent(true);
        fetchLoggedInUser();
      } catch (err) {
        setIsLoadingComponent(false);
      }
    }
  }, [navigation]);

  const fetchLoggedInUser = async () => {
    const userLoggedIn = await api.get('/getLoggedInUser');
    LayoutAnimation.easeInEaseOut();
    const normalizedUser = normalizeUserForSignup(userLoggedIn);
    setUser(normalizedUser.user);
    setShowGender(normalizedUser.hasNoGender);
    setIsExistingUser(true);
    setIsLoadingComponent(false);
    setDob(normalizedUser.dob);
    setAge(normalizedUser.age);
    setWeight(normalizedUser.weight);
    setHeight(normalizedUser.height);
    setGender(normalizedUser.gender);
    setFitnessLevel(normalizedUser.fitnessLevel);
    setFoodPrefBtn(normalizedUser.foodPrefBtn);
    setFoodPreference(normalizedUser.foodPreference);
    setPrivacyTermsAccepted(normalizedUser.privacyTermsAccepted);
  };

  const setUserFitnessLevel = (level) => {
    setFitnessLevel(level);
    onNextDelayed(screen); // this gets executed when same value is selected, for new value useEffect gets executed
  };

  const setUserGoal = (goal) => {
    setGoal(goal);
    onNextDelayed(screen); // this gets executed when same value is selected, for new value useEffect gets executed
  };

  const setUserGender = (gender) => {
    setGender(gender);
    onNextDelayed(screen); // this gets executed when same value is selected, for new value useEffect gets executed
  };

  useEffect(() => {
    onNextDelayed(screen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, fitnessLevel, goal]);

  useEffect(() => {
    const showTargetWeightBtn = changeShowTargetWeightButton(
      dob,
      weight,
      height,
    );
    setShowTargetWeightButton(showTargetWeightBtn);
  }, [dob, weight, height]);

  useEffect(() => {
    setFoodPreference(getFoodPrefByIndex(foodPrefBtn, foodPreference));
  }, [foodPrefBtn, foodPreference]);

  useEffect(() => {
    if (foodPrefBtn >= 0 && foodPrefBtn.length !== 0 && numberOfMeals > 0) {
      setNavButtonActive(true);
    } else {
      setNavButtonActive(false);
    }
  }, [foodPrefBtn, numberOfMeals]);

  const onPrivacyTermsAccept = () => {
    setShowPrivacyTerms(false);
    setPrivacyTermsAccepted(true);
  };

  const setFBUser = async (user) => {
    setDob(user.dob);
    setAge(user.age);
    await saveUser(user);
  };
  const setGoogleUser = async (user) => {
    await saveUser(user);
  };
  const setPhoneNumberUser = async (user) => {
    await saveUser(user);
  };
  const saveUser = async (user) => {
    setUser(user);
    setIsLoading(true);
    setUserLoginAnimation(true);
    await saveUserAfterAuthentication(user);
    scrollToNextScreen(4);
  };

  const setUserDob = (dob, age) => {
    setDob(dob);
    setAge(age);
  };
  const setUserWeight = (wght) => {
    let newTargetWeight = targetWeight;
    let newProgram = program;
    if (targetWeight && program && wght !== weight) {
      newTargetWeight = undefined;
      newProgram = undefined;
    }
    setWeight(wght);
    setTargetWeight(newTargetWeight);
    setProgram(newProgram);
  };

  const changeShowTargetWeightButton = (dob, weight, height) => {
    if (dob && dob.length > 0 && weight > 0 && height > 0) {
      return true;
    } else {
      return false;
    }
  };

  const setTargetWeightAndProgram = (targetWeight, program) => {
    setTargetWeight(targetWeight);
    setProgram(program);
    setNavButtonActive(true);
  };

  const showNavButtonIfTargetWeightAvailable = () => {
    if (!navButtonActive) {
      setNavButtonActive(true);
    }
  };

  const scrollToNextScreen = (currentScreen, isLoggedIn = false) => {
    let screenValue = screen;
    const node = scrollRef.current;
    if (isLoggedIn && currentScreen === 3) {
      const scrollValue = commonValues.SCREEN_WIDTH * (currentScreen + 1);
      node.scrollTo({x: scrollValue});
      screenValue = screen + 2;
    } else {
      let scrollValue = commonValues.SCREEN_WIDTH * currentScreen;
      node.scrollTo({x: scrollValue, animated: true});
      screenValue = screen + 1;
    }
    setScreen(screenValue);
    setNavButtonActive(false);
  };

  const scrollToNextScreenForExistingOrNewLoggedInUser = (currentScreen) => {
    const scrollValue = SCREEN_WIDTH * currentScreen;
    scrollRef.current.scrollTo({x: scrollValue});
    setScreen(screen + 1);
    setNavButtonActive(false);
  };

  const onBack = (currentScreen) => {
    const {navigate} = props.navigation;
    const node = scrollRef.current;
    if (currentScreen === 5 && !isExistingUser) {
      const scrollValue = SCREEN_WIDTH * (currentScreen - 2) - SCREEN_WIDTH;
      node.scrollTo({x: scrollValue});
      setScreen(screen - 2);
      setNavButtonActive(true);
      setIsLoggedIn(true);
    } else if (currentScreen !== 1) {
      const scrollValue = SCREEN_WIDTH * (currentScreen - 1) - SCREEN_WIDTH;
      node.scrollTo({x: scrollValue});
      setScreen(screen - 1);
      setNavButtonActive(true);
    } else {
      !isExistingUser ? navigate('StartUp') : navigate('Diet');
    }
  };

  const setSelectedSources = ({
    selectedProteinSources: selectedProteinSrcs,
    selectedCarbSources: selectedCarbSrcs,
    selectedFatSources: selectedFatSrcs,
    modalContains,
  }) => {
    if (modalContains === 'protein') {
      setSelectedProteinSources([...selectedProteinSrcs]);
    } else if (modalContains === 'carbs') {
      setSelectedCarbSources([...selectedCarbSrcs]);
    } else if (modalContains === 'fat') {
      setSelectedFatSources([...selectedFatSrcs]);
    }
    let sourcesBtnLabel = 'SKIP';
    if (
      selectedProteinSrcs?.length > 0 ||
      selectedCarbSrcs?.length > 0 ||
      selectedFatSrcs?.length > 0
    ) {
      sourcesBtnLabel = 'NEXT';
    }
    setSourcesButtonLabel(sourcesBtnLabel);
  };

  const onCancelSignup = () => {
    const {navigate} = props.navigation;
    !isExistingUser ? navigate('StartUp') : navigate('Diet');
  };

  const onNext = async (currentScreen) => {
    let isScrollable = false;

    const comparableScreen = (num) => (showGender ? num : num - 1);

    if (
      showGender &&
      currentScreen === 1 &&
      gender >= 0 &&
      gender.length !== 0
    ) {
      isScrollable = true;
    }
    if (
      currentScreen === comparableScreen(2) &&
      goal >= 0 &&
      goal.length !== 0
    ) {
      isScrollable = true;
    }
    if (
      currentScreen === comparableScreen(3) &&
      fitnessLevel > 0 &&
      fitnessLevel.length !== 0
    ) {
      isScrollable = true;
    }
    if (!isExistingUser) {
      if (currentScreen === 4) {
        isScrollable = true;
      }
      if (currentScreen === 5) {
        if (
          dob.length > 0 &&
          age !== undefined &&
          weight !== undefined &&
          height !== undefined &&
          targetWeight !== undefined
        ) {
          isScrollable = true;
        } else {
          Alert.alert('Incomplete', 'Please ensure to provide all values.');
        }
      }
      if (
        currentScreen === 6 &&
        foodPrefBtn.length !== 0 &&
        foodPrefBtn >= 0 &&
        numberOfMeals > 0
      ) {
        isScrollable = true;
      }
      if (currentScreen === 7) {
        await saveUserDetails();
        await createDietAndMeals();
      }
      if (isScrollable && scrollRef && currentScreen !== 4) {
        scrollToNextScreen(currentScreen, isLoggedIn);
      }
    } else {
      if (currentScreen === comparableScreen(4)) {
        if (
          dob.length > 0 &&
          age !== undefined &&
          weight !== undefined &&
          height !== undefined &&
          targetWeight !== undefined
        ) {
          isScrollable = true;
        } else {
          Alert.alert('Incomplete', 'Please ensure to provide all values.');
        }
      }
      if (
        currentScreen === comparableScreen(5) &&
        foodPrefBtn.length !== 0 &&
        foodPrefBtn >= 0 &&
        numberOfMeals > 0
      ) {
        isScrollable = true;
      }
      if (currentScreen === comparableScreen(6)) {
        //console.log('saving user details');
        await saveUserDetails();
        // console.log('saving diet details');
        await createDietAndMeals();
      }
      if (isScrollable && scrollRef) {
        scrollToNextScreenForExistingOrNewLoggedInUser(currentScreen);
      }
    }
  };

  const saveUserAfterAuthentication = async (newUser) => {
    const userDetails = {
      ...newUser,
      gender,
      fitnessLevel,
    };
    const savedUser = await api.post('/saveUser', userDetails);
    setUser(savedUser);
    setIsLoading(false);
    setUserLoginAnimation(false);
    analytics().logEvent('signup', userDetails);
    setShowPrivacyTerms(true);
  };

  const saveUserDetails = async () => {
    setIsLoading(true);

    const {diets, ...rest} = user;

    const userDetails = {
      ...rest,
      gender,
      fitnessLevel,
      dob,
      age,
      weight,
      height,
      foodPreference,
      privacyTermsAccepted,
    };
    try {
      //console.log('updating user', user);
      await api.post('/updateUser', userDetails);
      setUser(userDetails);
      setIsLoading(false);
      setUserLoginAnimation(false);
      //console.log('user saved successfully');
      // const {diets} = await fetchUserDiets();
      //console.log('mydiets ', diets);
      if (diets?.length !== 0) {
        setFirstTimeUser();
      }
    } catch (err) {
      console.error('Error occurred in the save user details method: ', err);
      setIsLoading(false);
    }
  };

  const createDietAndMeals = async () => {
    //setState({ isLoading: true });
    setIsLoading(true);
    const {navigate} = props.navigation;
    const {uid, gender} = user;
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
      paymentStatus: false,
      uid,
    };
    analytics().logEvent('Diet_creation_started', {...dietInfo, gender});
    const dietId = await createDiet({uid, dietInfo});
    setIsLoading(false);
    //console.log('navigating to mydiet');
    navigate('MyDiet', {
      uid,
      dietId,
      selectedProgram: program,
      selectedGoal: goal,
      fitnessLevel,
    });
  };

  const {hasAtleastOneDiet} = props;

  const loadingAnimationText = userLoginAnimation
    ? 'Signing you up with DietRepo ...'
    : 'Creating your new diet ...';
  const loadingAnimation = userLoginAnimation
    ? require('../../assets/jsons/user_animation_4.json')
    : require('../../assets/jsons/creating_diet_animation.json');

  return (
    <View style={commonStyles.container}>
      <StatusBar hidden={true} />
      <View style={commonStyles.innerContainer}>
        {isLoadingComponent ? (
          <View style={styles.activityIndicatorStyle}>
            <View style={styles.contactUsAnimationContainer}>
              <LottieView
                resizeMode="contain"
                source={require('../../assets/jsons/loading_2_animation.json')}
                autoPlay
                loop
                enableMergePathsAndroidForKitKatAndAbove
              />
            </View>
            <View style={styles.textViewContainer}>
              <Text style={styles.textStyle}>Getting everything ready...</Text>
            </View>
          </View>
        ) : (
          <ScrollView
            horizontal={true}
            scrollEnabled={false}
            ref={scrollRef}
            style={commonStyles.container}
            pagingEnabled={true}
            contentContainerStyle={commonStyles.scrollContentContainer}>
            {showGender && (
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title="Your gender ?"
                    screen={screen}
                    onBack={onBack}
                    onCancel={onCancelSignup}
                  />
                  <Gender gender={gender} setGender={setUserGender} />
                </View>
              </View>
            )}
            <View style={commonStyles.subContainer}>
              <View style={styles.contentWrapper}>
                <Header
                  title="What is your goal ?"
                  screen={screen}
                  onBack={onBack}
                  onCancel={onCancelSignup}
                />
                <Goal goal={goal} setGoal={setUserGoal} gender={gender} />
              </View>
            </View>
            <View style={commonStyles.subContainer}>
              <View style={styles.contentWrapper}>
                <Header
                  title="What is your activity level ?"
                  screen={screen}
                  onBack={onBack}
                  onCancel={onCancelSignup}
                />
                <FitnessLevel
                  gender={gender}
                  selectedLevel={fitnessLevel}
                  setFitnessLevel={setUserFitnessLevel}
                  levels={[1, 2, 3]}
                />
              </View>
            </View>
            {!isExistingUser && (
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title={isLoading ? 'Hold on ...' : 'SIGN UP'}
                    showOnBack={!(isLoading || disableBackAndClose)}
                    showOnCancel={!(isLoading || disableBackAndClose)}
                    screen={screen}
                    onBack={onBack}
                    onCancel={onCancelSignup}
                  />
                  {isLoading ? (
                    <View style={styles.contentWrapper}>
                      <Loading
                        resizeMode="contain"
                        text={loadingAnimationText}
                        isTextBold={true}
                        animationStr={loadingAnimation}
                      />
                    </View>
                  ) : (
                    <SocialMediaSignup
                      setdisableBackAndClose={setDisableBackAndClose}
                      setFBUser={setFBUser}
                      setGoogleUser={setGoogleUser}
                      setPhoneNumberUser={setPhoneNumberUser}
                    />
                  )}
                </View>
              </View>
            )}
            <View style={commonStyles.subContainer}>
              <View style={styles.contentWrapper}>
                <Header
                  title={"Let's get to know you better!"}
                  screen={screen}
                  onBack={onBack}
                  onCancel={onCancelSignup}
                />
                <PersonalDetails
                  goal={goal}
                  fitnessLevel={fitnessLevel}
                  dob={dob}
                  setDob={setUserDob}
                  weight={weight}
                  setWeight={setUserWeight}
                  height={height}
                  setHeight={setHeight}
                  showTargetWeightButton={
                    hasAtleastOneDiet ? true : showTargetWeightButton
                  }
                  programs={[4, 8, 12, 16]}
                  program={program}
                  targetWeight={targetWeight}
                  setTargetWeightAndProgram={setTargetWeightAndProgram}
                  showNavButtonIfTargetWeightAvailable={
                    showNavButtonIfTargetWeightAvailable
                  }
                />
                <NavNextButton
                  isActive={navButtonActive}
                  screen={screen}
                  onNext={onNextDelayed}
                />
              </View>
            </View>
            <View style={commonStyles.subContainer}>
              <View style={styles.contentWrapper}>
                <Header
                  title="Choose your Preference !"
                  screen={screen}
                  onBack={onBack}
                  onCancel={onCancelSignup}
                />
                <PreferenceDetails
                  foodPreference={foodPrefBtn}
                  setFoodPref={setFoodPrefBtn}
                  numberOfMeals={numberOfMeals}
                  numberOfMealsOptions={[3, 4, 5, 6]}
                  setNoOfMeals={setNumberOfMeals}
                />
                <NavNextButton
                  isActive={true}
                  screen={screen}
                  onNext={onNextDelayed}
                />
              </View>
            </View>
            <View style={commonStyles.subContainer}>
              <Header
                title={
                  isLoading
                    ? 'Hold On ...'
                    : 'Choose your macros or skip this step...'
                }
                showOnBack={!isLoading}
                showOnCancel={!isLoading}
                screen={screen}
                onBack={onBack}
                onCancel={onCancelSignup}
              />
              {isLoading ? (
                <View style={styles.contentWrapper}>
                  <Loading
                    resizeMode={'contain'}
                    isTextBold={true}
                    text={loadingAnimationText}
                    animationStr={loadingAnimation}
                  />
                </View>
              ) : (
                <FoodSources
                  foodPreference={foodPreference}
                  setSelectedSources={setSelectedSources}
                />
              )}
              <NavNextButton
                isActive={isLoading ? false : true}
                screen={screen}
                onNext={onNextDelayed}
                buttonText={sourcesButtonLabel}
              />
            </View>
          </ScrollView>
        )}
        <PrivacyAndTerms
          showPrivacyTerms={showPrivacyTerms}
          onAccept={onPrivacyTermsAccept}
          showCloseBtn={false}
        />
      </View>
    </View>
  );
}

export default Signup;
