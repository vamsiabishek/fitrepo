import { designDiet } from "../diet/Algorithm/DietAlgorithm";
import { f, database } from "../common/FirebaseConfig";
import { getSupplementKeysBasedOnFitnessAndGoal } from "../common/SupplementsUtil";

export const createDiet = async ({ dietInfo, uid }) => {
  const {
    selectedGoal,
    selectedProgram,
    selectedMeals,
    currentWeight,
    targetWeight,
    fitnessLevel,
    foodPreference,
    paymentStatus
  } = dietInfo;
  //create diet using these options
  const mealDetails = await designDiet({
    ...dietInfo,
    uid
  });
  // console.log(mealDetails);

  const dietDetails = {
    selectedGoal,
    selectedProgram,
    selectedMeals,
    currentWeight,
    targetWeight,
    fitnessLevel,
    foodPreference,
    paymentStatus
  };

  //save diet and meals
  const dietId = await this.saveDietAndMeals({ dietDetails, mealDetails, uid });
  await createSupplements({ fitnessLevel, goal: selectedGoal, dietId });
  return dietId;
};

saveDietAndMeals = async ({ dietDetails, mealDetails, uid }) => {
  let dietId = "";
  await database
    .ref(`diets/${uid}`)
    .push({
      ...dietDetails,
      createdDate: f.database.ServerValue.TIMESTAMP,
      likes: 0
    })
    .then(res => {
      dietId = res.key;
    })
    .catch(error => {
      // console.log("error while saving new diet:", error);
    });
  await database
    .ref("meals")
    .push({ ...mealDetails, dietId })
    .then(res => {
      // console.log("Successfully saved diet and meals");
    })
    .catch(error => {
      // console.log("error while saving meals to the diet:", error);
    });

  return dietId;
};

createSupplements = async ({ fitnessLevel, goal, dietId }) => {
  // console.log("creating  supplements for dietId :", dietId);
  const supplementKeys = getSupplementKeysBasedOnFitnessAndGoal({
    fitnessLevel,
    goal
  });
  await database
    .ref(`supplements/${dietId}`)
    .push(supplementKeys)
    .then(res => {
      // console.log("successfully saved the supplements for the diet");
    })
    .catch(error => {
      // console.log("error while saving supplements for a diet:", error);
    });
};
