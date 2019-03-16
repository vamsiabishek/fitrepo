import { f, auth, database } from "../../common/FirebaseConfig";
import {
  convertProgramToWeeks,
  calculateCalFromProteinOrCarbs,
  calculateCalFromFats
} from "../../common/Common";
import { sourceQuantities } from "./SourceDistribution";
import { createMeals } from './MealsAlgorithm';

const MALE = "male";
const FEMALE = "female";
const WEIGHT_LOSS = "loss";
const WEIGHT_GAIN = "gain";
let BMR = 0;
const FITNESS_LEVEL_ONE_ADDITION = 1.2; //1.2 times BMR i.e., (BMR * 1.2)
const FITNESS_LEVEL_TWO_ADDITION = 1.46; //1.2 times BMR i.e., (BMR * 1.46)
const FITNESS_LEVEL_THREE_ADDITION = 1.72; //1.2 times BMR i.e., (BMR * 1.72)
const CALORIE_PERCENTS = [
  { goal: "loss", weight: 0.25, level: 1, percent: 88 },
  { goal: "loss", weight: 0.5, level: 1, percent: 75 },
  { goal: "loss", weight: 1, level: 1, percent: 50 },
  { goal: "loss", weight: 0.25, level: 2, percent: 90 },
  { goal: "loss", weight: 0.5, level: 2, percent: 80 },
  { goal: "loss", weight: 1, level: 2, percent: 59 },
  { goal: "loss", weight: 0.25, level: 3, percent: 91 },
  { goal: "loss", weight: 0.5, level: 3, percent: 83 },
  { goal: "loss", weight: 1, level: 3, percent: 65 },
  { goal: "gain", weight: 0.25, level: 1, percent: 112 },
  { goal: "gain", weight: 0.5, level: 1, percent: 125 },
  { goal: "gain", weight: 1, level: 1, percent: 150 },
  { goal: "gain", weight: 0.25, level: 2, percent: 110 },
  { goal: "gain", weight: 0.5, level: 2, percent: 120 },
  { goal: "gain", weight: 1, level: 2, percent: 141 },
  { goal: "gain", weight: 0.25, level: 3, percent: 109 },
  { goal: "gain", weight: 0.5, level: 3, percent: 117 },
  { goal: "gain", weight: 1, level: 3, percent: 135 }
];

const LOSS_MACRO_PERCENTS = { carbs: 30, protein: 35, fat: 35 };
const GAIN_MACRO_PERCENTS = { carbs: 40, protein: 30, fat: 30 };
const BEGINNER_LOSS_MACRO_PERCENTS = { protein: 25, carbs: 40, fat: 35 };
const BEGINNER_GAIN_MACRO_PERCENTS = { protein: 25, carbs: 40, fat: 35 };
const MIN_HUMAN_CAL_INTAKE = 1500;
const BEGINNER_DEFAULT_SOURCES = ["chia-seeds", "flax-seeds"];

