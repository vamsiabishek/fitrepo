export const defaultProteinSources = [
  {
    key: "chicken-breast",
    value: {
      carbs: 0,
      fat: 4,
      isStandardForBeginner: true,
      isVeg: false,
      name: "Chicken breast",
      protein: 31
    }
  },
  {
    key: "egg-white",
    value: {
      carbs: 0,
      fat: 0,
      isBreakfast: true,
      isPerSingleUnit: true,
      isStandardForBeginner: true,
      isVeg: false,
      name: "Egg White",
      protein: 4
    }
  },
  {
    key: "egg-whole",
    value: {
      carbs: 0,
      fat: 4.5,
      isBreakfast: true,
      isPerSingleUnit: true,
      isStandardForBeginner: true,
      isVeg: false,
      name: "Whole Egg",
      protein: 6
    }
  },
  {
    key: "rajma",
    value: {
      carbs: 23,
      fat: 0,
      isStandardForBeginner: true,
      isVeg: true,
      name: "Rajma",
      protein: 9
    }
  }
];

export const defaultCarbSources = [
  {
    key: "chapathi",
    value: {
      carbs: 18,
      fat: 0,
      isStandardForBeginner: true,
      name: "Chapathi",
      protein: 3
    }
  },
  {
    key: "oats",
    value: {
      carbs: 66,
      fat: 8,
      fiber: 8,
      isStandardForBeginner: true,
      name: "Oats",
      protein: 11
    }
  },
  {
    key: "white-rice",
    value: {
      carbs: 28,
      fat: 2.5,
      isStandardForBeginner: true,
      name: "White rice",
      protein: 0
    }
  }
];

export const defaultFatSources = [
  {
    key: "almonds",
    value: {
      carbs: 22,
      fat: 49,
      isStandardForBeginner: true,
      name: "Almonds",
      protein: 21
    }
  },
  {
    key: "walnuts",
    value: {
      carbs: 14,
      fat: 65,
      isStandardForBeginner: true,
      name: "Walnuts",
      protein: 15
    }
  }
];

export const proteinSources = {
  "basa-fish": {
    carbs: 0,
    fat: 2.5,
    isVeg: false,
    name: "Basa Fish",
    protein: 18
  },
  "chicken-breast": {
    carbs: 0,
    fat: 4,
    isStandardForBeginner: true,
    isVeg: false,
    name: "Chicken breast",
    protein: 31
  },
  "egg-white": {
    carbs: 0,
    fat: 0,
    isBreakfast: true,
    isPerSingleUnit: true,
    isStandardForBeginner: true,
    isVeg: false,
    name: "Egg White",
    protein: 4
  },
  "egg-whole": {
    carbs: 0,
    fat: 4.5,
    isBreakfast: true,
    isPerSingleUnit: true,
    isStandardForBeginner: true,
    isVeg: false,
    name: "Whole Egg",
    protein: 6
  },
  paneer: {
    carbs: 1,
    fat: 21,
    isVeg: true,
    name: "Paneer",
    protein: 18
  },
  rajma: {
    carbs: 23,
    fat: 0,
    isStandardForBeginner: true,
    isVeg: true,
    name: "Rajma",
    protein: 9
  },
  "salmon-fish": {
    carbs: 0,
    fat: 13,
    isVeg: false,
    name: "Salmon Fish",
    protein: 20
  },
  "tilapia-fish": {
    carbs: 0,
    fat: 2.8,
    isVeg: false,
    name: "Tilapia Fish",
    protein: 26
  },
  tofu: {
    carbs: 8,
    fat: 8,
    isVeg: true,
    name: "Tofu",
    protein: 12
  }
};

export const fatSources = {
  almonds: {
    carbs: 22,
    fat: 49,
    isStandardForBeginner: true,
    name: "Almonds",
    protein: 21
  },
  cashews: {
    carbs: 30,
    fat: 44,
    name: "Cashews",
    protein: 18
  },
  "chia-seeds": {
    beginnerDefault: true,
    beginnerDefaultQuantity: 2,
    carbs: 42,
    fat: 31,
    fiber: 34,
    hasTableSpoon: true,
    name: "Chia seeds",
    protein: 17
  },
  "flax-seeds": {
    beginnerDefault: true,
    beginnerDefaultQuantity: 2,
    carbs: 29,
    fat: 42,
    fiber: 27,
    hasTableSpoon: true,
    name: "Flax seeds",
    protein: 18
  },
  walnuts: {
    carbs: 14,
    fat: 65,
    isStandardForBeginner: true,
    name: "Walnuts",
    protein: 15
  }
};

export const carbSources = {
  "brown-rice": {
    carbs: 23,
    fat: 2.5,
    name: "Brown rice",
    protein: 0
  },
  chapathi: {
    carbs: 18,
    fat: 0,
    isStandardForBeginner: true,
    name: "Chapathi",
    protein: 3
  },
  oats: {
    carbs: 66,
    fat: 8,
    fiber: 8,
    isStandardForBeginner: true,
    name: "Oats",
    protein: 11
  },
  "wheat-bread": {
    carbs: 41,
    fat: 3.5,
    name: "Wheat bread",
    protein: 13
  },
  "white-bread": {
    carbs: 49,
    fat: 3,
    name: "White bread",
    protein: 9
  },
  "white-rice": {
    carbs: 28,
    fat: 2.5,
    isStandardForBeginner: true,
    name: "White rice",
    protein: 0
  }
};
