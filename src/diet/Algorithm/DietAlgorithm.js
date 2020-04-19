import {database} from '../../common/FirebaseConfig';
import {
  calculateCalFromProteinOrCarbs,
  calculateCalFromFats,
  MALE,
  FEMALE,
} from '../../common/Common';
import {sourceQuantities, manageSources} from './SourceDistribution';
import {createMeals} from './MealsAlgorithm';
import {convertGoal} from '../../common/Util';
import {getVeggies, getFruits} from '../../common/SourceUtil';
import {
  FOOD_PREF_VEG,
  FOOD_PREF_NON_VEG,
  FOOD_PREF_EGGETARIAN,
  FOOD_PREF_VEGAN,
  findNumberOfVegProteinSources,
} from '../../common/SourceUtil';
import {getCalPerWeek} from './WeeklyCalories';
import {WEIGHT_LOSS, WEIGHT_GAIN, BE_HEALTHY} from '../../common/Common';
import {
  LOSS_MACRO_PERCENTS,
  GAIN_MACRO_PERCENTS,
  LOSS_MACRO_PERCENTS_VEG,
  GAIN_MACRO_PERCENTS_VEG,
  LOSS_MACRO_PERCENTS_SEMI_NON_VEG,
  GAIN_MACRO_PERCENTS_SEMI_NON_VEG,
  LOSS_MACRO_PERCENTS_ADVANCED,
  GAIN_MACRO_PERCENTS_ADVANCED,
  LOSS_MACRO_PERCENTS_VEG_ADVANCED,
  GAIN_MACRO_PERCENTS_VEG_ADVANCED,
  LOSS_MACRO_PERCENTS_SEMI_NON_VEG_ADVANCED,
  GAIN_MACRO_PERCENTS_SEMI_NON_VEG_ADVANCED,
} from './SourceQuantityData';

let BMR = 0;
const FITNESS_LEVEL_ONE_ADDITION = 1.2; //1.2 times BMR i.e., (BMR * 1.2)
const FITNESS_LEVEL_TWO_ADDITION = 1.46; //1.2 times BMR i.e., (BMR * 1.46)
const FITNESS_LEVEL_THREE_ADDITION = 1.72; //1.2 times BMR i.e., (BMR * 1.72)
const CALORIE_PERCENTS = [
  {goal: WEIGHT_LOSS, weight: 0.25, level: 1, percent: 88},
  {goal: WEIGHT_LOSS, weight: 0.5, level: 1, percent: 75},
  {goal: WEIGHT_LOSS, weight: 1, level: 1, percent: 50},
  {goal: WEIGHT_LOSS, weight: 0.25, level: 2, percent: 90},
  {goal: WEIGHT_LOSS, weight: 0.5, level: 2, percent: 80},
  {goal: WEIGHT_LOSS, weight: 1, level: 2, percent: 59},
  {goal: WEIGHT_LOSS, weight: 0.25, level: 3, percent: 91},
  {goal: WEIGHT_LOSS, weight: 0.5, level: 3, percent: 83},
  {goal: WEIGHT_LOSS, weight: 1, level: 3, percent: 65},

  {goal: BE_HEALTHY, weight: 0, level: 1, percent: 90},
  {goal: BE_HEALTHY, weight: 0.25, level: 1, percent: 84},
  {goal: BE_HEALTHY, weight: 0.5, level: 1, percent: 70},
  {goal: BE_HEALTHY, weight: 0, level: 2, percent: 92},
  {goal: BE_HEALTHY, weight: 0.25, level: 2, percent: 86},
  {goal: BE_HEALTHY, weight: 0.5, level: 2, percent: 75},
  {goal: BE_HEALTHY, weight: 0, level: 3, percent: 92},
  {goal: BE_HEALTHY, weight: 0.25, level: 3, percent: 88},
  {goal: BE_HEALTHY, weight: 0.5, level: 3, percent: 80},

  {goal: WEIGHT_GAIN, weight: 0.25, level: 1, percent: 112},
  {goal: WEIGHT_GAIN, weight: 0.5, level: 1, percent: 125},
  {goal: WEIGHT_GAIN, weight: 1, level: 1, percent: 150},
  {goal: WEIGHT_GAIN, weight: 0.25, level: 2, percent: 110},
  {goal: WEIGHT_GAIN, weight: 0.5, level: 2, percent: 120},
  {goal: WEIGHT_GAIN, weight: 1, level: 2, percent: 141},
  {goal: WEIGHT_GAIN, weight: 0.25, level: 3, percent: 109},
  {goal: WEIGHT_GAIN, weight: 0.5, level: 3, percent: 117},
  {goal: WEIGHT_GAIN, weight: 1, level: 3, percent: 135},
];

