import {
  proteinSources,
  carbSources,
  fatSources,
  veggies,
  fruits,
} from './Sources';
import {
  proteinSourcesWithImages,
  carbSourcesWithImages,
  fatSourcesWithImages,
} from './SourcesWithImages';

export const FOOD_PREF_VEGAN = 'VEGAN';
export const FOOD_PREF_VEG = 'VEG';
export const FOOD_PREF_NON_VEG = 'NON_VEG';
export const FOOD_PREF_EGGETARIAN = 'EGGETARIAN';

export const getProteinSources = () => {
  return createKeyAndValues(proteinSources);
};

export const getCarbSources = () => {
  return createKeyAndValues(carbSources);
};

export const getFatSources = () => {
  return createKeyAndValues(fatSources);
};

export const getProteinSourcesWithImages = (foodPreference) => {
  let proteinSourcesR = [];
  if (foodPreference === FOOD_PREF_VEGAN) {
    proteinSourcesR = proteinSourcesWithImages.filter(
      (source) => source.isVegan,
    );
  } else if (foodPreference === FOOD_PREF_VEG) {
    proteinSourcesR = proteinSourcesWithImages.filter((source) => source.isVeg);
  } else if (foodPreference === FOOD_PREF_EGGETARIAN) {
    proteinSourcesR = proteinSourcesWithImages.filter(
      (source) => source.isVeg || source.isEggetarian,
    );
  } else {
    proteinSourcesR = proteinSourcesWithImages;
  }

  return proteinSourcesR;
};

export const getCarbSourcesWithImages = () => {
  return carbSourcesWithImages;
};

export const getFatSourcesWithImages = () => {
  return fatSourcesWithImages;
};

export const getSourcesWithImages = (sourceType, foodPreference) => {
  let sources = [];
  if (sourceType === 'protein') {
    sources = getProteinSourcesWithImages(foodPreference);
  } else if (sourceType === 'carb') {
    sources = getCarbSourcesWithImages();
  } else if (sourceType === 'fat') {
    sources = getFatSourcesWithImages();
  }
  return sources;
};

export const getSourcesByIdList = (idList) => {
  return createKeyAndValuesForIdList(idList, getAllSources());
};

export const getSourcesByIdListAndType = (idList, sourceType) => {
  return createKeyAndValuesForIdList(idList, getSourcesByType(sourceType));
};

export const getStandardSources = (sourceType) => {
  return createKeyAndValuesForStandard(getSourcesByType(sourceType));
};

export const getStandardForProteinSources = (foodPref) => {
  return createKeyAndValuesForStandardProtein(
    getSourcesByType('protein'),
    foodPref,
  );
};

export const findNumberOfVegProteinSources = (proteinSourcesP) => {
  let number = 0;
  if (proteinSourcesP) {
    proteinSourcesP.map((source) => {
      if (source.value.isVeg) {
        number = number + 1;
      }
    });
  }
  return number;
};

export const getDefaultSources = (sourceType) => {
  return createKeyAndValuesForDefault(getSourcesByType(sourceType));
};

export const getVeggies = (fitnessLevel) => {
  const allVeggies = createKeyAndValues(veggies);
  return allVeggies.filter((veggie) => {
    if (fitnessLevel === 1 && veggie.value.isStandardForBeginner) {
      return true;
    } else if (fitnessLevel === 2 && veggie.value.isStandardForIntermediate) {
      return true;
    } else if (fitnessLevel === 3 && veggie.value.isStandardForAdvanced) {
      return true;
    } else {
      return false;
    }
  });
};

export const getFruits = (fitnessLevel) => {
  const allFruits = createKeyAndValues(fruits);
  return allFruits.filter((fruit) => {
    if (fitnessLevel === 1 && fruit.value.isStandardForBeginner) {
      return true;
    } else if (fitnessLevel === 2 && fruit.value.isStandardForIntermediate) {
      return true;
    } else if (fitnessLevel === 3 && fruit.value.isStandardForAdvanced) {
      return true;
    } else {
      return false;
    }
  });
};

export const createKeyAndValues = (sources) => {
  return Object.keys(sources).map((key) => {
    return {
      key,
      value: sources[key],
    };
  });
};

export const createKeyAndValuesForIdList = (idList, sources) => {
  const sourceList = [];
  Object.keys(sources).map((key) => {
    const value = sources[key];
    const source = idList.find((item) => item.key === key);
    if (source) {
      sourceList.push({
        key,
        value,
      });
    }
  });
  return sourceList;
};

export const createKeyAndValuesForDefault = (sources) => {
  const defaultSources = [];
  Object.keys(sources).map((key) => {
    const value = sources[key];
    if (value.beginnerDefault) {
      defaultSources.push({
        key,
        value,
      });
    }
  });
  return defaultSources;
};

export const createKeyAndValuesForStandard = (sources) => {
  const standardSources = [];
  Object.keys(sources).map((key) => {
    const value = sources[key];
    if (value.isStandard) {
      standardSources.push({
        key,
        value,
      });
    }
  });
  return standardSources;
};

export const createKeyAndValuesForStandardProtein = (sources, foodPref) => {
  const standardSources = [];
  Object.keys(sources).map((key) => {
    const value = sources[key];
    if (
      (foodPref === FOOD_PREF_VEGAN && value.isStandardForVegan) ||
      (foodPref === FOOD_PREF_VEG && value.isStandardForVeg) ||
      (foodPref === FOOD_PREF_NON_VEG && value.isStandardForNonVeg) ||
      (foodPref === FOOD_PREF_EGGETARIAN && value.isStandardForEgg)
    ) {
      standardSources.push({
        key,
        value,
      });
    }
  });
  return standardSources;
};

const getSourcesByType = (type) => {
  let sources = [];
  if (type === 'protein') {
    sources = proteinSources;
  } else if (type === 'carb') {
    sources = carbSources;
  } else if (type === 'fat') {
    sources = fatSources;
  }
  return sources;
};

const getAllSources = () => {
  return [...proteinSources, ...carbSources, ...fatSources];
};
