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
import {createKeyAndNameFromResult} from './Util';

export const FOOD_PREF_VEGAN = 'VEGAN';
export const FOOD_PREF_VEG = 'VEG';
export const FOOD_PREF_NON_VEG = 'NON_VEG';
export const FOOD_PREF_EGGETARIAN = 'EGGETARIAN';

export const getProteinSources = ({onlyNames}) => {
  return onlyNames
    ? createKeyAndNameFromResult(proteinSources)
    : createKeyAndValues(proteinSources);
};

export const getCarbSources = ({onlyNames}) => {
  return onlyNames
    ? createKeyAndNameFromResult(carbSources)
    : createKeyAndValues(carbSources);
};

export const getFatSources = ({onlyNames}) => {
  return onlyNames
    ? createKeyAndNameFromResult(fatSources)
    : createKeyAndValues(fatSources);
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
  sources = resetSourceSelections(sources);
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
    const {info, ...rest} = sources[key];
    return {
      key,
      value: {...rest},
    };
  });
};

export const createKeyAndValuesForIdList = (idList, sources) => {
  const sourceList = [];
  Object.keys(sources).map((key) => {
    const value = sources[key];
    const source = idList.find((item) => item.key === key);
    if (source) {
      const {info, ...rest} = value;
      sourceList.push({
        key,
        value: {...rest},
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
      const {info, ...rest} = value;
      defaultSources.push({
        key,
        value: {...rest},
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
      const {info, ...rest} = value;
      standardSources.push({
        key,
        value: {...rest},
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
      const {info, ...rest} = value;
      standardSources.push({
        key,
        value: {...rest},
      });
    }
  });
  return standardSources;
};

export const getFoodPrefByIndex = (index, defaultPref) => {
  let foodPreference = defaultPref;
  if (index === 0) {
    foodPreference = FOOD_PREF_VEGAN;
  } else if (index === 1) {
    foodPreference = FOOD_PREF_VEG;
  } else if (index === 2) {
    foodPreference = FOOD_PREF_EGGETARIAN;
  } else if (index === 3) {
    foodPreference = FOOD_PREF_NON_VEG;
  }
  return foodPreference;
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

export const getSourceInfo = (key) => {
  if (proteinSources[key]) {
    return proteinSources[key].info;
  } else if (carbSources[key]) {
    return carbSources[key].info;
  } else if (fatSources[key]) {
    return fatSources[key].info;
  }
  return null;
};

export const getSourceByKey = (key) => {
  if (proteinSources[key]) {
    const {uri} = proteinSourcesWithImages.find((source) => source.key === key);
    return {
      ...proteinSources[key],
      imageUrl: uri,
    };
  } else if (carbSources[key]) {
    const {uri} = carbSourcesWithImages.find((source) => source.key === key);
    return {
      ...carbSources[key],
      imageUrl: uri,
    };
  } else if (fatSources[key]) {
    const {uri} = fatSourcesWithImages.find((source) => source.key === key);
    return {
      ...fatSources[key],
      imageUrl: uri,
    };
  }
  return null;
};

export const resetSourceSelections = (sources) =>
  sources.map((source) => ({...source, selected: false}));