/*const BEGINNER_LOSS_MACRO_PERCENTS = {protein: 25, carbs: 40, fat: 35};
const BEGINNER_GAIN_MACRO_PERCENTS = {protein: 25, carbs: 40, fat: 35};
const MIN_HUMAN_CAL_INTAKE = 1500;
const BEGINNER_DEFAULT_SOURCES = ['chia-seeds', 'flax-seeds'];*/

const getCalPercent = ({goal, fitnessLevel, weightChangePerWeek}) => {
  for (let i = 0, len = CALORIE_PERCENTS.length; i < len; i += 1) {
    if (
      CALORIE_PERCENTS[i].goal === goal &&
      CALORIE_PERCENTS[i].level === fitnessLevel &&
      CALORIE_PERCENTS[i].weight === weightChangePerWeek
    ) {
      return CALORIE_PERCENTS[i].percent;
    }
  }
  return null;
};

// const convertMealsPerDay = (mealsPerDay) => mealsPerDay.charAt(0);

export const getPossibleTargetWeights = (
  goal,
  program,
  currentWeight,
  fitnessLevel,
) => {
  const targetWeights = [];
  goal = convertGoal(goal);
  CALORIE_PERCENTS.map((data) => {
    if (
      program > 0 &&
      goal.length > 0 &&
      goal === data.goal &&
      fitnessLevel === data.level
    ) {
      if (goal === WEIGHT_GAIN) {
        targetWeights.push(currentWeight + data.weight * program);
      } else if (goal === WEIGHT_LOSS || goal === BE_HEALTHY) {
        targetWeights.push(currentWeight - data.weight * program);
      }
    }
  });
  return targetWeights;
};

const calculateBMR = ({currentWeight, height, age, gender}) => {
  if (gender === MALE) {
    BMR = 10 * currentWeight + 6.25 * height - 5 * age + 5;
  } else if (gender === FEMALE) {
    BMR = 10 * currentWeight + 6.25 * height - 5 * age + 161;
  }
};

const maintainanceCalBasedOnFitness = (fitnessLevel, bmr) => {
  switch (fitnessLevel) {
    case 1:
      return bmr * FITNESS_LEVEL_ONE_ADDITION;
    case 2:
      return bmr * FITNESS_LEVEL_TWO_ADDITION;
    case 3:
      return bmr * FITNESS_LEVEL_THREE_ADDITION;
    default:
      return bmr;
  }
};

const getTotalCalIntake = ({
  goal,
  fitnessLevel,
  currentWeight,
  height,
  age,
  gender,
  targetWeight,
  selectedProgram,
}) => {
  calculateBMR({currentWeight, height, age, gender});
  const maintainanceCal = Math.round(
    maintainanceCalBasedOnFitness(fitnessLevel, BMR),
  );
  let weightChangePerWeek = 0;
  if (goal === WEIGHT_LOSS || goal === BE_HEALTHY) {
    weightChangePerWeek = (currentWeight - targetWeight) / selectedProgram;
  } else if (goal === WEIGHT_GAIN) {
    weightChangePerWeek = (targetWeight - currentWeight) / selectedProgram;
  }

  // console.log('weightChangePerWeek:', weightChangePerWeek);
  const calPercent = getCalPercent({goal, fitnessLevel, weightChangePerWeek});

  const totalCalIntake = (maintainanceCal * calPercent) / 100;
  return Math.round(totalCalIntake);
};

