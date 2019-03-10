import {
  twoSourcePercent,
  threeSourcePercent,
  fourSourcePercent
} from "./SourceQuantityData";

export const sourceQuantities = ({
  selectedSources,
  calFromSource,
  isProtein,
  isCarb,
  isFat
}) => {
  let totalSourceInGrams = 0;
  if (isProtein || isCarb) totalSourceInGrams = Math.round(calFromSource / 4);
  else if (isFat) totalSourceInGrams = Math.round(calFromSource / 9);

  const standardSourcesForBeginner = selectedSources.filter(
    source => source.value.isStandardForBeginner
  );
  let sourceQuantityDistribution = [];
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
    const marcoQuantity = Math.round((totalSourceInGrams * sourcePercent[index]) / 100);
    const marcoValue = calculateMarcoValue({marcoQuantity, source, isProtein, isCarb, isFat});
    sourceQuantityDistribution.push({
      source,
      marcoQuantity,
      marcoValue,
    });
  });
  return sourceQuantityDistribution;
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
    let marcoValue = source.value.protein;
    if (isCarb) marcoValue = source.value.carbs;
    else if (isFat) marcoValue = source.value.fat;

    if (marcoValue > maxValue) {
      highSources.push(source);
      highSelected += 1;
    }
    if (marcoValue > averageValue && marcoValue <= maxValue) {
      averageSources.push(source);
      averageSelected += 1;
    }
    if (marcoValue > minValue && marcoValue <= averageValue) {
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

const calculateMarcoValue = ({marcoQuantity, source, isProtein, isCarb, isFat}) => {
  let marcoValue = 0;
  let referenceMacroValue = 0;
  if(isProtein) referenceMacroValue = source.value.protein;
  else if(isCarb) referenceMacroValue = source.value.carbs;
  else if(isFat) referenceMacroValue = source.value.fat;
  
  if(source.value.isPerSingleUnit)
    marcoValue = Math.round((marcoQuantity)/referenceMacroValue);
  else
    marcoValue = Math.round((marcoQuantity * 100)/referenceMacroValue);

  return marcoValue;
}
