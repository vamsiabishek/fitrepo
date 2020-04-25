import {designDiet} from '../diet/Algorithm/DietAlgorithm';
import {f, database} from '../common/FirebaseConfig';
import {getSupplementKeysBasedOnFitnessAndGoal} from '../common/SupplementsUtil';
import api from '../common/Api';

const createSupplements = async ({fitnessLevel, goal, dietId}) => {
  // console.log('creating  supplements for dietId :', dietId);
  const supplementKeys = getSupplementKeysBasedOnFitnessAndGoal({
    fitnessLevel,
    goal,
  });
  await database
    .ref(`supplements/${dietId}`)
    .push(supplementKeys)
    .then((res) => {
      console.log('successfully saved the supplements for the diet');
    })
    .catch((error) => {
      console.log('error while saving supplements for a diet:', error);
    });
};

export const createDiet = async ({dietInfo, uid}) => {
  const {
    selectedGoal,
    selectedProgram,
    selectedMeals,
    currentWeight,
    targetWeight,
    fitnessLevel,
    foodPreference,
    paymentStatus,
  } = dietInfo;

  //save diet and meals
  console.log('before creating diet')
  const {dietId} = await api.post('/createDiet', dietInfo);
  console.log('diet created successfully with diet id', dietId)
  //await createSupplements({fitnessLevel, goal: selectedGoal, dietId});
  return dietId;
};