export const designDiet = async ({
  selectedProteinSources,
  selectedFatSources,
  selectedCarbSources,
  selectedGoal,
  selectedProgram,
  selectedMeals,
  currentWeight,
  targetWeight,
  fitnessLevel,
  foodPreference,
  uid,
}) => {
  /*console.log(
    'props',
    fitnessLevel,
    selectedGoal,
    selectedProgram,
    selectedMeals,
    currentWeight,
    targetWeight,
    foodPreference,
    uid,
  );*/

  let user = {};
  await database
    .ref('users')
    .child(uid)
    .once('value')
    .then((snapshot) => {
      user = snapshot.val();
    })
    .catch((error) => {
      console.log('error while fetching user details in DietAlgorithm:', error);
    });
  const goal = convertGoal(selectedGoal);
  let numberOfMeals = 4;
  if (selectedMeals) {
    numberOfMeals = selectedMeals;
  }
  // console.log({
  //   goal,
  //   selectedProgram,
  //   currentWeight,
  //   targetWeight,
  //   height: user.height,
  //   age: user.age,
  //   gender: user.gender,
  //   fitnessLevel,
  // });
  const totalCalIntake = getTotalCalIntake({
    goal,
    selectedProgram,
    currentWeight,
    targetWeight,
    height: user.height,
    age: user.age,
    gender: user.gender,
    fitnessLevel,
  });
  console.log('Total daily calorie Intake is:', totalCalIntake);
  if (totalCalIntake <= 0) {
    return;
  }

  const defaultSourcesQuantities = await beginnerDefaultSourcesAndCal();
  const {proteinSources, carbSources, fatSources} = await manageSources({
    selectedProteinSources,
    selectedFatSources,
    selectedCarbSources,
    foodPreference,
  });
  const veggies = getVeggies(fitnessLevel);
  const fruits = getFruits(fitnessLevel);

  //calorie intake for each week
  const calPerWeek = getCalPerWeek(totalCalIntake, selectedProgram, goal);

  console.log('calPerWeek:', calPerWeek);

  const numberOfVegProteinSources =
    foodPreference === FOOD_PREF_NON_VEG
      ? findNumberOfVegProteinSources(proteinSources)
      : 0;

  const trainingAndRestdayCals = calPerWeek.map((calories) =>
    getCalFromSources(
      goal,
      calories,
      foodPreference,
      numberOfVegProteinSources,
      fitnessLevel,
    ),
  );

  //console.log('trainingAndRestdayCals:', trainingAndRestdayCals);
  const weeklyMeals = [];
  trainingAndRestdayCals.map(({trainingDayCal, restDayCal}, index) => {
    if (
      index === 0 ||
      (index > 0 &&
        trainingDayCal !== trainingAndRestdayCals[index - 1].trainingDayCal)
    ) {
      let {calFromProtein, calFromCarbs, calFromFats} = trainingDayCal;

      //console.log("calFromProtein, calFromCarbs,calFromFats",calFromProtein, calFromCarbs,calFromFats)
      let {
        calFromProteinForRD,
        calFromCarbsForRD,
        calFromFatsForRD,
      } = restDayCal;
      calFromProtein =
        calFromProtein - defaultSourcesQuantities.calFromSources.calFromProtein;
      calFromCarbs =
        calFromCarbs - defaultSourcesQuantities.calFromSources.calFromCarbs;
      calFromFats =
        calFromFats - defaultSourcesQuantities.calFromSources.calFromFats;
      //console.log("calFromProtein, calFromCarbs,calFromFats",calFromProtein, calFromCarbs,calFromFats)

      calFromProteinForRD =
        calFromProteinForRD -
        defaultSourcesQuantities.calFromSources.calFromProtein;
      calFromCarbsForRD =
        calFromCarbsForRD -
        defaultSourcesQuantities.calFromSources.calFromCarbs;
      calFromFatsForRD =
        calFromFatsForRD - defaultSourcesQuantities.calFromSources.calFromFats;

      const proteinSourcesAndQuantities = sourceQuantities({
        selectedSources: proteinSources,
        calFromSource: calFromProtein,
        calFromSourceForRD: calFromProteinForRD,
        isProtein: true,
      });
      //console.log("proteinSourcesAndQuantities",proteinSourcesAndQuantities)
      calFromFats =
        calFromFats - proteinSourcesAndQuantities.calFromSources.calFromFats;
      calFromCarbs =
        calFromCarbs - proteinSourcesAndQuantities.calFromSources.calFromCarbs;
      calFromCarbsForRD =
        calFromCarbsForRD -
        proteinSourcesAndQuantities.calFromSourcesForRD.calFromCarbsForRD;
      calFromFatsForRD =
        calFromFatsForRD -
        proteinSourcesAndQuantities.calFromSourcesForRD.calFromFatsForRD;
        //console.log("calFromProtein, calFromCarbs,calFromFats",calFromProtein, calFromCarbs,calFromFats)

      let fatSourcesAndQuantities = [];
      let carbSourcesAndQuantities = [];
      if (foodPreference === FOOD_PREF_NON_VEG) {
        fatSourcesAndQuantities = sourceQuantities({
          selectedSources: fatSources,
          calFromSource: calFromFats,
          calFromSourceForRD: calFromFatsForRD,
          isFat: true,
        });
        calFromCarbs =
          calFromCarbs - fatSourcesAndQuantities.calFromSources.calFromCarbs;
        calFromCarbsForRD =
          calFromCarbsForRD -
          fatSourcesAndQuantities.calFromSourcesForRD.calFromCarbsForRD;

        carbSourcesAndQuantities = sourceQuantities({
          selectedSources: carbSources,
          calFromSource: calFromCarbs,
          calFromSourceForRD: calFromCarbsForRD,
          isCarb: true,
        });
      }

      //console.log("calFromProtein, calFromCarbs,calFromFats",calFromProtein, calFromCarbs,calFromFats)
      const foodSources = [
        defaultSourcesQuantities,
        proteinSourcesAndQuantities,
        fatSourcesAndQuantities,
        carbSourcesAndQuantities,
      ];
      const foodSourceCalories = totalCaloriesFromSourceQuantities(foodSources);

      //console.log("totalCaloriesFromSourceQuantities", foodSourceCalories)

      const {trainingDayMeals, restDayMeals} = createMeals({
        foodSources,
        numberOfMeals,
        veggies,
        fruits,
      });
      //console.log('trainingDayMeals', trainingDayMeals)
      //console.log('restDayMeals', restDayMeals)
      const traningDayCalories =
        foodSourceCalories.calFromProtein +
        foodSourceCalories.calFromCarbs +
        foodSourceCalories.calFromFats;
      const restDayCalories =
        foodSourceCalories.calFromProteinForRD +
        foodSourceCalories.calFromCarbsForRD +
        foodSourceCalories.calFromFatsForRD;

      weeklyMeals.push({
        week: index + 1,
        calFromProtein: foodSourceCalories.calFromProtein,
        calFromProteinForRD: foodSourceCalories.calFromProteinForRD,
        calFromCarbs: foodSourceCalories.calFromCarbs,
        calFromCarbsForRD: foodSourceCalories.calFromCarbsForRD,
        calFromFats: foodSourceCalories.calFromFats,
        calFromFatsForRD: foodSourceCalories.calFromFatsForRD,
        traningDayCal: traningDayCalories,
        restDayCal: restDayCalories,
        trainingDayMeals,
        restDayMeals,
      });
    } else {
      weeklyMeals.push({
        ...weeklyMeals[index - 1],
        week: index,
      });
    }
  });
  return weeklyMeals;
};

