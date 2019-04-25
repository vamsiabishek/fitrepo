const roundToNearestTenFactor = value => {
  return Math.round(value / 10) * 10;
};

export const createMeals = ({
  foodSources,
  numberOfMeals,
  veggies,
  fruits
}) => {
  let trainingDayMeals = [];
  let restDayMeals = [];
  //contains list of protein, carbs, fat and default sources
  foodSources.map((foodSource, index) => {
    let sources = [];
    if (index === 0) sources = foodSource.defaultSourcesQuantities;
    else sources = foodSource.sourceQuantityDistribution;
    if (sources)
      createMealsPerMacro({
        sources,
        numberOfMeals,
        trainingDayMeals,
        restDayMeals,
      });
  });
  addVeggiesAndFruits({
    trainingDayMeals,
    restDayMeals,
    numberOfMeals,
    veggies,
    fruits
  });
  console.log("trainingDayMeals:", trainingDayMeals);
  console.log("restDayMeals:", restDayMeals);
  return { trainingDayMeals, restDayMeals };
};

createMealsPerMacro = ({
  sources,
  numberOfMeals,
  trainingDayMeals,
  restDayMeals,
}) => {
  let x = 1;
  let sourceQuantityMap = {};
  let sourceQuantityMapForRD = {};
  let totalMacroQuantity = 0;
  let totalMacroQuantityForRD = 0;

  //sort sources with breakfast sources on top
  sources.sort((item1, item2) => {
    if (item1.source.value.isBreakfast === item2.source.value.isBreakfast)
      return 0;
    else if (item1.source.value.isBreakfast) return -1;
    else return 1;
  });

  //maintain marco value(Ex: 300 gm chicken) and quantity(Ex: 93 gm protein) values into map
  //also calculate total quantity of marco(Ex: 160gm of protein)
  sources.map(item => {
    const { key } = item.source;
    const {
      macroValue,
      macroQuantity,
      macroValueForRD,
      macroQuantityForRD
    } = item;
    sourceQuantityMap[key] = { macroValue, macroQuantity };

    sourceQuantityMapForRD[key] = {
      macroValue: macroValueForRD,
      macroQuantity: macroQuantityForRD
    };
    totalMacroQuantity = totalMacroQuantity + macroQuantity;
    totalMacroQuantityForRD = totalMacroQuantityForRD + macroQuantityForRD;
  });
  const maxMacroPerMeal = Math.round(totalMacroQuantity / numberOfMeals);
  const maxMacroPerMealForRD = Math.round(
    totalMacroQuantityForRD / numberOfMeals
  );

  while (x <= numberOfMeals) {
    const mealName = `Meal${x}`;
    let newMeal = true;
    let previousSourcesPerMealForTD = [];
    let previousSourcesPerMealForRD = [];
    const { mealOfTD, mealOfRD } = this.checkIfMealExists(
      trainingDayMeals,
      restDayMeals,
      mealName
    );
    let trainingDayMeal = mealOfTD;
    let restDayMeal = mealOfRD;
    if (mealOfTD && mealOfRD) {
      newMeal = false;
      if (trainingDayMeal.sources.length > 0) {
        previousSourcesPerMealForTD = trainingDayMeal.sources;
        trainingDayMeal.sources = [];
      }
      if (restDayMeal.sources.length > 0) {
        previousSourcesPerMealForRD = restDayMeal.sources;
        restDayMeal.sources = [];
      }
    }
    if (newMeal) {
      trainingDayMeal = { name: mealName, sources: [] };
      restDayMeal = { name: mealName, sources: [] };
    }

    if (sources.length > 0) {
      // for training day
      for (let i = 0; i < sources.length; i++) {
        const item = sources[i];
        const { key } = item.source;
        let source = {};

        if (sourceQuantityMap[key].macroValue > 0) {
          let { meal, updatedSource, sourceMap } = mealForSource({
            source,
            meal: trainingDayMeal,
            sourceMap: sourceQuantityMap,
            item,
            maxMacroPerMeal,
            forRestDay: false
          });
          trainingDayMeal = meal;
          source = updatedSource;
          sourceQuantityMap = sourceMap;
        }
        if (source.macroQuantity >= maxMacroPerMeal) {
          break;
        } else if (trainingDayMeal.sources.length > 0) {
          const totalQuantity = trainingDayMeal.sources.reduce(
            (sum, source) => sum + source.macroQuantity,
            0
          );
          //console.log("macro sum:", macroQuantity);
          if (totalQuantity >= maxMacroPerMeal) break;
        }
      }

      // for rest day
      for (let i = 0; i < sources.length; i++) {
        const item = sources[i];
        const { key } = item.source;
        let source = {};

        if (sourceQuantityMapForRD[key].macroValue > 0) {
          const { meal, updatedSource, sourceMap } = mealForSource({
            source,
            meal: restDayMeal,
            sourceMap: sourceQuantityMapForRD,
            item,
            maxMacroPerMeal: maxMacroPerMealForRD,
            forRestDay: true
          });
          restDayMeal = meal;
          source = updatedSource;
          sourceQuantityMapForRD = sourceMap;
        }
        if (source.macroQuantity >= maxMacroPerMealForRD) {
          break;
        } else if (restDayMeal.sources.length > 0) {
          const totalQuantityForRD = restDayMeal.sources.reduce(
            (sum, source) => sum + source.macroQuantity,
            0
          );
          //console.log("macro sum:", macroQuantity);
          if (totalQuantityForRD >= maxMacroPerMealForRD) break;
        }
      }

      trainingDayMeal.sources = [
        ...previousSourcesPerMealForTD,
        ...trainingDayMeal.sources
      ];
      restDayMeal.sources = [
        ...previousSourcesPerMealForRD,
        ...restDayMeal.sources
      ];
      if (newMeal) {
        trainingDayMeals.push(trainingDayMeal);
        restDayMeals.push(restDayMeal);
      }

      x++;
    }
    // console.log("trainingDayMeals:", trainingDayMeals);
    // console.log("restDayMeals:", restDayMeals);
  }
};

