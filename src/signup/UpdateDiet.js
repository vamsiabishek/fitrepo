import { designDiet } from "../diet/Algorithm/DietAlgorithm";
import { f, database } from "../common/FirebaseConfig";

export const createDiet = async ({
  selectedProteinSources,
  selectedFatSources,
  selectedCarbSources,
  selectedGoal,
  selectedProgram,
  selectedMeals,
  currentWeight,
  targetWeight,
  isVeg,
  uid,
}) => {
  
  //create diet using these options
  const mealDetails = await designDiet({
    selectedProteinSources,
    selectedFatSources,
    selectedCarbSources,
    selectedGoal,
    selectedProgram,
    selectedMeals,
    currentWeight,
    targetWeight,
    isVeg,
    uid,
  });
  const {
    calFromProtein,
    calFromProteinForRD,
    calFromCarbs,
    calFromCarbsForRD,
    calFromFats,
    calFromFatsForRD
  } = mealDetails;

  const traningDayCal = calFromProtein + calFromCarbs + calFromFats;
  const restDayCal =
    calFromProteinForRD + calFromCarbsForRD + calFromFatsForRD;

  const dietDetails = {
    selectedGoal,
    selectedProgram,
    selectedMeals,
    currentWeight,
    targetWeight,
    traningDayCal,
    restDayCal,
    isVeg,
    userId: uid
  };

  //save diet and meals
  const dietId = await this.saveDietAndMeals({ dietDetails, mealDetails });
  return dietId;
};

saveDietAndMeals = async ({ dietDetails, mealDetails }) => {
  let dietId = "";
  await database
    .ref("diets")
    .push({
      ...dietDetails,
      createdDate: f.database.ServerValue.TIMESTAMP,
      likes: 0
    })
    .then(res => {
      dietId = res.key;
    })
    .catch(error => {
      console.log("error while saving new diet:", error);
      
    });
  await database
    .ref("meals")
    .push({ ...mealDetails, dietId })
    .then(res => {
      console.log("Successfully saved diet and meals");
    })
    .catch(error => {
      console.log("error while saving meals to the diet:", error);
    });
  return dietId;
};