const getCalPercent = ({ goal, fitnessLevel, weightChangePerWeek }) => {
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

convertGoal = goal => (goal.includes("loss") ? "loss" : "gain");
convertMealsPerDay = mealsPerDay => mealsPerDay.charAt(0);

export const getPossibleTargetWeights = (
  goal,
  program,
  currentWeight,
  fitnessLevel
) => {
  const targetWeights = [];
  CALORIE_PERCENTS.map(data => {
    goal = convertGoal(goal);
    if (
      program > 0 &&
      goal.length > 0 &&
      goal === data.goal &&
      fitnessLevel === data.level
    ) {
      if (goal === WEIGHT_GAIN) {
        targetWeights.push(currentWeight + data.weight * program);
      } else if (goal === WEIGHT_LOSS) {
        targetWeights.push(currentWeight - data.weight * program);
      }
    }
  });
  return targetWeights;
};

const calculateBMR = ({ currentWeight, height, age, gender }) => {
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
    case 2:
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
  selectedProgram
}) => {
  calculateBMR({ currentWeight, height, age, gender });
  const maintainanceCal = Math.round(maintainanceCalBasedOnFitness(fitnessLevel, BMR));
  let weightChangePerWeek = 0;
  if (goal === WEIGHT_LOSS) {
    weightChangePerWeek =
      (currentWeight - targetWeight) / convertProgramToWeeks(selectedProgram);
  } else if (goal === WEIGHT_GAIN) {
    weightChangePerWeek =
      (targetWeight - currentWeight) / convertProgramToWeeks(selectedProgram);
  }
  const calPercent = getCalPercent({ goal, fitnessLevel, weightChangePerWeek });

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
  targetWeight
}) => {
  const currentUser = await f.auth().currentUser;

  let user = {};
  await database
    .ref("users")
    .child(currentUser.uid)
    .once("value")
    .then(snapshot => {
      user = snapshot.val();
    })
    .catch(error => {
      console.log("error while fetching user details in DietAlgorithm:", error);
    });
  console.log("user:", user);
  const goal = convertGoal(selectedGoal);
  let numberOfMeals = 4;
  if(selectedMeals) numberOfMeals = convertMealsPerDay(selectedMeals);
  const totalCalIntake = getTotalCalIntake({
    goal,
    selectedProgram,
    currentWeight,
    targetWeight,
    height: user.height,
    age: user.age,
    gender: user.gender.toLowerCase(),
    fitnessLevel: 2
  });
  console.log("Total daily calorie Intake is:", totalCalIntake);

  const { trainingDayCal, restDayCal } = getCalFromSources(
    goal,
    totalCalIntake
  );
  let { calFromProtein, calFromCarbs, calFromFats } = trainingDayCal;
  let { calFromProteinForRD, calFromCarbsForRD, calFromFatsForRD } = restDayCal;
  console.log(
    "Calories from protein, carbs and fats:",
    calFromProtein,
    calFromCarbs,
    calFromFats
  );

  const defaultSourcesQuantities = await beginnerDefaultSourcesAndCal();
  const {
    proteinSources,
    carbSources,
    fatSources
  } = await getStandardSourcesForBeginner();

  calFromProtein =
    calFromProtein - defaultSourcesQuantities.calFromSources.calFromProtein;
  calFromCarbs =
    calFromCarbs - defaultSourcesQuantities.calFromSources.calFromCarbs;
  calFromFats =
    calFromFats - defaultSourcesQuantities.calFromSources.calFromFats;

  calFromProteinForRD =
    calFromProteinForRD -
    defaultSourcesQuantities.calFromSources.calFromProtein;
  calFromCarbsForRD =
    calFromCarbsForRD - defaultSourcesQuantities.calFromSources.calFromCarbs;
  calFromFatsForRD =
    calFromFatsForRD - defaultSourcesQuantities.calFromSources.calFromFats;

  const proteinSourcesAndQuantities = sourceQuantities({
    selectedSources: proteinSources,
    calFromSource: calFromProtein,
    calFromSourceForRD: calFromProteinForRD,
    isProtein: true
  });
  calFromFats =
    calFromFats - proteinSourcesAndQuantities.calFromSources.calFromFats;
  calFromCarbs =
    calFromCarbs - proteinSourcesAndQuantities.calFromSources.calFromCarbs;
  calFromCarbsForRD =
    calFromCarbsForRD - proteinSourcesAndQuantities.calFromSourcesForRD.calFromCarbsForRD;
  calFromFatsForRD =
    calFromFatsForRD - proteinSourcesAndQuantities.calFromSourcesForRD.calFromFatsForRD;

  const fatSourcesAndQuantities = sourceQuantities({
    selectedSources: fatSources,
    calFromSource: calFromFats,
    calFromSourceForRD: calFromFatsForRD,
    isFat: true
  });
  calFromCarbs =
    calFromCarbs - fatSourcesAndQuantities.calFromSources.calFromCarbs;
  calFromCarbsForRD =
    calFromCarbsForRD - fatSourcesAndQuantities.calFromSourcesForRD.calFromCarbsForRD;

  const carbSourcesAndQuantities = sourceQuantities({
    selectedSources: carbSources,
    calFromSource: calFromCarbs,
    calFromSourceForRD: calFromCarbsForRD,
    isCarb: true
  });

  //console.log("proteinSourcesAndQuantities:", proteinSourcesAndQuantities);
  //console.log("fatSourcesAndQuantities:", fatSourcesAndQuantities);
  //console.log("carbSourcesAndQuantities:", carbSourcesAndQuantities);

  const foodSources = [
    defaultSourcesQuantities,
    proteinSourcesAndQuantities,
    fatSourcesAndQuantities,
    carbSourcesAndQuantities
  ];
  const foodSourceCalories = totalCaloriesFromSourceQuantities(foodSources);
  console.log("calFromProtein:", foodSourceCalories.calFromProtein, foodSourceCalories.calFromProteinForRD);
  console.log("calFromCarbs:", foodSourceCalories.calFromCarbs, foodSourceCalories.calFromCarbsForRD);
  console.log("calFromFats:", foodSourceCalories.calFromFats, foodSourceCalories.calFromFatsForRD);

  createMeals({foodSources, numberOfMeals});
};