checkIfMealExists = (trainingDayMeals, restDayMeals, mealName) => {
  const meals = {};
  if (trainingDayMeals.length > 0) {
    meals.mealOfTD = trainingDayMeals.find(meal => meal.name === mealName);
  }
  if (restDayMeals.length > 0) {
    meals.mealOfRD = restDayMeals.find(meal => meal.name === mealName);
  }
  return meals;
};

mealForSource = ({
  source,
  sourceMap,
  maxMacroPerMeal,
  meal,
  item,
  forRestDay
}) => {
  const { key, value } = item.source;
  source = { ...source, name: value.name, id: key };
  let { macroValue, macroQuantity } = source;
  if (
    sourceMap[key].macroQuantity <= maxMacroPerMeal ||
    (value.hasTableSpoon && sourceMap[key].macroValue <= 2)
  ) {
    if (!value.isPerSingleUnit && !value.hasTableSpoon)
      macroValue = roundToNearestTenFactor(sourceMap[key].macroValue);
    else macroValue = sourceMap[key].macroValue;
    macroQuantity = sourceMap[key].macroQuantity;
    if (macroValue <= 0 && macroQuantity > 0) {
      macroValue = 5;
    }
    sourceMap[key] = { macroValue: 0, macroQuantity: 0 };
  } else {
    let macroValuePerHundredGm = Math.round(
      (item.macroQuantity / item.macroValue) * 100
    );
    if (forRestDay) {
      macroValuePerHundredGm = Math.round(
        (item.macroQuantityForRD / item.macroValueForRD) * 100
      );
    }
    let newQuantity = sourceMap[key].macroQuantity;
    while (newQuantity > maxMacroPerMeal) {
      newQuantity--;
    }
    if (meal.sources.length >= 1) {
      let totalQuantity = 0;
      totalQuantity = meal.sources.reduce(
        (sum, source) => sum + source.macroQuantity,
        0
      );
      newQuantity = newQuantity - totalQuantity;
    }
    let quantity = (newQuantity / macroValuePerHundredGm) * 100;
    if (quantity > 5) quantity = roundToNearestTenFactor(quantity);
    else {
      newQuantity = newQuantity + (5 - newQuantity);
      quantity = roundToNearestTenFactor(
        (newQuantity / macroValuePerHundredGm) * 100
      );
    }
    macroValue = quantity;
    macroQuantity = newQuantity;
    sourceMap[key].macroQuantity = sourceMap[key].macroQuantity - newQuantity;
    sourceMap[key].macroValue = sourceMap[key].macroValue - quantity;
  }

  source.macroValue = macroValue;
  source.macroQuantity = macroQuantity;
  if (value.isPerSingleUnit) source.isPerSingleUnit = true;
  if (value.hasTableSpoon) source.hasTableSpoon = true;

  meal.sources.push(source);

  return { meal, updatedSource: source, sourceMap };
};

addVeggiesAndFruits = ({
  trainingDayMeals,
  restDayMeals,
  numberOfMeals,
  veggies,
  fruits
}) => {
  trainingDayMeals.map((meal, index) => {
    addVeggiesAndFruitsPerMeal({
      meal,
      mealNumber: index + 1,
      veggies,
      fruits,
      numberOfMeals
    });
  });

  restDayMeals.map((meal, index) => {
    addVeggiesAndFruitsPerMeal({
      meal,
      mealNumber: index + 1,
      veggies,
      fruits,
      numberOfMeals
    });
  });
};

addVeggiesAndFruitsPerMeal = ({
  meal,
  mealNumber,
  numberOfMeals,
  veggies,
  fruits
}) => {
  let mealsWithVeggies = [];
  let mealsWithFruits = [];
  if (numberOfMeals === 4) {
    mealsWithVeggies = [2, 4];
    mealsWithFruits = [1, 3];
  } else if (numberOfMeals === 5) {
    mealsWithVeggies = [2, 5];
    mealsWithFruits = [1, 3];
  } else if (numberOfMeals === 6) {
    mealsWithVeggies = [2, 6];
    mealsWithFruits = [1, 4];
  }
  if (mealsWithVeggies.includes(mealNumber)) {
    const veggieName = veggies.reduce(
      (veggieName, veggie, index) => {
        if(index === 0)
          return veggieName + veggie.value.name
        else
          return veggieName + "," + veggie.value.name
      },
      ""
    );

    const source = {
      name: `Veggies [${veggieName}]`,
      macroValue: 0,
      macroValueAlt: "1/2 bowl",
      isVeggie: true
    };
    meal.sources.push(source);
  }
  mealsWithFruits.map(fruitMealNum => {
    if (fruitMealNum === mealNumber) {
      const fruit = fruitMealNum === 1 ? fruits[0] : fruits[1];
      const source = {
        name: fruit.value.name,
        macroValue: 0,
        macroValueAlt: fruit.value.defaultQuantity,
        isFruit: true
      };
      meal.sources.push(source);
    }
  });
  return meal;
};
