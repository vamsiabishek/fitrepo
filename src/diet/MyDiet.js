import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Animated, UIManager} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getOfferingsByPurchaseId} from '../common/PurchaseUtils';
import TotalDietMacros from './TotalDietMarcos';
import MealsContainer from './meals/MealsContainer';
import {styles} from '../../assets/style/stylesMyDiet';
import {
  styleCommon,
  ICON_SIZE_24,
  ICON_SIZE_22,
  ICON_SIZE,
  ICON_SIZE_LARGE,
  SCREEN_HEIGHT,
} from '../../assets/style/stylesCommonValues';
import {database} from '../common/FirebaseConfig';
import Loading from '../components/Loading';
import PurchaseScreen from '../components/purchase/PurchaseScreen';
import {setFirstTimeUser, getFirstTimeUser, isTrailUser} from '../common/Util';
import {getProgramEndDate, getSeconds} from '../common/Util';

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
      paymentOptions: undefined,
    };
    this.dayBarScrollY = new Animated.Value(1);
    this.dayBarExpandedHeight = styles.dayBarStyle.height; // calculated by onLayout
    this.dayBarCollapsedHeight = 0;
  }

  componentDidMount = async () => {
    const {navigation} = this.props;
    const dietId = navigation.getParam('dietId');
    const uid = navigation.getParam('uid');
    //alert(getFirstTimeUser());
    await this.loadDietDetails(uid, dietId);
    await this.loadPaymentEntitlements(uid);
    await this.checkDietTrail();
  };

  componentDidUpdate = async (prevProps) => {
    const {navigation} = this.props;
    const dietId = navigation.getParam('dietId');
    const uid = navigation.getParam('uid');
    if (dietId !== prevProps.navigation.getParam('dietId')) {
      await this.loadDietDetails(uid, dietId);
      await this.loadPaymentEntitlements(uid);
    }
  };

  checkDietTrail = async () => {
    const showInitialTrailMeals = await isTrailUser();
    this.setState({showInitialTrailMeals});
  };

  loadDietDetails = async (uid, dietId) => {
    this.setState({isLoading: true});
    console.log('fetching details for the diet with Id:', dietId);
    const {diet, meals} = await this.fetchDietAndMeals(uid, dietId);
    //console.log('diet and meals:', diet, meals);
    this.setState({diet, meals: meals['0'], allMeals: meals});
  };

  fetchDietAndMeals = async (uid, dietId) => {
    const [diet, meals] = await Promise.all([
      this.fetchDiet(uid, dietId),
      this.fetchMeals(dietId),
    ]);
    return {diet, meals};
  };

  fetchDiet = async (uid, dietId) => {
    let diet = {};
    await database
      .ref(`diets/${uid}`)
      .child(dietId)
      .once('value')
      .then(async (snap) => {
        if (snap.val()) {
          diet = snap.val();
        }
        if (!diet.paymentStatus) {
          this.setState({
            showAllMealsForSubscribed: false,
            showPaymentModal: true,
          });
        } else {
          //global.isFirstTimeUser = false;
          await setFirstTimeUser();
        }
      })
      .catch((error) => {
        console.log('error while fetching diets from MyDiet page: ', error);
      });
    return diet;
  };

  fetchMeals = async (dietId) => {
    let meals = {};
    await database
      .ref('meals')
      .orderByChild('dietId')
      .equalTo(dietId)
      .once('value')
      .then((snap) => {
        if (snap.val()) {
          meals = snap.val()[Object.keys(snap.val())[0]];
        }
      })
      .catch((error) => {
        console.log('error while fetching meals from MyDiet page: ', error);
      });
    return meals;
  };

  loadPaymentEntitlements = async (uid) => {
    const offerings = await getOfferingsByPurchaseId(uid);
    console.log('Purchase Offerings Current ? : ', offerings);
    this.setState({isLoading: false, paymentOptions: offerings});
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
    const {diet} = this.state;
    if (!getFirstTimeUser() && diet.paymentStatus) {
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
      this.setState({showInitialTrailMeals: false, showPaymentModal: true});
    }
  };

  onClosePaymentModal = async (paymentDone = false) => {
    const {navigate} = this.props.navigation;
    this.setState({showPaymentModal: false});
    if (paymentDone) {
      const {navigation} = this.props;
      const {diet} = this.state;
      const newDietWithPayment = {
        paymentStatus: true,
      };
      const uid = navigation.getParam('uid');
      const dietId = navigation.getParam('dietId');
      this.setState({
        showInitialTrailMeals: true,
        showAllMealsForSubscribed: true,
      });
      await database
        .ref(`diets/${uid}`)
        .child(dietId)
        .update(newDietWithPayment)
        .then(() => {
          this.setState({diet: {...diet, ...newDietWithPayment}});
        })
        .catch((error) => {
          console.log(
            'Error while closing the payment modal and saving new diet details: ',
            error,
          );
        });
    } else if (!paymentDone && !getFirstTimeUser()) {
      navigate('Diet');
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const dietId = navigation.getParam('dietId');
    const {
      isLoading,
      activeDay,
      meals,
      allMeals,
      currentWeek,
      showInitialTrailMeals,
      showAllMealsForSubscribed,
      paymentOptions,
      showPaymentModal,
      diet,
    } = this.state;
    const {
      totalCalories,
      proteinInGm,
      carbsInGm,
      fatsInGm,
      mealList,
    } = this.caloriesMacrosAndMeals(meals);
    const dayBarHeight = this.dayBarScrollY.interpolate({
      inputRange: [0, this.dayBarExpandedHeight - 20],
      outputRange: [this.dayBarExpandedHeight, this.dayBarCollapsedHeight],
      extrapolate: 'clamp',
    });
    const showMeals = showInitialTrailMeals ? true : showAllMealsForSubscribed;
    let dietTrialEndDate;
    let trialDaysLeft;
    if (getFirstTimeUser() && !diet.purchaseStatus) {
      const trialPeriod = 1;
      dietTrialEndDate = getProgramEndDate(diet.createdDate, trialPeriod);
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
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Loading
            takeFullHeight={true}
            text={'We are getting your diet ...'}
            animationStr={require('../../assets/jsons/watermelon.json')}
            animationHeight={SCREEN_HEIGHT * 0.615}
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
                    color: styleCommon.panelHeaderIconColor,
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
                    color: styleCommon.panelHeaderIconColor,
                    type: 'material-community',
                  }}
                  iconRight={true}
                  containerStyle={styles.backButtonStyle}
                  buttonStyle={styles.backButtonStyle}
                  titleStyle={styles.backButtonTitleStyle}
                  onPress={() => navigate('Supplements', {dietId})}
                />
              </View>
            </View>
            <View>
              <Animated.View
                style={[
                  styles.dayBarStyle,
                  {height: dayBarHeight, backgroundColor: 'transparent'},
                ]}>
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
              <View style={{justifyContent: 'flex-start'}}>
                <TouchableOpacity
                  style={{paddingHorizontal: 10}}
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={styles.weekText}>
                  Week {this.state.currentWeek}
                </Text>
                {this.state.showDayOnScroll && (
                  <Text style={{color: 'lightgrey'}}>({this.day})</Text>
                )}
              </View>
              <View style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  style={{paddingHorizontal: 10}}
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
            />
            {!showMeals && (
              <PurchaseScreen
                isVisible={showPaymentModal}
                uid={navigation.getParam('uid')}
                dietId={dietId}
                selectedProgram={navigation.getParam('selectedProgram')}
                selectedGoal={navigation.getParam('selectedGoal')}
                fitnessLevel={navigation.getParam('fitnessLevel')}
                purchaseOptions={paymentOptions}
                onClose={this.onClosePaymentModal}
                dietTrialEndDate={dietTrialEndDate}
                trialDaysLeft={trialDaysLeft}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}
