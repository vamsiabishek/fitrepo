import {
  FOOD_PREF_VEGAN,
  FOOD_PREF_VEG,
  FOOD_PREF_NON_VEG,
  FOOD_PREF_EGGETARIAN,
  getSourcesWithImages,
  getSourcesWithImagesByIdList,
} from './SourceUtil';

const allergySourcesWithImages = (allergies) => {
  if (allergies?.length) {
    console.log('allergies', allergies)
    return getSourcesWithImagesByIdList(allergies);
  }
  return [];
};

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
    proteinSources: getSourcesWithImages({
      type: 'protein',
      foodPreference,
    }),
    carbSources: getSourcesWithImages({type: 'carb'}),
    fatSources: getSourcesWithImages({type: 'fat'}),
    isLoadingComponent: false,
    hasNoGender,
    privacyTermsAccepted: user.privacyTermsAccepted || false,
    allergies: allergySourcesWithImages(user.allergies),
  };
};