const getCalFromSources = (
  goal,
  totalCalIntake,
  foodPreference,
  numberOfVegProteinSources,
  fitnessLevel,
) => {
  const {
    lossPercent,
    gainPercent,
    excludeProteinCal,
    excludeFatCal,
    excludeCarbCal,
  } = getMacroPercentsAndExcludeCal({
    fitnessLevel,
    foodPreference,
    numberOfVegProteinSources,
  });

  let calFromProtein =
    goal === WEIGHT_LOSS || goal === BE_HEALTHY
      ? (totalCalIntake * lossPercent.protein) / 100
      : (totalCalIntake * gainPercent.protein) / 100;

  let calFromCarbs =
    goal === WEIGHT_LOSS || goal === BE_HEALTHY
      ? (totalCalIntake * lossPercent.carbs) / 100
      : (totalCalIntake * gainPercent.carbs) / 100;

  let calFromFats =
    goal === WEIGHT_LOSS || goal === BE_HEALTHY
      ? (totalCalIntake * lossPercent.fat) / 100
      : (totalCalIntake * gainPercent.fat) / 100;

  /* subtract 100 cal from protein and 50 cal from fat
    because carb and fat sources contain some protein
    and also carb sources contain fat */
  calFromProtein = calFromProtein - excludeProteinCal;
  calFromFats = calFromFats - excludeFatCal;
  calFromCarbs = calFromCarbs - excludeCarbCal;
  const trainingDayCal = {
    calFromProtein,
    calFromFats: calFromFats > 0 ? calFromFats : 0,
    calFromCarbs: calFromCarbs > 0 ? calFromCarbs : 0,
  };

  let calFromProteinForRD =
    goal === WEIGHT_LOSS || goal === BE_HEALTHY
      ? (BMR * lossPercent.protein) / 100
      : (BMR * gainPercent.protein) / 100;

  let calFromCarbsForRD =
    goal === WEIGHT_LOSS || goal === BE_HEALTHY
      ? (BMR * lossPercent.carbs) / 100
      : (BMR * gainPercent.carbs) / 100;

  let calFromFatsForRD =
    goal === WEIGHT_LOSS || goal === BE_HEALTHY
      ? (BMR * lossPercent.fat) / 100
      : (BMR * gainPercent.fat) / 100;

  /* subtract 100 cal from protein and 50 cal from fat
    because carb and fat sources contain some protein
    and also carb sources contain fat */
  calFromProteinForRD = calFromProteinForRD - excludeProteinCal;
  calFromFatsForRD = calFromFatsForRD - excludeFatCal;
  calFromCarbsForRD = calFromCarbsForRD - excludeCarbCal;
  const restDayCal = {
    calFromProteinForRD,
    calFromFatsForRD: calFromFatsForRD > 0 ? calFromFatsForRD : 0,
    calFromCarbsForRD: calFromCarbsForRD > 0 ? calFromCarbsForRD : 0,
  };

  return {
    trainingDayCal,
    restDayCal,
  };
};

