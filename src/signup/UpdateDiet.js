import api from '../common/Api';

export const createDiet = async ({dietInfo, uid}) => {
  //save diet and meals
  //console.log('before creating diet');
  const {dietId} = await api.post('/createDiet', dietInfo);
  //console.log('diet created successfully with diet id', dietId);
  //await createSupplements({fitnessLevel, goal: selectedGoal, dietId});
  return dietId;
};