getCalFromSources = (goal, totalCalIntake) => {
  let calFromProtein =
    goal === WEIGHT_LOSS
      ? (totalCalIntake * LOSS_MACRO_PERCENTS.protein) / 100
      : (totalCalIntake * GAIN_MACRO_PERCENTS.protein) / 100;

  let calFromCarbs =
    goal === WEIGHT_LOSS
      ? (totalCalIntake * LOSS_MACRO_PERCENTS.carbs) / 100
      : (totalCalIntake * GAIN_MACRO_PERCENTS.carbs) / 100;

  let calFromFats =
    goal === WEIGHT_LOSS
      ? (totalCalIntake * LOSS_MACRO_PERCENTS.fat) / 100
      : (totalCalIntake * GAIN_MACRO_PERCENTS.fat) / 100;

  /* subtract 100 cal from protein and 50 cal from fat 
    because carb and fat sources contain some protein
    and also carb sources contain fat */
  const trainingDayCal = {
    calFromProtein: calFromProtein - 120,
    calFromFats: calFromFats - 100,
    calFromCarbs
  };

  let calFromProteinForRD =
    goal === WEIGHT_LOSS
      ? (BMR * LOSS_MACRO_PERCENTS.protein) / 100
      : (BMR * GAIN_MACRO_PERCENTS.protein) / 100;

  let calFromCarbsForRD =
    goal === WEIGHT_LOSS
      ? (BMR * LOSS_MACRO_PERCENTS.carbs) / 100
      : (BMR * GAIN_MACRO_PERCENTS.carbs) / 100;

  let calFromFatsForRD =
    goal === WEIGHT_LOSS
      ? (BMR * LOSS_MACRO_PERCENTS.fat) / 100
      : (BMR * GAIN_MACRO_PERCENTS.fat) / 100;

  /* subtract 100 cal from protein and 50 cal from fat 
    because carb and fat sources contain some protein
    and also carb sources contain fat */
  const restDayCal = {
    calFromProteinForRD: calFromProteinForRD - 120,
    calFromFatsForRD: calFromFatsForRD - 100,
    calFromCarbsForRD
  };

  return {
    trainingDayCal,
    restDayCal
  };
};

const getStandardSourcesForBeginner = async () => {
  const proteinSources = await getStandardProteinSourcesForBeginners();
  const carbSources = await getStandardCarbSourcesForBeginners();
  const fatSources = await getStandardFatSourcesForBeginners();
  return {
    proteinSources,
    carbSources,
    fatSources
  };
};

const beginnerDefaultSourcesAndCal = async () => {
  let calFromSources = {};
  let proteinCal = 0;
  let carbCal = 0;
  let fatCal = 0;
  const defaultSources = await getBeginnerDefaultSources();
  const defaultSourcesQuantities = [];
  defaultSources.map(source => {
    const { protein, carbs, fat, beginnerDefaultQuantity } = source.value;

    if (protein)
      proteinCal =
        proteinCal +
        calculateCalFromProteinOrCarbs(
          calculateMacroPerQuantity({
            macroValue: protein,
            quantity: beginnerDefaultQuantity * 14 // 14 gm per table spoon
          })
        );
    if (carbs)
      carbCal =
        carbCal +
        calculateCalFromProteinOrCarbs(
          calculateMacroPerQuantity({
            macroValue: carbs,
            quantity: beginnerDefaultQuantity * 14
          })
        );
    if (fat)
      fatCal =
        fatCal +
        calculateCalFromFats(
          calculateMacroPerQuantity({
            macroValue: fat,
            quantity: beginnerDefaultQuantity * 14
          })
        );

    defaultSourcesQuantities.push({
      source,
      macroValue: beginnerDefaultQuantity,
      macroQuantity: beginnerDefaultQuantity * 14 // 14 gm per table spoon
    });
  });
  calFromSources = {
    calFromProtein: proteinCal,
    calFromCarbs: carbCal,
    calFromFats: fatCal
  };

  console.log(
    "default source values: ",
    defaultSourcesQuantities,
    calFromSources
  );
  return {
    defaultSourcesQuantities,
    calFromSources
  };
};

