import {
  proteinSources,
  carbSources,
  fatSources,
  veggies,
  fruits
} from "./Sources";
import {
  proteinSourcesWithImages,
  carbSourcesWithImages,
  fatSourcesWithImages
} from "./SourcesWithImages";

export const getProteinSources = () => {
  return createKeyAndValues(proteinSources);
};

export const getCarbSources = () => {
  return createKeyAndValues(carbSources);
};

export const getFatSources = () => {
  return createKeyAndValues(fatSources);
};

export const getProteinSourcesWithImages = isVeg => {
  return isVeg
    ? proteinSourcesWithImages.filter(source => source.isVeg)
    : proteinSourcesWithImages;
};

export const getCarbSourcesWithImages = isVeg => {
  return isVeg
    ? carbSourcesWithImages.filter(source => source.isVeg)
    : carbSourcesWithImages;
};

export const getFatSourcesWithImages = isVeg => {
  return isVeg
    ? fatSourcesWithImages.filter(source => source.isVeg)
    : fatSourcesWithImages;
};

export const getSourcesWithImages = (sourceType, isVeg) => {
  let sources = [];
  if (sourceType === "protein") sources = getProteinSourcesWithImages(isVeg);
  else if (sourceType === "carb") sources = getCarbSourcesWithImages(isVeg);
  else if (sourceType === "fat") sources = getFatSourcesWithImages(isVeg);
  return sources;
};

export const getSourcesByIdList = idList => {
  return createKeyAndValuesForIdList(idList, getAllSources());
};

export const getSourcesByIdListAndType = (idList, sourceType) => {
  return createKeyAndValuesForIdList(idList, getSourcesByType(sourceType));
};

export const getStandardSources = sourceType => {
  return createKeyAndValuesForStandard(getSourcesByType(sourceType));
};

export const getStandardVegSources = sourceType => {
  return createKeyAndValuesForStandardVeg(getSourcesByType(sourceType));
};

export const getDefaultSources = sourceType => {
  return createKeyAndValuesForDefault(getSourcesByType(sourceType));
};

export const getVeggies = fitnessLevel => {
  const allVeggies = createKeyAndValues(veggies);
  return allVeggies.filter(veggie => {
    if (fitnessLevel === 1 && veggie.value.isStandardForBeginner) return true;
    else if (fitnessLevel === 2 && veggie.value.isStandardForIntermediate)
      return true;
    else if (fitnessLevel === 3 && veggie.value.isStandardForAdvanced)
      return true;
    else return false;
  });
};

export const getFruits = fitnessLevel => {
  const allFruits = createKeyAndValues(fruits);
  return allFruits.filter(fruit => {
    if (fitnessLevel === 1 && fruit.value.isStandardForBeginner) return true;
    else if (fitnessLevel === 2 && fruit.value.isStandardForIntermediate)
      return true;
    else if (fitnessLevel === 3 && fruit.value.isStandardForAdvanced)
      return true;
    else return false;
  });
};

export const createKeyAndValues = sources => {
  return Object.keys(sources).map(key => {
    return {
      key,
      value: sources[key]
    };
  });
};

export const createKeyAndValuesForIdList = (idList, sources) => {
  const sourceList = [];
  Object.keys(sources).map(key => {
    const value = sources[key];
    const source = idList.find(item => item.key === key);
    if (source)
      sourceList.push({
        key,
        value
      });
  });
  return sourceList;
};

export const createKeyAndValuesForDefault = sources => {
  const defaultSources = [];
  Object.keys(sources).map(key => {
    const value = sources[key];
    if (value.beginnerDefault)
      defaultSources.push({
        key,
        value
      });
  });
  return defaultSources;
};

export const createKeyAndValuesForStandard = sources => {
  const standardSources = [];
  Object.keys(sources).map(key => {
    const value = sources[key];
    if (value.isStandardForBeginner)
      standardSources.push({
        key,
        value
      });
  });
  return standardSources;
};

export const createKeyAndValuesForStandardVeg = sources => {
  const standardSources = [];
  Object.keys(sources).map(key => {
    const value = sources[key];
    if (value.isStandardForBeginner && value.isVeg)
      standardSources.push({
        key,
        value
      });
  });
  return standardSources;
};

const getSourcesByType = type => {
  let sources = [];
  if (type === "protein") sources = proteinSources;
  else if (type === "carb") sources = carbSources;
  else if (type === "fat") sources = fatSources;
  return sources;
};

const getAllSources = () => {
  return [...proteinSources, ...carbSources, ...fatSources];
};
