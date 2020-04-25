import React, {Component} from 'react';
import {
  Alert,
  ActivityIndicator,
  LayoutAnimation,
  ScrollView,
  StatusBar,
  UIManager,
  View,
} from 'react-native';
import {debounce} from 'lodash';
import {
  EMAIL_VERIFICATION,
  PASSWORD_LENGTH_MINIMUM,
  PROVIDER_FACEBOOK,
  PROVIDER_GOOGLE,
} from '../common/Common';
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
import Loading from '../components/Loading';
import {styles} from '../../assets/style/stylesSignup';
import {
  styleCommon,
  SCREEN_WIDTH,
  commonValues,
} from '../../assets/style/stylesCommonValues';
import {auth, database} from '../common/FirebaseConfig';
import {createDiet} from './UpdateDiet';
import {getSourcesWithImages} from '../common/SourceUtil';
import {FOOD_PREF_NON_VEG, getFoodPrefByIndex} from '../common/SourceUtil';
import {
  setCurrentUser,
  createKeyAndValuesFromResult,
  setFirstTimeUser,
} from '../common/Util';
import {normalizeUserForSignup} from '../common/Normalize';
import analytics from '@react-native-firebase/analytics';
import PrivacyAndTerms from '../documents/PrivacyAndTerms';
import api from '../common/Api';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Signup extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    // console.log(navigation.getParam('isExistingUser'));
    this.state = {
      goal: '',
      gender: '',
      fitnessLevel: '',
      dob: '',
      age: undefined,
      weight: undefined,
      height: undefined,
      program: undefined,
      targetWeight: undefined,
      healthCond: undefined,
      foodPreference: FOOD_PREF_NON_VEG,
      foodPrefBtn: 3,
      numberOfMeals: 4,
      showTargetWeightButton: false,
      navButtonActive: false,
      screen: 1,
      proteinSources: getSourcesWithImages('protein'),
      carbSources: getSourcesWithImages('carb'),
      fatSources: getSourcesWithImages('fat'),
      selectedProteinSources: [],
      selectedCarbSources: [],
      selectedFatSources: [],
      showModal: false,
      modalContains: '',
      searchTerm: '',
      selectedSources: [],
      sources: [],
      filteredSources: [],
      sourcesButtonLabel: 'SKIP',
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      confirmationPasswordValid: true,
      uid:
        navigation.getParam('uid') !== undefined
          ? navigation.getParam('uid')
          : '',
      user: {},
      isLoading: false,
      isLoadingComponent: false,
      userLoginAnimation: false,
      isLoggedIn: false,
      isExistingUser: navigation.getParam('isExistingUser') ? true : false,
      newLogin: navigation.getParam('newLogin') ? true : false, // if new user chooses to login through FB/Google from the "Log In" page
      showGender: true,
      showPrivacyTerms: false,
      privacyTermsAccepted: false,
    };

    this.onNextDelayed = debounce((screen) => this.onNext(screen), 600);
  }

  componentDidMount = async () => {
    const {isExistingUser, uid, newLogin} = this.state;
    if (isExistingUser && !newLogin) {
      this.setState({isLoadingComponent: true});
      await database
        .ref('users')
        .child(uid)
        .once('value')
        .then((snapshot) => {
          const userLoggedIn = snapshot.val() || {};
          LayoutAnimation.easeInEaseOut();
          const normalizedUser = normalizeUserForSignup(userLoggedIn);
          this.setState({
            user: normalizedUser,
            ...normalizedUser,
            showTargetWeightButton: this.changeShowTargetWeightButton(
              normalizedUser.dob,
              normalizedUser.weight,
              normalizedUser.height,
            ),
            isLoadingComponent: false,
            showGender: normalizedUser.hasNoGender,
          });
        })
        .catch((error) => {
          console.log(
            'error while fetching user details in componentDidMount of Diet:',
            error,
          );
        });
    } else if (newLogin) {
      const {navigation} = this.props;
      const provider = navigation.getParam('provider');
      const mediaUser = navigation.getParam('newUser');
      if (provider === PROVIDER_GOOGLE) {
        this.setState({user: mediaUser});
      } else if (provider === PROVIDER_FACEBOOK) {
        this.setState({
          user: mediaUser,
          dob: mediaUser.dob,
          age: mediaUser.age,
        });
      }
    }
  };

  setShowPrivacyTerms = () => {
    this.setState({showPrivacyTerms: true});
  };

  onPrivacyTermsAccept = () => {
    this.setState({showPrivacyTerms: false, privacyTermsAccepted: true});
  };

  setGoal = (goal) => {
    this.setState({goal});
    this.onNextDelayed(this.state.screen);
  };
  setGender = (gender) => {
    this.setState({gender});
    this.onNextDelayed(this.state.screen);
  };
  setFitnessLevel = (fitnessLevel) => {
    this.setState({fitnessLevel});
    this.onNextDelayed(this.state.screen);
  };
  setFBUser = async (user) => {
    this.setState({
      user,
      uid: user.uid,
      dob: user.dob,
      age: user.age,
      isLoading: true,
    });
    await this.saveUserAfterAuthentication(user);
    this.scrollToNextScreen(4);
  };
  setGoogleUser = async (user) => {
    this.setState({user, uid: user.uid, isLoading: true});
    await this.saveUserAfterAuthentication(user);
    this.scrollToNextScreen(4);
  };
  setPhoneNumberUser = async (user) => {
    this.setState({user, uid: user.uid, isLoading: true});
    await this.saveUserAfterAuthentication(user);
    this.scrollToNextScreen(4);
  };
  setNewUser = async () => {
    await this.createNewUser(); // saveUserAfterAuthentication(user) is called inside this method
    this.scrollToNextScreen(4);
  };
  setDob = (dob, age) => {
    const {weight, height} = this.state;
    let showTargetWeightButton = this.changeShowTargetWeightButton(
      dob,
      weight,
      height,
    );
    this.setState({dob, age, showTargetWeightButton});
  };
  setWeight = (weight) => {
    const {dob, height, targetWeight, program} = this.state;
    let showTargetWeightButton = this.changeShowTargetWeightButton(
      dob,
      weight,
      height,
    );
    let newTargetWeight = targetWeight;
    let newProgram = program;
    if (targetWeight && program && weight !== this.state.weight) {
      newTargetWeight = undefined;
      newProgram = undefined;
    }
    this.setState({
      weight,
      showTargetWeightButton,
      targetWeight: newTargetWeight,
      program: newProgram,
    });
  };
  setHeight = (height) => {
    const {dob, weight} = this.state;
    let showTargetWeightButton = this.changeShowTargetWeightButton(
      dob,
      weight,
      height,
    );
    this.setState({height, showTargetWeightButton});
  };
  setHealthCond = (healthCond) => {
    this.setState({healthCond});
  };
  setFoodPref = (foodPrefBtn) => {
    const {numberOfMeals} = this.state;
    let {proteinSources, carbSources, fatSources, foodPreference} = this.state;
    foodPreference = getFoodPrefByIndex(foodPrefBtn, foodPreference);
    proteinSources = getSourcesWithImages('protein', foodPreference);
    carbSources = getSourcesWithImages('carb');
    fatSources = getSourcesWithImages('fat');
    this.setState({
      foodPrefBtn,
      foodPreference,
      navButtonActive: this.changeNavButtonToActive(foodPrefBtn, numberOfMeals),
      proteinSources,
      carbSources,
      fatSources,
    });
  };
  setNoOfMeals = (numberOfMeals) => {
    const {foodPrefBtn} = this.state;
    this.setState({
      numberOfMeals,
      navButtonActive: this.changeNavButtonToActive(foodPrefBtn, numberOfMeals),
    });
  };
  changeShowTargetWeightButton = (dob, weight, height) => {
    if (dob && dob.length > 0 && weight > 0 && height > 0) {
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
    this.setState({targetWeight, program, navButtonActive: true});
  };

  showNavButtonIfTargetWeightAvailable = () => {
    const {navButtonActive} = this.state;
    if (!navButtonActive) {
      this.setState({navButtonActive: true});
    }
  };

  scrollToNextScreen = (currentScreen, isLoggedIn = false) => {
    if (isLoggedIn && currentScreen === 3) {
      const scrollValue = commonValues.SCREEN_WIDTH * (currentScreen + 1);
      this.scrollRef.scrollTo({x: scrollValue});
      this.setState({screen: this.state.screen + 2, navButtonActive: false});
    } else {
      let scrollValue = commonValues.SCREEN_WIDTH * currentScreen;
      this.scrollRef.scrollTo({x: scrollValue, animated: true});
      this.setState({screen: this.state.screen + 1, navButtonActive: false});
    }
  };

  scrollToNextScreenForExistingOrNewLoggedInUser = (currentScreen) => {
    const scrollValue = SCREEN_WIDTH * currentScreen;
    this.scrollRef.scrollTo({x: scrollValue});
    this.setState({screen: this.state.screen + 1, navButtonActive: false});
  };

  onBack = (currentScreen) => {
    const {isExistingUser} = this.state;
    const {navigate} = this.props.navigation;
    if (currentScreen === 5 && !isExistingUser) {
      const scrollValue = SCREEN_WIDTH * (currentScreen - 2) - SCREEN_WIDTH;
      this.scrollRef.scrollTo({x: scrollValue});
      this.setState({
        screen: this.state.screen - 2,
        navButtonActive: true,
        isLoggedIn: true,
      });
    } else if (currentScreen !== 1) {
      const scrollValue = SCREEN_WIDTH * (currentScreen - 1) - SCREEN_WIDTH;
      this.scrollRef.scrollTo({x: scrollValue});
      this.setState({screen: this.state.screen - 1, navButtonActive: true});
    } else {
      !isExistingUser ? navigate('StartUp') : navigate('Diet');
    }
  };

  onCancelSignup = () => {
    const {isExistingUser} = this.state;
    const {navigate} = this.props.navigation;
    !isExistingUser ? navigate('StartUp') : navigate('Diet');
  };

  // source selection methods
  removeProteinSource = (index) => {
    let {selectedProteinSources} = this.state;
    const sources = this.unSelectSource(
      selectedProteinSources[index],
      'protein',
    );
    selectedProteinSources.splice(index, 1);
    let sourcesButtonLabel = this.changeSourceButtonLabel();
    this.setState({selectedProteinSources, sources, sourcesButtonLabel});
  };

  removeCarbSource = (index) => {
    let {selectedCarbSources} = this.state;
    const sources = this.unSelectSource(selectedCarbSources[index], 'carbs');
    selectedCarbSources.splice(index, 1);
    let sourcesButtonLabel = this.changeSourceButtonLabel();
    this.setState({selectedCarbSources, sources, sourcesButtonLabel});
  };

  removeFatSource = (index) => {
    let {selectedFatSources} = this.state;
    const sources = this.unSelectSource(selectedFatSources[index], 'fat');
    selectedFatSources.splice(index, 1);
    let sourcesButtonLabel = this.changeSourceButtonLabel();
    this.setState({selectedFatSources, sources, sourcesButtonLabel});
  };

  removeSource = (index, sourceType) => {
    if (index > -1) {
      if (sourceType === 'protein') {
        this.removeProteinSource(index);
      } else if (sourceType === 'carbs') {
        this.removeCarbSource(index);
      } else if (sourceType === 'fat') {
        this.removeFatSource(index);
      }
    }
  };

  canSelectCarbsAndFats = (selectedProteinSources, foodPreference) => {
    if (foodPreference === FOOD_PREF_NON_VEG) {
      if (selectedProteinSources && selectedProteinSources.length >= 2) {
        let numberOfVegSources = 0;
        selectedProteinSources.map((source) => {
          if (source.isVeg) {
            numberOfVegSources = numberOfVegSources + 1;
          }
        });
        if (numberOfVegSources > 2) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  };

  unSelectSource = (selectedSource, sourceType) => {
    let {proteinSources, carbSources, fatSources} = this.state;
    let selectedSources = [];
    if (sourceType === 'protein') {
      selectedSources = proteinSources;
    } else if (sourceType === 'carbs') {
      selectedSources = carbSources;
    } else {
      selectedSources = fatSources;
    }
    const selectedIndexFromSources = selectedSources.findIndex(
      (source) => source.name === selectedSource.name,
    );
    selectedSources[selectedIndexFromSources].selected = false;
    return selectedSources;
  };
  addProtein = () => {
    this.setState({
      showModal: true,
      modalContains: 'protein',
      selectedSources: this.state.selectedProteinSources,
      sources: this.state.proteinSources,
      filteredSources: this.state.proteinSources,
      searchTerm: '',
    });
  };
  addCarbs = () => {
    const {selectedProteinSources, foodPreference} = this.state;
    if (this.canSelectCarbsAndFats(selectedProteinSources, foodPreference)) {
      this.setState({
        showModal: true,
        modalContains: 'carbs',
        selectedSources: this.state.selectedCarbSources,
        sources: this.state.carbSources,
        filteredSources: this.state.carbSources,
        searchTerm: '',
      });
    } else {
      Alert.alert(
        'The Protein sources have required carbohydrates, you dont need to select anymore carbs !',
      );
    }
  };
  addFat = () => {
    const {selectedProteinSources, foodPreference} = this.state;
    if (this.canSelectCarbsAndFats(selectedProteinSources, foodPreference)) {
      this.setState({
        showModal: true,
        modalContains: 'fat',
        selectedSources: this.state.selectedFatSources,
        sources: this.state.fatSources,
        filteredSources: this.state.fatSources,
        searchTerm: '',
      });
    } else {
      Alert.alert(
        'The Protein sources have required fats, you dont need to select anymore fats !',
      );
    }
  };
  addSource = (sourceType) => {
    if (sourceType === 'protein') {
      this.addProtein();
    } else if (sourceType === 'carbs') {
      this.addCarbs();
    } else if (sourceType === 'fat') {
      this.addFat();
    }
  };
  onSourceToggle = (index, selected) => {
    const {sources, selectedSources, modalContains} = this.state;
    let maxSourcesAllowed = 4;
    if (modalContains === 'fat') {
      maxSourcesAllowed = 2;
    }

    if (selectedSources.length < maxSourcesAllowed || sources[index].selected) {
      const selectedSource = sources[index];
      sources[index].selected = !selected;
      if (!selected) {
        selectedSources.push(this.state.sources[index]);
      } else {
        const selectedIndex = selectedSources.findIndex(
          (source) => source.name === selectedSource.name,
        );
        if (selectedIndex > -1) {
          selectedSources.splice(selectedIndex, 1);
        }
      }

      let sourcesButtonLabel = this.changeSourceButtonLabel();

      if (modalContains === 'protein') {
        this.setState({
          sources,
          selectedSources,
          selectedProteinSources: selectedSources,
          sourcesButtonLabel,
        });
      } else if (modalContains === 'carbs') {
        this.setState({
          sources,
          selectedSources,
          selectedCarbSources: selectedSources,
          sourcesButtonLabel,
        });
      } else if (modalContains === 'fat') {
        this.setState({
          sources,
          selectedSources,
          selectedFatSources: selectedSources,
          sourcesButtonLabel,
        });
      }
    } else {
      Alert.alert('You can only select 4 ' + modalContains + ' sources');
    }
  };
  changeSourceButtonLabel = () => {
    const {
      selectedProteinSources,
      selectedCarbSources,
      selectedFatSources,
    } = this.state;
    let {sourcesButtonLabel} = this.state;
    if (
      selectedProteinSources.length > 0 ||
      selectedCarbSources.length > 0 ||
      selectedFatSources.length > 0
    ) {
      sourcesButtonLabel = 'NEXT';
    } else {
      sourcesButtonLabel = 'SKIP';
    }
    return sourcesButtonLabel;
  };
  onCancel = () => {
    this.setState({showModal: false});
  };
  onConfirm = () => {
    const {selectedSources, modalContains} = this.state;
    if (modalContains === 'protein' && selectedSources.length < 2) {
      Alert.alert('Select atleast two sources');
    } else {
      this.setState({showModal: false});
      analytics().logEvent('Selected_sources', {
        sources: selectedSources.map((source) => source.key),
        sourceType: modalContains,
      });
    }
  };
  filterSources = (searchTerm) => {
    const {sources} = this.state;
    this.setState({searchTerm});

    let filteredSources = [];

    sources &&
      sources.forEach((source) => {
        const parts = searchTerm
          .replace(/[\^$\\.*+?()[\]{}|]/g, '\\$&')
          .trim()
          .split(' ');
        const regex = new RegExp(`(${parts.join('|')})`, 'i');

        if (regex.test(source.name)) {
          filteredSources.push(source);
        }
      });

    //console.log("filteredSources: ", filteredSources);

    this.setState({searchTerm, filteredSources});
  };

  // signup methods
  validateEmail = (email, emailRef) => {
    //const { email } = this.state;
    const emailValid = EMAIL_VERIFICATION.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({emailValid});
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
    this.setState({passwordValid});
    if (!passwordValid) {
      passwordRef.focus();
      passwordRef.shake();
    }
    return passwordValid;
  };
  validateConfirmationPassword = (confirmationPassword, confirmPasswordRef) => {
    const {password} = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({confirmationPasswordValid});
    if (confirmPasswordRef) {
      confirmationPasswordValid || confirmPasswordRef.shake();
    }
    return confirmationPasswordValid;
  };
  onEmailChange = (email) => {
    const {password, confirmationPassword} = this.state;
    const navButtonActive = this.validateCredentials({
      email,
      password,
      confirmationPassword,
    });
    this.setState({email, navButtonActive});
  };
  onPasswordChange = (password) => {
    const {email, confirmationPassword} = this.state;
    const navButtonActive = this.validateCredentials({
      email,
      password,
      confirmationPassword,
    });
    this.setState({password, navButtonActive});
  };
  onConfirmPasswordChange = (confirmationPassword) => {
    const {password, email} = this.state;
    const navButtonActive = this.validateCredentials({
      email,
      password,
      confirmationPassword,
    });
    this.validateConfirmationPassword(confirmationPassword);
    this.setState({confirmationPassword, navButtonActive});
  };

  validateCredentials = ({email, password, confirmationPassword}) => {
    const {emailValid, passwordValid} = this.state;
    if (
      email !== '' &&
      password !== '' &&
      confirmationPassword !== '' &&
      password === confirmationPassword &&
      emailValid &&
      passwordValid
    ) {
      return true;
    }
    return false;
  };

  createNewUser = async () => {
    const {user, email, password} = this.state;
    console.log('******** creating new user ***************', email, password);
    const getIndex = email.indexOf('@');
    const name = email.substring(0, getIndex);
    const username = name;
    const userAddInfo = {...user, name, username, email};
    this.setState({
      isLoading: true,
      isLoggedIn: true,
      userLoginAnimation: true,
    });
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((userObj) => {
          const userNewObj = {
            uid: userObj.user.uid,
          };
          setCurrentUser(userObj.user);
          const newUser = {...user, ...userNewObj, ...userAddInfo};
          this.saveUserAfterAuthentication(newUser);
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            isLoggedIn: false,
            userLoginAnimation: false,
          });
          Alert.alert(error.message);
        });
    } catch (error) {
      this.setState({
        isLoading: false,
        isLoggedIn: false,
        userLoginAnimation: false,
      });
    }
  };

  onNext = async (currentScreen) => {
    const {
      goal,
      gender,
      fitnessLevel,
      dob,
      age,
      weight,
      height,
      targetWeight,
      foodPrefBtn,
      numberOfMeals,
      isLoggedIn,
      isExistingUser,
      newLogin,
      showGender,
    } = this.state;
    let isScrollable = false;
    if (!isExistingUser) {
      if (currentScreen === 1 && gender >= 0 && gender.length !== 0) {
        isScrollable = true;
      }
      if (currentScreen === 2 && goal >= 0 && goal.length !== 0) {
        isScrollable = true;
      }
      if (
        currentScreen === 3 &&
        fitnessLevel > 0 &&
        fitnessLevel.length !== 0
      ) {
        isScrollable = true;
      }
      if (currentScreen === 4) {
        await this.setNewUser();
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
          Alert.alert('Please provide all values');
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
        await this.saveUserDetails();
        await this.createDietAndMeals();
      }
      if (isScrollable && this.scrollRef && currentScreen !== 4) {
        this.scrollToNextScreen(currentScreen, isLoggedIn);
      }
    } else if (newLogin) {
      if (currentScreen === 1 && gender >= 0 && gender.length !== 0) {
        isScrollable = true;
      }
      if (currentScreen === 2 && goal >= 0 && goal.length !== 0) {
        isScrollable = true;
      }
      if (
        currentScreen === 3 &&
        fitnessLevel > 0 &&
        fitnessLevel.length !== 0
      ) {
        isScrollable = true;
      }
      if (currentScreen === 4) {
        if (
          dob.length > 0 &&
          age !== undefined &&
          weight !== undefined &&
          height !== undefined &&
          targetWeight !== undefined
        ) {
          isScrollable = true;
        } else {
          Alert.alert('Please provide all values');
        }
      }
      if (
        currentScreen === 5 &&
        foodPrefBtn.length !== 0 &&
        foodPrefBtn >= 0 &&
        numberOfMeals > 0
      ) {
        isScrollable = true;
      }
      if (currentScreen === 6) {
        console.log('saving user details');
        await this.saveUserDetails();
        console.log('saving diet details');
        await this.createDietAndMeals();
      }
      if (isScrollable && this.scrollRef) {
        this.scrollToNextScreenForExistingOrNewLoggedInUser(currentScreen);
      }
    } else {
      if (
        showGender &&
        currentScreen === 1 &&
        gender >= 0 &&
        gender.length !== 0
      ) {
        isScrollable = true;
      }
      if (
        currentScreen === (showGender ? 2 : 1) &&
        goal >= 0 &&
        goal.length !== 0
      ) {
        isScrollable = true;
      }
      if (
        currentScreen === (showGender ? 3 : 2) &&
        fitnessLevel > 0 &&
        fitnessLevel.length !== 0
      ) {
        isScrollable = true;
      }
      if (currentScreen === (showGender ? 4 : 3)) {
        if (
          dob.length > 0 &&
          age !== undefined &&
          weight !== undefined &&
          height !== undefined &&
          targetWeight !== undefined
        ) {
          isScrollable = true;
        } else {
          Alert.alert('Please provide all values');
        }
      }
      if (
        currentScreen === (showGender ? 5 : 4) &&
        foodPrefBtn.length !== 0 &&
        foodPrefBtn >= 0 &&
        numberOfMeals > 0
      ) {
        isScrollable = true;
      }
      if (currentScreen === (showGender ? 6 : 5)) {
        await this.saveUserDetails();
        await this.createDietAndMeals();
      }
      if (isScrollable && this.scrollRef) {
        this.scrollToNextScreenForExistingOrNewLoggedInUser(currentScreen);
      }
    }
  };

  saveUserAfterAuthentication = async (newUser) => {
    const {email, password} = this.state;
    const {gender, fitnessLevel} = this.state;
    if (password !== '') {
      newUser.email = email;
    }
    const user = {
      ...newUser,
      gender,
      fitnessLevel,
    };
    const savedUser = await api.post('/saveUser', user);
    this.setState({
      user: savedUser,
      isLoading: false,
      userLoginAnimation: false,
    });
    analytics().logEvent('signup', user);
    this.setShowPrivacyTerms();

    // await database
    //   .ref('users')
    //   .child(user.uid)
    //   .set(user)
    //   .then(() => {
    //     this.setState({
    //       user: newUser,
    //       isLoading: false,
    //       userLoginAnimation: false,
    //     });
    //     analytics().logEvent('signup', user);
    //     this.setShowPrivacyTerms();
    //   })
    //   .catch((error) => {
    //     console.log(
    //       'Error occurred in the saveUserAfterAuthentication method: ',
    //       error,
    //     );
    //     this.setState({isLoading: false});
    //   });
  };

  saveUserDetails = async () => {
    this.setState({isLoading: true});
    const {
      email,
      password,
      dob,
      age,
      weight,
      height,
      foodPreference,
      privacyTermsAccepted,
    } = this.state;
    let {user, gender, fitnessLevel, uid} = this.state;
    // gender = gender === 0 ? "Female" : "Male";
    if (password !== '') {
      user.email = email;
    }
    user = {
      ...user,
      uid,
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
      console.log("updating user", user)
      await api.post('/updateUser', user);
      this.setState({user});
      console.log('user saved successfully');
      const {diets} = await this.fetchUserDiets();
      console.log('mydiets ', diets);
      if (diets.length !== 0) {
        setFirstTimeUser();
      }
    } catch (err) {
      console.error('Error occurred in the save user details method: ', err);
      this.setState({isLoading: false});
    }
  };

  fetchUserDiets = async () => {
    try {
      return await api.get('/userDiets');
    } catch (err) {
      console.log('error while fetching my diets in SignUp page', err);
    }
  };

  createDietAndMeals = async () => {
    //this.setState({ isLoading: true });
    const {navigate} = this.props.navigation;
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
      user: {uid, gender},
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
      paymentStatus: false,
      uid,
    };
    analytics().logEvent('Diet_creation_started', {...dietInfo, gender});
    const dietId = await createDiet({uid, dietInfo});
    this.setState({isLoading: false});
    console.log("navigating to mydiet")
    navigate('MyDiet', {
      uid,
      dietId,
      selectedProgram: program,
      selectedGoal: goal,
      fitnessLevel,
    });
  };

  render() {
    const {
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
      isExistingUser,
      userLoginAnimation,
      showGender,
      showPrivacyTerms,
    } = this.state;
    const {hasAtleastOneDiet} = this.props;
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
      validateConfirmationPassword: this.validateConfirmationPassword,
    };
    const loadingAnimationText = userLoginAnimation
      ? 'Signing you up with DietRepo ...'
      : 'Creating your new diet ...';
    const loadingAnimation = userLoginAnimation
      ? require('../../assets/jsons/user_animation_4.json')
      : require('../../assets/jsons/dots_circle_salmon_animation.json');
    const activityIndicatorStyle = {flex: 1};
    return (
      <View style={commonStyles.container}>
        <StatusBar hidden={true} />
        <View style={commonStyles.bgImage}>
          {isLoadingComponent ? (
            <ActivityIndicator
              color={styleCommon.textColor1}
              style={activityIndicatorStyle}
              size="large"
            />
          ) : (
            <ScrollView
              horizontal={true}
              scrollEnabled={false}
              ref={(scrollView) => {
                this.scrollRef = scrollView;
              }}
              style={commonStyles.container}
              pagingEnabled={true}
              contentContainerStyle={commonStyles.scrollContentContainer}>
              {showGender && (
                <View style={commonStyles.subContainer}>
                  <View style={styles.contentWrapper}>
                    <Header
                      title="Your gender ?"
                      screen={screen}
                      onBack={this.onBack}
                      onCancel={this.onCancelSignup}
                    />
                    <Gender gender={gender} setGender={this.setGender} />
                  </View>
                </View>
              )}
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title="What is your goal ?"
                    screen={screen}
                    onBack={this.onBack}
                    onCancel={this.onCancelSignup}
                  />
                  <Goal goal={goal} setGoal={this.setGoal} gender={gender} />
                </View>
              </View>
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title="What is your activity level ?"
                    screen={screen}
                    onBack={this.onBack}
                    onCancel={this.onCancelSignup}
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
                      title={isLoading ? 'Hold on ...' : 'SIGN UP !'}
                      screen={screen}
                      onBack={this.onBack}
                      onCancel={this.onCancelSignup}
                    />
                    {isLoading ? (
                      <View style={styles.contentWrapper}>
                        <Loading
                          text={loadingAnimationText}
                          isTextBold={false}
                          animationStr={loadingAnimation}
                        />
                      </View>
                    ) : (
                      <SocialMediaSignup
                        signupObject={signupObject}
                        setFBUser={this.setFBUser}
                        setGoogleUser={this.setGoogleUser}
                        setPhoneNumberUser={this.setPhoneNumberUser}
                      />
                    )}
                    {/* <NavNextButton
                      isActive={isLoading ? false : navButtonActive}
                      screen={screen}
                      onNext={this.onNext}
                    /> */}
                  </View>
                </View>
              )}
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title={"Let's get to know you better!"}
                    screen={screen}
                    onBack={this.onBack}
                    onCancel={this.onCancelSignup}
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
                      hasAtleastOneDiet ? true : showTargetWeightButton
                    }
                    programs={[4, 8, 12, 16]}
                    program={program}
                    targetWeight={targetWeight}
                    setTargetWeightAndProgram={this.setTargetWeightAndProgram}
                    showNavButtonIfTargetWeightAvailable={
                      this.showNavButtonIfTargetWeightAvailable
                    }
                  />
                  <NavNextButton
                    isActive={navButtonActive}
                    screen={screen}
                    onNext={this.onNextDelayed}
                  />
                </View>
              </View>
              <View style={commonStyles.subContainer}>
                <View style={styles.contentWrapper}>
                  <Header
                    title="Choose your Preference !"
                    screen={screen}
                    onBack={this.onBack}
                    onCancel={this.onCancelSignup}
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
                    onNext={this.onNextDelayed}
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
                  screen={screen}
                  onBack={this.onBack}
                  onCancel={this.onCancelSignup}
                />
                {isLoading ? (
                  <View style={styles.contentWrapper}>
                    <Loading
                      isTextBold={false}
                      text={loadingAnimationText}
                      animationStr={loadingAnimation}
                    />
                  </View>
                ) : (
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
                )}
                <NavNextButton
                  isActive={isLoading ? false : true}
                  screen={screen}
                  onNext={this.onNextDelayed}
                  buttonText={sourcesButtonLabel}
                />
              </View>
            </ScrollView>
          )}
          <PrivacyAndTerms
            showPrivacyTerms={showPrivacyTerms}
            onAccept={this.onPrivacyTermsAccept}
            showCloseBtn={false}
          />
        </View>
      </View>
    );
  }
}