const getMacroPercentsAndExcludeCal = ({
  fitnessLevel,
  foodPreference,
  numberOfVegProteinSources,
}) => {
  let lossPercent = LOSS_MACRO_PERCENTS;
  let gainPercent = GAIN_MACRO_PERCENTS;
  if (fitnessLevel === 3) {
    lossPercent = LOSS_MACRO_PERCENTS_ADVANCED;
    gainPercent = GAIN_MACRO_PERCENTS_ADVANCED;
  }
  let excludeProteinCal = 120;
  const excludeFatCal = 120;
  let excludeCarbCal = 100;
  if (
    foodPreference === FOOD_PREF_VEG ||
    foodPreference === FOOD_PREF_VEGAN ||
    foodPreference === FOOD_PREF_EGGETARIAN ||
    numberOfVegProteinSources >= 3
  ) {
    lossPercent = LOSS_MACRO_PERCENTS_VEG;
    gainPercent = GAIN_MACRO_PERCENTS_VEG;
    if (fitnessLevel === 3) {
      lossPercent = LOSS_MACRO_PERCENTS_VEG_ADVANCED;
      gainPercent = GAIN_MACRO_PERCENTS_VEG_ADVANCED;
    }
    excludeProteinCal = 160;
  } else if (numberOfVegProteinSources === 2) {
    lossPercent = LOSS_MACRO_PERCENTS_SEMI_NON_VEG;
    gainPercent = GAIN_MACRO_PERCENTS_SEMI_NON_VEG;
    if (fitnessLevel === 3) {
      lossPercent = LOSS_MACRO_PERCENTS_SEMI_NON_VEG_ADVANCED;
      gainPercent = GAIN_MACRO_PERCENTS_SEMI_NON_VEG_ADVANCED;
    }
    excludeProteinCal = 140;
    excludeCarbCal = 140;
  }
  return {
    lossPercent,
    gainPercent,
    excludeProteinCal,
    excludeFatCal,
    excludeCarbCal,
  };
};

