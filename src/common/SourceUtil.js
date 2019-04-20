import { proteinSources, carbSources, fatSources } from "./Sources";

export const getProteinSources = () => {
  return createKeyAndValues(proteinSources)
}

export const getCarbSources = () => {
  return createKeyAndValues(carbSources)
}

export const getFatSources = () => {
  return createKeyAndValues(fatSources)
}

export const getSourcesByIdList = idList => {
  return createKeyAndValuesForIdList(idList, getAllSources())
}

export const getSourcesByIdListAndType = (idList, sourceType) => {
  return createKeyAndValuesForIdList(idList, getSourcesByType(sourceType))
}

export const getStandardSources = sourceType => {
  return createKeyAndValuesForStandard(getSourcesByType(sourceType));
}

export const getDefaultSources = sourceType => {
  return createKeyAndValuesForDefault(getSourcesByType(sourceType));
}

export const createKeyAndValues = sources => {
  return Object.keys(sources).map(key => {
    return {
      key,
      value: sources[key],
    };
  });
};

export const createKeyAndValuesForIdList = (idList, sources) => {
  const sourceList = [];
  Object.keys(sources).map(key => {
    const value = sources[key];
    const source = idList.find(item => item.key === key)
    if(source)
      sourceList.push({
        key,
        value,
      });
    });
  return sourceList;
};

export const createKeyAndValuesForDefault = sources => {
  const defaultSources = [];
  Object.keys(sources).map(key => {
    const value = sources[key];
    if(value.beginnerDefault)
      defaultSources.push({
        key,
        value,
      });
    });
  return defaultSources;
};

export const createKeyAndValuesForStandard = sources => {
  const standardSources = [];
  Object.keys(sources).map(key => {
    const value = sources[key];
    if(value.isStandardForBeginner)
      standardSources.push({
        key,
        value,
      });
    });
  return standardSources;
};

const getSourcesByType = type => {
  let sources = []
  if (type === "protein") sources = proteinSources;
  else if (type === "carb") sources = carbSources;
  else if (type === "fat") sources = fatSources;
  return sources
}

const getAllSources = () => {
  return [...proteinSources, ...carbSources, ...fatSources];
}