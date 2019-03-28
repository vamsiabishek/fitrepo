import { twoSourcePercent, threeSourcePercent } from "./SourceQuantityData";
import {
  calculateCalFromProteinOrCarbs,
  calculateCalFromFats
} from "../../common/Common";

export const sourceQuantities = ({
  selectedSources,
  calFromSource,
  calFromSourceForRD,
  isProtein,
  isCarb,
  isFat
}) => {
  let totalSourceInGrams = 0;
  let totalSourceInGramsForRD = 0;
  if (isProtein || isCarb) {
    totalSourceInGrams = Math.round(calFromSource / 4);
    totalSourceInGramsForRD = Math.round(calFromSourceForRD / 4);
  } else if (isFat) {
    totalSourceInGrams = Math.round(calFromSource / 9);
    totalSourceInGramsForRD = Math.round(calFromSourceForRD / 9);
  }

  const standardSourcesForBeginner = selectedSources.filter(
    source => source.value.isStandardForBeginner
  );
  let sourceQuantityDistribution = [];
  let calFromSources = {
    calFromProtein: 0,
    calFromCarbs: 0,
    calFromFats: 0
  };
  let calFromSourcesForRD = {
    calFromProteinForRD: 0,
    calFromCarbsForRD: 0,
    calFromFatsForRD: 0
  };
  const { sources, selectedCategory } = getSelectedCategoryAndSource({
    standardSourcesForBeginner,
    isProtein,
    isCarb,
    isFat
  });
  let sourcePercent = [];
  if (selectedSources.length === 2) {
    sourcePercent = twoSourcePercent[selectedCategory];
  } else if (selectedSources.length === 3) {
    sourcePercent = threeSourcePercent[selectedCategory];
  } else if (selectedSources.length === 4) {
    sourcePercent = fourSourcePercent[selectedCategory];
  }
  sources.map((source, index) => {
    const macroQuantity = Math.round(
      (totalSourceInGrams * sourcePercent[index]) / 100
    );
    const macroQuantityForRD = Math.round(
      (totalSourceInGramsForRD * sourcePercent[index]) / 100
    );
    const { macroValue, macroValueForRD } = calculateMacroValue({
      macroQuantity,
      macroQuantityForRD,
      source,
      isProtein,
      isCarb,
      isFat
    });
    const calories = calculateCaloriesPerMarco({
      macroValue,
      macroValueForRD,
      source,
      calFromSources,
      calFromSourcesForRD
    });
    calFromSources = calories.calFromSources;
    calFromSourcesForRD = calories.calFromSourcesForRD;
    sourceQuantityDistribution.push({
      source,
      macroQuantity,
      macroValue,
      macroQuantityForRD,
      macroValueForRD
    });
  });
  return { sourceQuantityDistribution, calFromSources, calFromSourcesForRD };
};

const getSelectedCategoryAndSource = ({
  standardSourcesForBeginner,
  isProtein,
  isCarb,
  isFat
}) => {
  let highSelected = 0;
  let averageSelected = 0;
  let lowSelected = 0;

  let highSources = [];
  let averageSources = [];
  let lowSources = [];
  standardSourcesForBeginner.map(source => {
    const { minValue, maxValue, averageValue } = getSourceCatgeroryValues({
      isProtein,
      isCarb,
      isFat
    });
    let macroValue = source.value.protein;
    if (isCarb) macroValue = source.value.carbs;
    else if (isFat) macroValue = source.value.fat;

    if (macroValue > maxValue) {
      highSources.push(source);
      highSelected += 1;
    }
    if (macroValue > averageValue && macroValue <= maxValue) {
      averageSources.push(source);
      averageSelected += 1;
    }
    if (macroValue > minValue && macroValue <= averageValue) {
      lowSources.push(source);
      lowSelected += 1;
    }
  });
  let selectedCategory = "category";
  const sources = [];
  for (let i = 0; i < highSelected; i++) {
    selectedCategory = selectedCategory + "One";
    sources.push(highSources[i]);
  }
  for (let i = 0; i < averageSelected; i++) {
    selectedCategory = selectedCategory + "Two";
    sources.push(averageSources[i]);
  }
  for (let i = 0; i < lowSelected; i++) {
    selectedCategory = selectedCategory + "Three";
    sources.push(lowSources[i]);
  }
  return { sources, selectedCategory };
};

