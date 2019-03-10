import { f, auth, database } from "../../common/FirebaseConfig";
import {
  convertProgramToWeeks,
  calculateCalFromProteinOrCarbs,
  calculateCalFromFats
} from "../../common/Common";
import { sourceQuantities } from "./SourceDistribution";

const MALE = "male";
const FEMALE = "female";
const WEIGHT_LOSS = "loss";
const WEIGHT_GAIN = "gain";
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

const LOSS_MACRO_PERCENTS = { carbs: 30, protein: 40, fat: 30 };
const GAIN_MACRO_PERCENTS = { carbs: 45, protein: 30, fat: 25 };
const BEGINNER_LOSS_MACRO_PERCENTS = { protein: 25, carbs: 40, fat: 35 };
const BEGINNER_GAIN_MACRO_PERCENTS = { protein: 25, carbs: 40, fat: 35 };
const MIN_HUMAN_CAL_INTAKE = 1500;
const BEGINNER_DEFAULT_SOURCES = ["chia-seeds", "flax-seeds"];

const getCalPercent = ({ goal, fitnessLevel, weightLossPerWeek }) => {
  for (let i = 0, len = CALORIE_PERCENTS.length; i < len; i += 1) {
    if (
      CALORIE_PERCENTS[i].goal === goal &&
      CALORIE_PERCENTS[i].level === fitnessLevel &&
      CALORIE_PERCENTS[i].weight === weightLossPerWeek
    ) {
      return CALORIE_PERCENTS[i].percent;
    }
  }
  return null;
};

convertGoal = goal => (goal.includes("loss") ? "loss" : "gain");

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

const calculateBRM = ({ currentWeight, height, age, gender }) => {
  let bmr = 0;
  if (gender === MALE) {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
  } else if (gender === FEMALE) {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age + 161;
  }
  return bmr;
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
  const maintainanceCal = maintainanceCalBasedOnFitness(
    fitnessLevel,
    calculateBRM({ currentWeight, height, age, gender })
  );
  let weightLossPerWeek = 0;
  if (goal === WEIGHT_LOSS) {
    weightLossPerWeek =
      (currentWeight - targetWeight) / convertProgramToWeeks(selectedProgram);
  } else if (goal === WEIGHT_GAIN) {
    weightLossPerWeek =
      (targetWeight - currentWeight) / convertProgramToWeeks(selectedProgram);
  }
  const calPercent = getCalPercent({ goal, fitnessLevel, weightLossPerWeek });

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

  let { calFromProtein, calFromCarbs, calFromFats } = calFromSources(
    goal,
    totalCalIntake
  );
  console.log(
    "Calories from protein, carbs and fats:",
    calFromProtein,
    calFromCarbs,
    calFromFats
  );

  const { defaultSources, defaultSourceCal } = await beginnerDefaultSourcesAndCal();
  const foodSources = [];
  if (defaultSources.length > 0) foodSources.push(defaultSources);
  const {
    proteinSources,
    carbSources,
    fatSources
  } = await getStandardSourcesForBeginner();

  calFromProtein = calFromProtein - defaultSourceCal.protein;
  calFromCarbs = calFromCarbs - defaultSourceCal.carbs;
  calFromFats = calFromFats - defaultSourceCal.fat;

  const proteinSourcesAndQuantities = sourceQuantities({
    selectedSources: proteinSources,
    calFromSource: calFromProtein,
    isProtein: true
  });
  const fatSourcesAndQuantities = sourceQuantities({
    selectedSources: fatSources,
    calFromSource: calFromFats,
    isFat: true
  });
  const carbSourcesAndQuantities = sourceQuantities({
    selectedSources: carbSources,
    calFromSource: calFromCarbs,
    isCarb: true
  });

  console.log("proteinSourcesAndQuantities:", proteinSourcesAndQuantities);
  console.log("fatSourcesAndQuantities:", fatSourcesAndQuantities);
  console.log("carbSourcesAndQuantities:", carbSourcesAndQuantities);
};

calFromSources = (goal, totalCalIntake) => {
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
  return {
    calFromProtein: calFromProtein - 100,
    calFromFats: calFromFats - 50,
    calFromCarbs
  };
};

const getStandardSourcesForBeginner = async () => {
  const proteinSources = await getStandardProteinSourcesForBeginners();
  const carbSources = await getStandardCarbSourcesForBeginners();
  const fatSources = await getStandardFatSourcesForBeginners();
  return {
    proteinSources,
    carbSources,
    fatSources,
  };
};

const beginnerDefaultSourcesAndCal = async () => {
  let defaultSourceCal = {};
  let proteinCal = 0;
  let carbCal = 0;
  let fatCal = 0;
  const defaultSources = await getBeginnerDefaultSources();
  defaultSources.map(source => {
    const { protein, carbs, fat, beginnerDefaultQuantity } = source.value;

    if (protein)
      proteinCal =
        proteinCal +
        calculateCalFromProteinOrCarbs(
          calculateMacroPerQuantity({
            macroValue: protein,
            quantity: beginnerDefaultQuantity
          })
        );
    if (carbs)
      carbCal =
        carbCal +
        calculateCalFromProteinOrCarbs(
          calculateMacroPerQuantity({
            macroValue: carbs,
            quantity: beginnerDefaultQuantity
          })
        );
    if (fat)
      fatCal =
        fatCal +
        calculateCalFromFats(
          calculateMacroPerQuantity({
            macroValue: fat,
            quantity: beginnerDefaultQuantity
          })
        );
  });
  defaultSourceCal = {
    protein: proteinCal,
    carbs: carbCal,
    fat: fatCal
  };

  console.log("default source values: ", defaultSources, defaultSourceCal);
  return {
    defaultSources,
    defaultSourceCal
  };
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
