import { designDiet } from "../diet/Algorithm/DietAlgorithm";
import { f, database } from "../common/FirebaseConfig";

export const createDiet = async ({dietInfo, uid}) => {
  const {
    selectedGoal,
    selectedProgram,
    selectedMeals,
    currentWeight,
    targetWeight,
    fitnessLevel,
    isVeg,
  } = dietInfo
  //create diet using these options
  const mealDetails = await designDiet({
    ...dietInfo,
    uid,
  });
  //console.log(mealDetails);

  const dietDetails = {
    selectedGoal,
    selectedProgram,
    selectedMeals,
    currentWeight,
    targetWeight,
    fitnessLevel,
    isVeg,
  };

  //save diet and meals
  const dietId = await this.saveDietAndMeals({ dietDetails, mealDetails, uid });
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