const getSourceCatgeroryValues = ({ isProtein, isCarb, isFat }) => {
  if (isProtein) {
    return {
      minValue: 0,
      averageValue: 10,
      maxValue: 20
    };
  } else if (isCarb) {
    return {
      minValue: 0,
      averageValue: 15,
      maxValue: 25
    };
  } else if (isFat) {
    return {
      minValue: 0,
      averageValue: 15,
      maxValue: 30
    };
  }
};

const calculateMacroValue = ({
  macroQuantity,
  macroQuantityForRD,
  source,
  isProtein,
  isCarb,
  isFat
}) => {
  let macroValue = 0;
  let macroValueForRD = 0;
  let referenceMacroValue = 0;
  if (isProtein) referenceMacroValue = source.value.protein;
  else if (isCarb) referenceMacroValue = source.value.carbs;
  else if (isFat) referenceMacroValue = source.value.fat;

  if (source.value.isPerSingleUnit) {
    macroValue = Math.round(macroQuantity / referenceMacroValue);
    macroValueForRD = Math.round(macroQuantityForRD / referenceMacroValue);
  } else {
    macroValue = Math.round((macroQuantity * 100) / referenceMacroValue);
    macroValueForRD = Math.round(
      (macroQuantityForRD * 100) / referenceMacroValue
    );
  }

  return { macroValue, macroValueForRD };
};

// for example macroValue here is 300gm of chicken
const calculateCaloriesPerMarco = ({
  macroValue,
  macroValueForRD,
  source,
  calFromSources,
  calFromSourcesForRD
}) => {
  const { protein, carbs, fat } = source.value;
  let referenceValue = 0;
  let referenceValueForRD = 0;
  if (source.value.hasTableSpoon) {
    referenceValue = ((macroValue * 14) / 100).toFixed(1);
    referenceValueForRD = ((macroValueForRD * 14) / 100).toFixed(1);
  } else if (source.value.isPerSingleUnit) {
    referenceValue = macroValue;
    referenceValueForRD = macroValueForRD;
  } else {
    referenceValue = (macroValue / 100).toFixed(1);
    referenceValueForRD = (macroValueForRD / 100).toFixed(1);
  }
  const calFromProtein =
    calculateCalFromProteinOrCarbs(Math.round(protein * referenceValue)) +
    calFromSources.calFromProtein;
  const calFromCarbs =
    calculateCalFromProteinOrCarbs(Math.round(carbs * referenceValue)) +
    calFromSources.calFromCarbs;
  const calFromFats =
    calculateCalFromFats(Math.round(fat * referenceValue)) +
    calFromSources.calFromFats;

  const calFromProteinForRD =
    calculateCalFromProteinOrCarbs(Math.round(protein * referenceValueForRD)) +
    calFromSourcesForRD.calFromProteinForRD;
  const calFromCarbsForRD =
    calculateCalFromProteinOrCarbs(Math.round(carbs * referenceValueForRD)) +
    calFromSourcesForRD.calFromCarbsForRD;
  const calFromFatsForRD =
    calculateCalFromFats(Math.round(fat * referenceValueForRD)) +
    calFromSourcesForRD.calFromFatsForRD;

  return {
    calFromSources: {
      calFromProtein,
      calFromCarbs,
      calFromFats
    },
    calFromSourcesForRD: {
      calFromProteinForRD,
      calFromCarbsForRD,
      calFromFatsForRD
    }
  };
};

export const manageSources = async ({
  selectedProteinSources,
  selectedFatSources,
  selectedCarbSources
}) => {
  let {
    proteinSources: standardSourcesForProtein,
    carbSources: standardSourcesForCarbs,
    fatSources: standardSourcesForFats
  } = await standardSourceSelection(
    selectedProteinSources,
    selectedFatSources,
    selectedCarbSources
  );

  let extraProteinSourcesRequired = false;
  let extraCarbSourcesRequired = false;
  let extraFatSourcesRequired = false;
  if (selectedProteinSources.length > 0 && selectedProteinSources.length <= 2)
    extraProteinSourcesRequired = true;
  if (selectedCarbSources.length > 0 && selectedCarbSources.length <= 2)
    extraCarbSourcesRequired = true;
  if (selectedFatSources.length > 0 && selectedFatSources.length < 2)
    extraFatSourcesRequired = true;

  const {
    extraProteinSources,
    extraCarbSources,
    extraFatSources
  } = await getExtraSources({
    selectedProteinSources,
    selectedFatSources,
    selectedCarbSources,
    extraProteinSourcesRequired,
    extraCarbSourcesRequired,
    extraFatSourcesRequired
  });
  proteinSources = [...proteinSources, ...extraProteinSources];
  carbSources = [...carbSources, ...extraCarbSources];
  fatSources = [...fatSources, ...extraFatSources];
  return {
    proteinSources,
    carbSources,
    fatSources
  };
};