totalCaloriesFromSourceQuantities = foodSources => {
  let calFromProtein = 0;
  let calFromFats = 0;
  let calFromCarbs = 0;
  let calFromProteinForRD = 0;
  let calFromFatsForRD = 0;
  let calFromCarbsForRD = 0;
  foodSources.map((sources, index) => {
    let calFromSources = {};
    let calFromSourcesForRD = {};
    if(index === 0){
      calFromSources = sources.calFromSources;
      calFromSourcesForRD = {
        calFromProteinForRD: sources.calFromSources.calFromProtein,
        calFromFatsForRD: sources.calFromSources.calFromFats,
        calFromCarbsForRD: sources.calFromSources.calFromCarbs,
      }
    } else {
      calFromSources = sources.calFromSources;
      calFromSourcesForRD = sources.calFromSourcesForRD;
    }
    calFromProtein = calFromProtein + calFromSources.calFromProtein;
    calFromProteinForRD = calFromProteinForRD + calFromSourcesForRD.calFromProteinForRD;
    calFromFats = calFromFats + calFromSources.calFromFats;
    calFromFatsForRD = calFromFatsForRD + calFromSourcesForRD.calFromFatsForRD;
    calFromCarbs = calFromCarbs + calFromSources.calFromCarbs;
    calFromCarbsForRD = calFromCarbsForRD + calFromSourcesForRD.calFromCarbsForRD;
  })
 
  return { calFromProtein, calFromCarbs, calFromFats, calFromProteinForRD, calFromFatsForRD, calFromCarbsForRD };
};

//calculate protein/carbs/fat per quantity
/*Example 
  chicken 31gm(macroValue) protein for 100gm(TotalMacroQuantity) so calculateMacroPerQuantity gives us protein for 30gm(quantity) of chicken  */
calculateMacroPerQuantity = ({ TotalMacroQuantity, macroValue, quantity }) => {
  //by default we have all macro calculations as per 100gm in database
  if (!TotalMacroQuantity) TotalMacroQuantity = 100;
  return macroValue / (TotalMacroQuantity / quantity);
};

// ---------FETCH DATA------------

getStandardProteinSourcesForBeginners = async () => {
  let standardProteinSources = [];
  await database
    .ref("protein-sources")
    .orderByChild("isStandardForBeginner")
    .equalTo(true)
    .once("value")
    .then(snapshot => {
      if (snapshot.val()) {
        const result = snapshot.val();
        standardProteinSources = Object.keys(result).map(key => ({
          key,
          value: result[key]
        }));
      }
    })
    .catch(error => {
      console.log(
        "error while fetching standard protein sources in DietAlgorithm:",
        error
      );
    });
  return standardProteinSources;
};

getStandardCarbSourcesForBeginners = async () => {
  let standardCarbSources = [];
  await database
    .ref("carb-sources")
    .orderByChild("isStandardForBeginner")
    .equalTo(true)
    .once("value")
    .then(snapshot => {
      if (snapshot.val()) {
        const result = snapshot.val();
        standardCarbSources = Object.keys(result).map(key => ({
          key,
          value: result[key]
        }));
      }
    })
    .catch(error => {
      console.log(
        "error while fetching standard carb sources in DietAlgorithm:",
        error
      );
    });
  return standardCarbSources;
};

getStandardFatSourcesForBeginners = async () => {
  let standardFatSources = [];
  await database
    .ref("fat-sources")
    .orderByChild("isStandardForBeginner")
    .equalTo(true)
    .once("value")
    .then(snapshot => {
      if (snapshot.val()) {
        const result = snapshot.val();
        standardFatSources = Object.keys(result).map(key => ({
          key,
          value: result[key]
        }));
      }
    })
    .catch(error => {
      console.log(
        "error while fetching standard fat sources in DietAlgorithm:",
        error
      );
    });
  return standardFatSources;
};

getBeginnerDefaultSources = async () => {
  let defaultSources = [];
  await database
    .ref("fat-sources")
    .orderByChild("beginnerDefault")
    .equalTo(true)
    .once("value")
    .then(snapshot => {
      console.log("beginner default values :", snapshot.val());
      if (snapshot.val()) {
        const result = snapshot.val();
        defaultSources = Object.keys(result).map(key => ({
          key,
          value: result[key]
        }));
      }
    })
    .catch(error =>
      console.log(
        "error while fetching default sources from DietAlgorithm:",
        error
      )
    );
  return defaultSources;
};

const calculateMarcoValue = ({ marcoQuantity, source }) => {
  let marcoValue = 0;
  let referenceMacroValue = 0;

  if (source.value.isPerSingleUnit)
    marcoValue = Math.round(marcoQuantity / referenceMacroValue);
  else marcoValue = Math.round((marcoQuantity * 100) / referenceMacroValue);

  return marcoValue;
};
