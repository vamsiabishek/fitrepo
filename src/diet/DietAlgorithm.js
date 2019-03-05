import { f, auth, database } from "./../common/FirebaseConfig";
import { convertProgramToWeeks } from "../common/Common";

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
  goal = convertGoal(goal);
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
  const totalCalIntake = getTotalCalIntake({
    goal: selectedGoal,
    selectedProgram,
    currentWeight,
    targetWeight,
    height: user.height,
    age: user.age,
    gender: user.gender,
    fitnessLevel: 2
  });
  console.log("Total daily calorie Intake is:", totalCalIntake);
};