const standardSourceSelection = async ({
  selectedProteinSources,
  selectedFatSources,
  selectedCarbSources
}) => {
  let standardSourcesForProtein = [];
  let standardSourcesForCarbs = [];
  let standardSourcesForFats = [];
  let noProteinSourcesSelected = false;
  let noCarbSourcesSelected = false;
  let noFatSourcesSelected = false;
  if (selectedProteinSources.length === 0) noProteinSourcesSelected = true;
  if (selectedFatSources.length === 0) noFatSourcesSelected = true;
  if (selectedCarbSources.length === 0) noCarbSourcesSelected = true;
  if (
    noProteinSourcesSelected ||
    noCarbSourcesSelected ||
    noFatSourcesSelected
  ) {
    const {
      standardProteinSources,
      standardCarbSources,
      standardFatSources
    } = await getStandardSourcesForBeginner(
      noProteinSourcesSelected,
      noCarbSourcesSelected,
      noFatSourcesSelected
    );
    standardSourcesForProtein = standardProteinSources;
    standardSourcesForCarbs = standardCarbSources;
    standardSourcesForFats = standardFatSources;
  }
  return {
    standardSourcesForProtein,
    standardSourcesForCarbs,
    standardSourcesForFats
  };
};

getExtraSources = async ({
  selectedProteinSources,
  selectedFatSources,
  selectedCarbSources,
  extraProteinSourcesRequired,
  extraCarbSourcesRequired,
  extraFatSourcesRequired
}) => {
  let extraProteinSources = [];
  let extraCarbSources = [];
  let extraFatSources = [];
  return {
    extraProteinSources,
    extraCarbSources,
    extraFatSources
  }
}

const getStandardSourcesForBeginner = async (
  isProteinRequired,
  isCarbsRequired,
  isFatsRequired
) => {
  /*const proteinSources = await getStandardProteinSourcesForBeginners();
  const carbSources = await getStandardCarbSourcesForBeginners();
  const fatSources = await getStandardFatSourcesForBeginners();*/
  const [
    standardProteinSources,
    standardCarbSources,
    standardFatSources
  ] = await Promise.all([
    getStandardProteinSourcesForBeginners(isProteinRequired),
    getStandardCarbSourcesForBeginners(isCarbsRequired),
    getStandardFatSourcesForBeginners(isFatsRequired)
  ]);
  return {
    standardProteinSources,
    standardCarbSources,
    standardFatSources
  };
};

// ---------FETCH DATA------------

getStandardProteinSourcesForBeginners = async isProteinRequired => {
  let standardProteinSources = [];
  if (isProteinRequired)
    await database
      .ref("protein-sources")
      .orderByChild("isStandardForBeginner")
      .equalTo(true)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          const result = snapshot.val();
          standardProteinSources = Object.keys(result).map(key => ({
            key,
            value: result[key]
          }));
        }
      })
      .catch(error => {
        console.log(
          "error while fetching standard protein sources in DietAlgorithm:",
          error
        );
      });
  return standardProteinSources;
};

getStandardCarbSourcesForBeginners = async isCarbsRequired => {
  let standardCarbSources = [];
  if (isCarbsRequired)
    await database
      .ref("carb-sources")
      .orderByChild("isStandardForBeginner")
      .equalTo(true)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          const result = snapshot.val();
          standardCarbSources = Object.keys(result).map(key => ({
            key,
            value: result[key]
          }));
        }
      })
      .catch(error => {
        console.log(
          "error while fetching standard carb sources in DietAlgorithm:",
          error
        );
      });
  return standardCarbSources;
};

getStandardFatSourcesForBeginners = async isFatsRequired => {
  let standardFatSources = [];
  if (isFatsRequired)
    await database
      .ref("fat-sources")
      .orderByChild("isStandardForBeginner")
      .equalTo(true)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          const result = snapshot.val();
          standardFatSources = Object.keys(result).map(key => ({
            key,
            value: result[key]
          }));
        }
      })
      .catch(error => {
        console.log(
          "error while fetching standard fat sources in DietAlgorithm:",
          error
        );
      });
  return standardFatSources;
};
