const roundToNearestTenFactor = value => {
  return Math.round(value / 10) * 10;
};

export const createMeals = ({ foodSources, numberOfMeals }) => {
  let meals = [];
  //contains list of protein, carbs, fat and default sources
  foodSources.map((foodSource, index) => {
    let sources = [];
    if (index === 0)
      sources = foodSource.defaultSourcesQuantities;
    else
      sources = foodSource.sourceQuantityDistribution;
    createMealsPerMacro({sources, numberOfMeals, meals})
    /*
    if (index !== 0) {
      sources = foodSource.sourceQuantityDistribution;
      createMealsPerMacro({ sources, numberOfMeals, meals });
    } */
  });
  console.log("meals:", meals);
};

createMealsPerMacro = ({
  sources,
  numberOfMeals,
  meals,
  isProtein,
  isFat,
  isCarb
}) => {
  let x = 1;
  let sourceQuantityMap = {};
  let totalMacroQuantity = 0;
  const newMacro = true; //new sources list of macros(protein/carb/fat)
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
    const { macroValue, macroQuantity } = item;
    sourceQuantityMap[key] = { macroValue, macroQuantity };
    totalMacroQuantity = totalMacroQuantity + macroQuantity;
  });
  const maxMacroPerMeal = Math.round(totalMacroQuantity / numberOfMeals);

  console.log("sources:", sources);

  //console.log("sorted:", sources, sourceQuantityMap);
  while (x <= numberOfMeals) {
    const mealName = `Meal${x}`;
    let newMeal = true;
    let meal = {};
    let previousSourcesPerMeal = [];
    if (meals.length > 0) {
      meal = meals.find(meal => meal.name === mealName);
      if (meal) {
        newMeal = false;
        if (meal.sources.length > 0) {
          previousSourcesPerMeal = meal.sources;
          meal.sources = [];
        }
      }
    }
    if (newMeal) {
      meal = {};
      meal.name = `Meal${x}`;
      meal.sources = [];
    }
    if (sources.length > 0) {
      for (let i = 0; i < sources.length; i++) {
        const item = sources[i];
        const { key, value } = item.source;
        const source = {};
        if (sourceQuantityMap[key].macroValue > 0) {
          source.name = value.name;
          if (sourceQuantityMap[key].macroQuantity <= maxMacroPerMeal ||      (value.hasTableSpoon && sourceQuantityMap[key].macroValue <= 2)) {
            if (!value.isPerSingleUnit && !value.hasTableSpoon)
              source.macroValue = roundToNearestTenFactor(
                sourceQuantityMap[key].macroValue
              );
            else source.macroValue = sourceQuantityMap[key].macroValue;
            source.macroQuantity = sourceQuantityMap[key].macroQuantity;
            sourceQuantityMap[key] = { macroValue: 0, macroQuantity: 0 };
          } else {
            const macroValuePerHundredGm = Math.round(
              (item.macroQuantity / item.macroValue) * 100
            );
            let newQuantity = sourceQuantityMap[key].macroQuantity;
            while (newQuantity > maxMacroPerMeal) {
              newQuantity--;
            }
            if (meal.sources.length >= 1) {
              const macroQuantity = meal.sources.reduce(
                (sum, source) => sum + source.macroQuantity,
                0
              );
              newQuantity = newQuantity - macroQuantity;
            }
            const quantity = roundToNearestTenFactor(
              (newQuantity / macroValuePerHundredGm) * 100
            );
            source.macroValue = quantity;
            source.macroQuantity = newQuantity;
            sourceQuantityMap[key].macroQuantity =
              sourceQuantityMap[key].macroQuantity - newQuantity;
            sourceQuantityMap[key].macroValue =
              sourceQuantityMap[key].macroValue - quantity;
          }
          meal.sources.push(source);
        }
        if (source.macroQuantity >= maxMacroPerMeal) {
          break;
        } else if (meal.sources.length > 0) {
          const macroQuantity = meal.sources.reduce(
            (sum, source) => sum + source.macroQuantity,
            0
          );
          //console.log("macro sum:", macroQuantity);
          if (macroQuantity >= maxMacroPerMeal) break;
        }
      }
    }
    meal.sources = [...previousSourcesPerMeal, ...meal.sources];
    if(newMeal)
      meals.push(meal);
    x++;
  }
  console.log(meals);
};
