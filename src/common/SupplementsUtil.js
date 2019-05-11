import supplements from "../common/Supplements";

export const getSupplementsByLevel = level => {
  let levelSupplements = [];

  if (level === 1) levelSupplements = createKeyAndValues(supplements.beginner);
  else if (level === 2)
    levelSupplements = [
      ...createKeyAndValues(supplements.beginner),
      ...createKeyAndValues(supplements.intermediate)
    ];
  else if (level === 3)
    levelSupplements = [
      ...createKeyAndValues(supplements.beginner),
      ...createKeyAndValues(supplements.intermediate),
      ...createKeyAndValues(supplements.advanced)
    ];
  return levelSupplements;
};

export const getSupplementsBasedOnFitnessAndGoal = ({ fitnessLevel, goal }) => {
  let supplementList = [];
  const levelSupplements = getSupplementsByLevel(fitnessLevel)

  levelSupplements.map(supp => {
    if (supp.fatLoss && goal === 0) supplementList.push(supp);
    else if (supp.healthy && goal === 1) supplementList.push(supp);
    else if (supp.weightGain && goal === 2) supplementList.push(supp);
  });
  return supplementList;
};

export const getSupplementKeysBasedOnFitnessAndGoal = ({ fitnessLevel, goal }) => {
  let supplementKeyList = [];
  const levelSupplements = getSupplementsByLevel(fitnessLevel)

  levelSupplements.map(supp => {
    if (supp.value.fatLoss && goal === 0) supplementKeyList.push(supp.key);
    else if (supp.value.healthy && goal === 1) supplementKeyList.push(supp.key);
    else if (supp.value.weightGain && goal === 2) supplementKeyList.push(supp.key);
  });
  return supplementKeyList;
};

export const getSupplementsByKeyList = keys => {
  const allSupplements = [
    ...createKeyAndValues(supplements.beginner),
    ...createKeyAndValues(supplements.intermediate),
    ...createKeyAndValues(supplements.advanced)
  ];
  const supplementList = []
  allSupplements.map(supp => {
    keys.map(key => {
      if(supp.key === key) supplementList.push(supp)
    })
  })
  return supplementList
}

export const createKeyAndValues = sources => {
  return Object.keys(sources).map(key => {
    return {
      key,
      value: sources[key]
    };
  });
};
