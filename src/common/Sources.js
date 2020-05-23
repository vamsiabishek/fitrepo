export const proteinSources = {
  amaranth: {
    carbs: 46,
    fat: 5.2,
    isVeg: true,
    isVegan: true,
    name: 'Amaranth',
    protein: 9.3,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed Raw (before cooking)',
      },
    ],
  },
  'basa-fish': {
    carbs: 0,
    fat: 2.5,
    isVeg: false,
    name: 'Basa Fish',
    protein: 18,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  'black-beans': {
    carbs: 40.8,
    fat: 0,
    isVeg: true,
    isVegan: true,
    name: 'Black Beans',
    isStandardForVeg: true,
    isStandardForVegan: true,
    protein: 15.2,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  'chicken-breast': {
    carbs: 0,
    fat: 4,
    isStandardForNonVeg: true,
    isVeg: false,
    name: 'Chicken breast',
    protein: 31,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  chickpeas: {
    carbs: 61,
    fat: 6,
    isVeg: true,
    isVegan: true,
    name: 'Chickpeas/Channa',
    isStandardForVeg: true,
    isStandardForVegan: true,
    protein: 19,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed Raw (before cooking)',
      },
    ],
  },
  quinoa: {
    carbs: 64,
    fat: 6,
    name: 'Quinoa',
    protein: 14,
    isVeg: true,
    isVegan: true,
    isStandardForEgg: true,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed Raw (before cooking)',
      },
    ],
  },
  'egg-white': {
    carbs: 0,
    fat: 0,
    isBreakfast: true,
    isPerSingleUnit: true,
    isStandardForNonVeg: true,
    isStandardForEgg: true,
    isVeg: false,
    isEggetarian: true,
    name: 'Egg White',
    protein: 4,
  },
  'egg-whole': {
    carbs: 0,
    fat: 4.5,
    isBreakfast: true,
    isPerSingleUnit: true,
    isStandardForNonVeg: true,
    isStandardForEgg: true,
    isVeg: false,
    isEggetarian: true,
    name: 'Whole Egg',
    protein: 6,
  },
  'feta-cheese': {
    carbs: 1,
    fat: 21.5,
    isVeg: true,
    name: 'Feta Cheese',
    protein: 16.3,
  },
  'greek-yogurt': {
    carbs: 3.6,
    fat: 0,
    isVeg: true,
    name: 'Greek Yogurt',
    protein: 10,
  },
  lamb: {
    carbs: 0,
    fat: 21,
    isVeg: false,
    name: 'Lamb',
    protein: 25,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  lentils: {
    carbs: 20,
    fat: 0,
    isVeg: true,
    isVegan: true,
    name: 'Lentils',
    protein: 9,
    isStandardForVegan: true,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  paneer: {
    carbs: 1,
    fat: 21,
    isVeg: true,
    name: 'Paneer',
    protein: 18,
    isStandardForVeg: true,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  pork: {
    carbs: 0,
    fat: 33,
    isVeg: false,
    name: 'Pork',
    protein: 23,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  prawns: {
    carbs: 0,
    fat: 0.3,
    isVeg: false,
    name: 'Prawns/Shrimps',
    protein: 24,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  rajma: {
    carbs: 23,
    fat: 0,
    isStandardForVeg: true,
    isStandardForVegan: true,
    isStandardForNonVeg: true,
    isStandardForEgg: true,
    isVeg: true,
    isVegan: true,
    name: 'Kidney Beans/Rajma',
    protein: 9,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  'salmon-fish': {
    carbs: 0,
    fat: 8,
    isVeg: false,
    name: 'Salmon Fish',
    protein: 24,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  'tilapia-fish': {
    carbs: 0,
    fat: 2.7,
    isVeg: false,
    name: 'Tilapia Fish',
    protein: 26,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  tofu: {
    carbs: 10,
    fat: 20,
    isVeg: true,
    name: 'Tofu',
    protein: 17,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  'tuna-fish': {
    carbs: 0,
    fat: 5,
    isVeg: false,
    name: 'Tuna Fish',
    protein: 29,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
};

export const fatSources = {
  almonds: {
    carbs: 22,
    fat: 49,
    isStandard: true,
    name: 'Almonds',
    protein: 21,
    isNuts: true,
  },
  avocados: {
    carbs: 9,
    fat: 15,
    name: 'Avocados',
    protein: 2,
  },
  cashews: {
    carbs: 30,
    fat: 44,
    name: 'Cashews',
    protein: 18,
    isNuts: true,
  },
  'chia-seeds': {
    beginnerDefault: true,
    beginnerDefaultQuantity: 2,
    carbs: 42,
    fat: 31,
    fiber: 34,
    hasTableSpoon: true,
    name: 'Chia seeds',
    protein: 17,
    info: [
      {
        label: 'Tip:',
        value:
          'Mix the mentioned tablespoons of Chia seeds in glass of water and leave it overnight',
      },
    ],
  },
  'flax-seeds': {
    beginnerDefault: true,
    beginnerDefaultQuantity: 2,
    carbs: 29,
    fat: 42,
    fiber: 27,
    hasTableSpoon: true,
    name: 'Flax seeds',
    protein: 18,
    info: [
      {
        label: 'Tip:',
        value:
          'For easy consumption, prepare a grinded powder of Flax seeds and store it',
      },
    ],
  },
  ghee: {
    beginnerDefaultQuantity: 2,
    carbs: 0,
    fat: 26,
    hasTableSpoon: true,
    name: 'Ghee',
    protein: 0,
  },
  olives: {
    carbs: 6.4,
    fat: 10.9,
    name: 'Black/Green Olives',
    protein: 0,
  },
  'peanut-butter': {
    carbs: 20,
    fat: 50,
    hasTableSpoon: true,
    name: 'Peanut Butter',
    protein: 25,
  },
  'pumpkin-seeds': {
    carbs: 11,
    fat: 49,
    name: 'Pumpkin Seeds',
    protein: 30,
    isNuts: true,
  },
  walnuts: {
    carbs: 14,
    fat: 65,
    isStandard: true,
    name: 'Walnuts',
    protein: 15,
    isNuts: true,
  },
};

export const carbSources = {
  'brown-rice': {
    carbs: 23,
    fat: 0,
    name: 'Brown rice',
    protein: 2.5,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  chapathi: {
    carbs: 20,
    fat: 0,
    isStandard: true,
    name: 'Chapathi/Roti(Wheat)',
    protein: 4.5,
    isPerSingleUnit: true,
    info: [
      {
        label: 'Size:',
        value: 'Medium sized Chapathi weighs 65-75gm(approx.)',
      },
    ],
  },
  oats: {
    carbs: 66,
    fat: 8,
    fiber: 8,
    isStandard: true,
    name: 'Oats',
    protein: 11,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed Raw (before cooking)',
      },
    ],
  },
  quinoa: {
    carbs: 64,
    fat: 6,
    name: 'Quinoa',
    protein: 14,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed Raw (before cooking)',
      },
    ],
  },
  ragi: {
    carbs: 75.6,
    fat: 4.3,
    name: 'Ragi',
    protein: 11,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed Raw (before cooking)',
      },
    ],
  },
  'sweet-potatoes': {
    carbs: 18,
    fat: 0,
    name: 'Sweet Potatoes',
    protein: 1.4,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  'wheat-bread': {
    carbs: 41,
    fat: 3.5,
    name: 'Wheat bread',
    protein: 13,
  },
  'white-bread': {
    carbs: 49,
    fat: 3,
    name: 'White bread',
    protein: 9,
  },
  'white-potatoes': {
    carbs: 20,
    fat: 0,
    name: 'White Potatoes',
    protein: 2,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
  'white-rice': {
    carbs: 28,
    fat: 2.5,
    isStandard: true,
    name: 'White rice',
    protein: 0,
    info: [
      {
        label: 'Weigh:',
        value: 'Must be weighed after Cooking',
      },
    ],
  },
};

export const veggies = {
  spinach: {
    name: 'Spinach',
    isStandardForBeginner: true,
    isStandardForIntermediate: true,
    isStandardForAdvanced: true,
    isVeggies: true,
  },
  'green-beans': {
    name: 'Green beans',
    isStandardForBeginner: true,
    isStandardForIntermediate: true,
    isVeggies: true,
  },
  cucumber: {
    name: 'Cucumber',
    isStandardForBeginner: true,
    isStandardForIntermediate: true,
    isStandardForAdvanced: true,
    isVeggies: true,
  },
  broccoli: {
    name: 'Broccoli',
    isStandardForAdvanced: true,
    isVeggies: true,
  },
  cauliflower: {
    name: 'Cauliflower',
    isStandardForIntermediate: true,
    isVeggies: true,
  },
};

export const fruits = {
  Orange: {
    name: 'Orange',
    isStandardForBeginner: true,
    isStandardForIntermediate: true,
    isStandardForAdvanced: true,
    defaultQuantity: '1 medium size',
    isFruit: true,
  },
  pomegranate: {
    name: 'Pomegranate',
    isStandardForBeginner: true,
    isStandardForIntermediate: true,
    isStandardForAdvanced: true,
    defaultQuantity: '1/2 cup',
    isFruit: true,
  },
};
