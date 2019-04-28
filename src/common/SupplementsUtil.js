import { supplements } from "../common/Supplements"

export const getSupplementsByLevel = level => {
  return createKeyAndValues(supplements.beginner)
}

export const createKeyAndValues = sources => {
  return Object.keys(sources).map(key => {
    return {
      key,
      value: sources[key]
    };
  });
};