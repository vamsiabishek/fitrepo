import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Animated, UIManager} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getOfferingsByPurchaseId,
  getPurchasePlanByFitnessLevelAndWeek,
} from '../common/PurchaseUtils';
import TotalDietMacros from './TotalDietMarcos';
import MealsContainer from './meals/MealsContainer';
import {styles} from '../../assets/style/stylesMyDiet';
import {
  styleCommon,
  ICON_SIZE_24,
  ICON_SIZE_22,
  ICON_SIZE,
  ICON_SIZE_LARGE,
} from '../../assets/style/stylesCommonValues';
import Loading from '../components/Loading';
import PurchaseScreen from '../components/purchase/PurchaseScreen';
import Feedback from '../feedback/Feedback';
import {isTrailUser} from '../common/Util';
import {getProgramEndDate, getSeconds} from '../common/Util';
import api from '../common/Api';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class MyDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeDay: true, // others days can be rest or refeed
      diet: {},
      meals: {},
      allMeals: {},
      currentWeek: 1,
      showDayOnScroll: false,
      showInitialTrailMeals: true,
      showAllMealsForSubscribed: false,
      showPaymentModal: false,
      showMeals: true,
      paymentOptions: undefined,
      packageToPurchase: undefined,
      showFeedbackModal: false,
    };
    this.dayBarScrollY = new Animated.Value(1);
    this.dayBarExpandedHeight = styles.dayBarStyle.height; // calculated by onLayout
    this.dayBarCollapsedHeight = 0;
  }

  componentDidMount = async () => {
    const {navigation} = this.props;
    const dietId = navigation.getParam('dietId');
    const uid = navigation.getParam('uid');
    await this.loadDietDetails(dietId);
    await this.loadPaymentEntitlements(uid);
    await this.checkDietTrail(dietId, uid);
  };

  componentDidUpdate = async (prevProps) => {
    const {navigation} = this.props;
    const dietId = navigation.getParam('dietId');
    const uid = navigation.getParam('uid');
    if (dietId !== prevProps.navigation.getParam('dietId')) {
      await this.loadDietDetails(dietId);
      await this.loadPaymentEntitlements(uid);
      await this.checkDietTrail(dietId, uid);
    }
  };

  checkDietTrail = async (dietId) => {
    const {showAllMealsForSubscribed, diet} = this.state;
    const showInitialTrailMeals = await isTrailUser(dietId);
    const showMeals = diet.paymentStatus
      ? true
      : showInitialTrailMeals
      ? false
      : showAllMealsForSubscribed;
    const showPaymentModal = !diet.paymentStatus;
    this.setState({
      showInitialTrailMeals,
      showMeals,
      showPaymentModal,
    });
  };

  loadDietDetails = async (dietId) => {
    this.setState({isLoading: true});
    // console.log('fetching details for the diet with Id:', dietId);
    const diet = await api.get(`/getDietById/${dietId}`);
    console.log('diet and meals:', diet);
    const {meals} = diet;
    this.setState({diet, meals: meals[0], allMeals: meals});
  };

  loadPaymentEntitlements = async (uid) => {
    const {navigation} = this.props;
    const offerings = await getOfferingsByPurchaseId(uid);
    const purchasePlan = getPurchasePlanByFitnessLevelAndWeek(
      navigation.getParam('selectedProgram'),
      navigation.getParam('fitnessLevel'),
      offerings,
    );
    this.setState({
      isLoading: false,
      paymentOptions: offerings,
      packageToPurchase: purchasePlan,
    });
  };

  onDayChange = (selectedDay) => {
    if (selectedDay === 'training') {
      this.setState({activeDay: true});
    } else if (selectedDay === 'rest') {
      this.setState({activeDay: false});
    }
  };

  caloriesMacrosAndMeals = ({
    calFromProtein,
    calFromCarbs,
    calFromFats,
    calFromProteinForRD,
    calFromCarbsForRD,
    calFromFatsForRD,
    trainingDayMeals,
    restDayMeals,
  }) => {
    let totalCalories = 0;
    let proteinInGm = 0;
    let carbsInGm = 0;
    let fatsInGm = 0;
    let mealList = {};
    const {activeDay} = this.state;
    if (trainingDayMeals && restDayMeals) {
      if (activeDay) {
        totalCalories = Math.round(calFromProtein + calFromCarbs + calFromFats);
        proteinInGm = Math.round(calFromProtein / 4);
        carbsInGm = Math.round(calFromCarbs / 4);
        fatsInGm = Math.round(calFromFats / 9);
        mealList = trainingDayMeals;
      } else {
        totalCalories = Math.round(
          calFromProteinForRD + calFromCarbsForRD + calFromFatsForRD,
        );
        proteinInGm = Math.round(calFromProteinForRD / 4);
        carbsInGm = Math.round(calFromCarbsForRD / 4);
        fatsInGm = Math.round(calFromFatsForRD / 9);
        mealList = restDayMeals;
      }
    }
    return {
      totalCalories,
      proteinInGm,
      carbsInGm,
      fatsInGm,
      mealList,
    };
  };

  showDayLabelOnScroll = (event) => {
    const {showDayOnScroll} = this.state;
    const {
      nativeEvent: {
        contentOffset: {y: offset},
      },
    } = event;
    if (offset > 20 && !showDayOnScroll) {
      this.day = this.state.activeDay ? 'Training day' : 'Rest day';
      this.setState({showDayOnScroll: true});
    }
  };

  hideDayLabelOnScroll = (event) => {
    const {showDayOnScroll} = this.state;
    const {
      nativeEvent: {
        contentOffset: {y: offset},
      },
    } = event;
    if (offset <= 0 && showDayOnScroll) {
      this.setState({showDayOnScroll: false});
    }
  };

  changeWeek = ({prev, next}) => {
    const {diet, showInitialTrailMeals} = this.state;
    if (!showInitialTrailMeals || diet.paymentStatus) {
      const {currentWeek, allMeals} = this.state;
      if (prev && allMeals[currentWeek - 2]) {
        this.setState({
          meals: allMeals[currentWeek - 2],
          currentWeek: currentWeek - 1,
        });
      } else if (next && allMeals[currentWeek]) {
        this.setState({
          meals: allMeals[currentWeek],
          currentWeek: currentWeek + 1,
        });
      }
    } else {
      this.setState({
        showPaymentModal: true,
        showMeals: false,
      });
    }
  };

  onPressSupplementsButton = () => {
    const {paymentStatus, supplements} = this.state.diet;
    const {navigation} = this.props;
    const {navigate} = navigation;
    const dietId = navigation.getParam('dietId');
    if (!paymentStatus) {
      this.setState({
        showPaymentModal: true,
        showMeals: false,
      });
    } else {
      navigate('Supplements', {dietId, supplements});
    }
  };

  onClosePaymentModal = async (paymentDone = false) => {
    const {navigate} = this.props.navigation;
    const {showInitialTrailMeals, diet} = this.state;
    this.setState({showPaymentModal: false, showMeals: true}); // ,
    if (paymentDone) {
      const newDiet = {...diet, paymentStatus: paymentDone};
      this.setState({
        showInitialTrailMeals: false,
        showAllMealsForSubscribed: true,
        diet: newDiet,
      });
    } else if (!paymentDone && !showInitialTrailMeals) {
      navigate('Diet');
    }
  };

  onCloseFeedbackModal = () => {
    this.setState({showFeedbackModal: false});
  };

  onClickFeedback = () => {
    this.setState({showFeedbackModal: true});
  };

  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const dietId = navigation.getParam('dietId');
    const uid = navigation.getParam('uid');
    const {
      isLoading,
      activeDay,
      meals,
      allMeals,
      currentWeek,
      showMeals,
      packageToPurchase,
      showPaymentModal,
      diet,
      showInitialTrailMeals,
      showFeedbackModal,
    } = this.state;
    const {id, createdDate, selectedProgram, selectedGoal, fitnessLevel} = diet;
    const {
      totalCalories,
      proteinInGm,
      carbsInGm,
      fatsInGm,
      mealList,
    } = this.caloriesMacrosAndMeals(meals);
    const feedbackDiet = {
      uid,
      id,
      createdDate,
      selectedProgram,
      selectedGoal,
      fitnessLevel,
    };
    const details = {
      uid,
      feedbackDiet,
    };
    const dayBarHeight = this.dayBarScrollY.interpolate({
      inputRange: [0, this.dayBarExpandedHeight - 20],
      outputRange: [this.dayBarExpandedHeight, this.dayBarCollapsedHeight],
      extrapolate: 'clamp',
    });
    let dietTrialEndDate;
    let trialDaysLeft; // showInitialTrailMeals
    if (showInitialTrailMeals && !diet.paymentStatus) {
      const trialPeriod = 1;
      dietTrialEndDate = getProgramEndDate(
        new Date(diet.createdDate),
        trialPeriod,
      );
      const trialDaysLeftSeconds =
        getSeconds(dietTrialEndDate) - getSeconds(new Date());
      trialDaysLeft = Math.floor(trialDaysLeftSeconds / (24 * 3600));
    }
    const trainingIconColor = activeDay
      ? 'white'
      : styleCommon.unSelectedButtonColor;
    const restIconColor = !activeDay
      ? 'white'
      : styleCommon.unSelectedButtonColor;
    const nextWeekEnabled = allMeals[currentWeek] ? true : false;
    const prevWeekEnabled = allMeals[currentWeek - 2] ? true : false;
    const animatedViewStyle = {
      height: dayBarHeight,
      backgroundColor: 'transparent',
    };
    const weeklyBarInnerStartStyle = {justifyContent: 'flex-start'};
    const weeklyBarInnerEndStyle = {justifyContent: 'flex-end'};
    const changeWeekButtonStyle = {paddingHorizontal: 10};
    const currentWeekStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    };
    const dayColor = {color: 'lightgrey'};
    return (
      <View style={isLoading ? styles.containerLoading : styles.container}>
        {isLoading ? (
          <Loading
            text={'We are getting your diet ...'}
            animationStr={require('../../assets/jsons/watermelon.json')}
          />
        ) : (
          <View style={styles.container}>
            <View style={styles.backHeaderContainer}>
              <View style={styles.backButtonContainerStyle}>
                <Button
                  title="All Diets"
                  icon={{
                    name: 'arrow-left-thick',
                    size: ICON_SIZE,
                    color: styleCommon.iconColor,
                    type: 'material-community',
                  }}
                  containerStyle={styles.backButtonStyle}
                  buttonStyle={styles.backButtonStyle}
                  titleStyle={styles.backButtonTitleStyle}
                  onPress={() => navigate('Diet')}
                />
                <Button
                  title="Supplements"
                  icon={{
                    name: 'medical-bag',
                    size: ICON_SIZE,
                    color: styleCommon.iconColor,
                    type: 'material-community',
                  }}
                  iconRight={true}
                  containerStyle={styles.backButtonStyle}
                  buttonStyle={styles.backButtonStyle}
                  titleStyle={styles.backButtonTitleStyle}
                  onPress={this.onPressSupplementsButton}
                />
              </View>
            </View>
            <View>
              <Animated.View style={[styles.dayBarStyle, animatedViewStyle]}>
                <Button
                  title="Training day"
                  containerStyle={styles.buttonContainer}
                  buttonStyle={
                    activeDay ? styles.activeDayButton : styles.dayButton
                  }
                  icon={
                    <Icon
                      name="run-fast"
                      size={activeDay ? ICON_SIZE_24 : ICON_SIZE_22}
                      color={trainingIconColor}
                      style={styles.buttonIconStyle}
                    />
                  }
                  titleStyle={
                    activeDay
                      ? styles.activeDayButtonText
                      : styles.dayButtonText
                  }
                  onPress={() => this.onDayChange('training')}
                />
                <Button
                  title="Rest day"
                  containerStyle={styles.buttonContainer}
                  buttonStyle={
                    !activeDay ? styles.activeDayButton : styles.dayButton
                  }
                  icon={
                    <Icon
                      name="sleep"
                      size={!activeDay ? ICON_SIZE_24 : ICON_SIZE_22}
                      color={restIconColor}
                      style={styles.buttonIconStyle}
                    />
                  }
                  titleStyle={
                    !activeDay
                      ? styles.activeDayButtonText
                      : styles.dayButtonText
                  }
                  onPress={() => this.onDayChange('rest')}
                />
              </Animated.View>
            </View>
            <TotalDietMacros
              totalCal={totalCalories}
              protein={proteinInGm}
              carbs={carbsInGm}
              fat={fatsInGm}
            />
            <View style={styles.weeklyBarStyle}>
              <View style={weeklyBarInnerStartStyle}>
                <TouchableOpacity
                  style={changeWeekButtonStyle}
                  onPress={() => this.changeWeek({prev: true})}>
                  <Icon
                    name="chevron-left"
                    size={ICON_SIZE_LARGE}
                    style={styles.navButtonIcon}
                    color={
                      prevWeekEnabled ? 'lightgrey' : styleCommon.textColor1
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={currentWeekStyle}>
                <Text style={styles.weekText}>
                  Week {this.state.currentWeek}
                </Text>
                {!this.state.showDayOnScroll && (
                  <Text style={dayColor}>(everyday meals)</Text>
                )}
                {this.state.showDayOnScroll && (
                  <Text style={dayColor}>({this.day})</Text>
                )}
              </View>
              <View style={weeklyBarInnerEndStyle}>
                <TouchableOpacity
                  style={changeWeekButtonStyle}
                  onPress={() => this.changeWeek({next: true})}>
                  <Icon
                    name="chevron-right"
                    size={ICON_SIZE_LARGE}
                    style={styles.navButtonIcon}
                    color={
                      nextWeekEnabled ? 'lightgrey' : styleCommon.textColor1
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <MealsContainer
              meals={mealList}
              dayBarScrollY={this.dayBarScrollY}
              showDayLabelOnScroll={this.showDayLabelOnScroll}
              hideDayLabelOnScroll={this.hideDayLabelOnScroll}
              onClickFeedback={this.onClickFeedback}
            />
            {!showMeals && (
              <PurchaseScreen
                isVisible={showPaymentModal}
                uid={navigation.getParam('uid')}
                dietId={dietId}
                selectedProgram={navigation.getParam('selectedProgram')}
                selectedGoal={navigation.getParam('selectedGoal')}
                fitnessLevel={navigation.getParam('fitnessLevel')}
                packageToPurchase={packageToPurchase}
                onClose={this.onClosePaymentModal}
                dietTrialEndDate={dietTrialEndDate}
                trialDaysLeft={trialDaysLeft}
              />
            )}
            {diet.paymentStatus && (
              <Feedback
                isVisible={showFeedbackModal}
                onClose={this.onCloseFeedbackModal}
                details={details}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}