const beginnerDefaultSourcesAndCal = async () => {
  let calFromSources = {};
  let proteinCal = 0;
  let carbCal = 0;
  let fatCal = 0;
  const defaultSources = await getBeginnerDefaultSources();
  const defaultSourcesQuantities = [];
  defaultSources.map((source) => {
    const {protein, carbs, fat, beginnerDefaultQuantity} = source.value;

    if (protein) {
      proteinCal =
        proteinCal +
        calculateCalFromProteinOrCarbs(
          calculateMacroPerQuantity({
            macroValue: protein,
            quantity: beginnerDefaultQuantity * 14, // 14 gm per table spoon
          }),
        );
    }
    if (carbs) {
      carbCal =
        carbCal +
        calculateCalFromProteinOrCarbs(
          calculateMacroPerQuantity({
            macroValue: carbs,
            quantity: beginnerDefaultQuantity * 14,
          }),
        );
    }
    if (fat) {
      fatCal =
        fatCal +
        calculateCalFromFats(
          calculateMacroPerQuantity({
            macroValue: fat,
            quantity: beginnerDefaultQuantity * 14,
          }),
        );
    }

    defaultSourcesQuantities.push({
      source,
      macroValue: beginnerDefaultQuantity,
      macroQuantity: beginnerDefaultQuantity * 14, // 14 gm per table spoon
      macroValueForRD: beginnerDefaultQuantity,
      macroQuantityForRD: beginnerDefaultQuantity * 14,
    });
  });
  calFromSources = {
    calFromProtein: proteinCal,
    calFromCarbs: carbCal,
    calFromFats: fatCal,
  };

  /*console.log(
    'default source values: ',
    defaultSourcesQuantities,
    calFromSources,
  );*/
  return {
    defaultSourcesQuantities,
    calFromSources,
  };
};

const totalCaloriesFromSourceQuantities = (foodSources) => {
  let calFromProtein = 0;
  let calFromFats = 0;
  let calFromCarbs = 0;
  let calFromProteinForRD = 0;
  let calFromFatsForRD = 0;
  let calFromCarbsForRD = 0;
  foodSources.map((sources, index) => {
    if (sources && sources.calFromSources) {
      let calFromSources = {};
      let calFromSourcesForRD = {};
      if (index === 0) {
        calFromSources = sources.calFromSources;
        calFromSourcesForRD = {
          calFromProteinForRD: sources.calFromSources.calFromProtein,
          calFromFatsForRD: sources.calFromSources.calFromFats,
          calFromCarbsForRD: sources.calFromSources.calFromCarbs,
        };
      } else {
        calFromSources = sources.calFromSources;
        calFromSourcesForRD = sources.calFromSourcesForRD;
      }
      calFromProtein = Math.round(
        calFromProtein + calFromSources.calFromProtein,
      );
      calFromProteinForRD = Math.round(
        calFromProteinForRD + calFromSourcesForRD.calFromProteinForRD,
      );
      calFromFats = Math.round(calFromFats + calFromSources.calFromFats);
      calFromFatsForRD = Math.round(
        calFromFatsForRD + calFromSourcesForRD.calFromFatsForRD,
      );
      calFromCarbs = Math.round(calFromCarbs + calFromSources.calFromCarbs);
      calFromCarbsForRD = Math.round(
        calFromCarbsForRD + calFromSourcesForRD.calFromCarbsForRD,
      );
    }
  });

  return {
    calFromProtein,
    calFromCarbs,
    calFromFats,
    calFromProteinForRD,
    calFromFatsForRD,
    calFromCarbsForRD,
  };
};

//calculate protein/carbs/fat per quantity
/*Example
  chicken 31gm(macroValue) protein for 100gm(TotalMacroQuantity) so calculateMacroPerQuantity gives us protein for 30gm(quantity) of chicken  */
const calculateMacroPerQuantity = ({
  TotalMacroQuantity,
  macroValue,
  quantity,
}) => {
  //by default we have all macro calculations as per 100gm in database
  if (!TotalMacroQuantity) {
    TotalMacroQuantity = 100;
  }
  return macroValue / (TotalMacroQuantity / quantity);
};

// ---------FETCH DATA------------

const getBeginnerDefaultSources = async () => {
  let defaultSources = [];
  await database
    .ref('fat-sources')
    .orderByChild('beginnerDefault')
    .equalTo(true)
    .once('value')
    .then((snapshot) => {
      console.log('beginner default values :', snapshot.val());
      if (snapshot.val()) {
        const result = snapshot.val();
        defaultSources = Object.keys(result).map((key) => ({
          key,
          value: result[key],
        }));
      }
    })
    .catch((error) =>
      console.log(
        'error while fetching default sources from DietAlgorithm:',
        error,
      ),
    );
  return defaultSources;
};
