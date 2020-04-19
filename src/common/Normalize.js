import {
  FOOD_PREF_VEGAN,
  FOOD_PREF_VEG,
  FOOD_PREF_NON_VEG,
  FOOD_PREF_EGGETARIAN,
  getSourcesWithImages,
} from './SourceUtil';

export const normalizeUserForSignup = (user) => {
  const foodPreference = user.foodPreference || FOOD_PREF_NON_VEG;
  const hasNoGender = user.gender >= 0 ? false : true;
  return {
    user: user,
    age: user.age || 0,
    dob: user.dob || '',
    weight: user.weight || 0,
    height: user.height || 0,
    gender: hasNoGender ? '' : user.gender,
    fitnessLevel: user.fitnessLevel || '',
    foodPrefBtn:
      foodPreference === FOOD_PREF_NON_VEG
        ? 3
        : foodPreference === FOOD_PREF_EGGETARIAN
        ? 2
        : foodPreference === FOOD_PREF_VEG
        ? 1
        : 0,
    foodPreference,
    proteinSources: getSourcesWithImages('protein', user.foodPreference),
    carbSources: getSourcesWithImages('carb'),
    fatSources: getSourcesWithImages('fat'),
    isLoadingComponent: false,
    showGender: hasNoGender,
  };
};
