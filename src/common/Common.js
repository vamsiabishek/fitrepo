export const LEVELS_OPTIONS = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" }
];

export const FOOD_PREFERENCES_OPTIONS = [
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Non-Vegetarian", value: "Non-Vegetarian" }
];

export const calculateCalFromProteinOrCarbs = amount => amount * 4;

export const calculateCalFromFats = amount => amount * 9;

export const calculateTotalCalories = ({ protein, carbs, fat }) => {
  let totalCalories = 0;
  totalCalories = protein
    ? calculateCalFromProteinOrCarbs(protein)
    : totalCalories;
  totalCalories = carbs
    ? totalCalories + calculateCalFromProteinOrCarbs(carbs)
    : totalCalories;
  totalCalories = fat
    ? totalCalories + calculateCalFromFats(fat)
    : totalCalories;
  return totalCalories;
};

export const convertProgramToWeeks = program => {
  switch (program) {
    case "4 Week Program":
      return 4;
    case "8 Week Program":
      return 8;
    case "12 Week Program":
      return 12;
    default:
      return 0;
  }
};

export const GRADIENT_COLORS_ARRAY = [
  "#00DB8D",
  //"#29604D",
  "#3B876C",
  "#28292B"
];
export const LEVEL_COLORS = {
  ADV: "#FFD80A",
  INT: "#C4CACE",
  BEG: "#CD7F32"
};
export const BG_IMAGE = require("../../assets/images/barbell.jpg");
export const EMAIL_VERIFICATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_LENGTH_MINIMUM = 8;
export const AVATAR_SIZE = 100;
export const ICON_SIZE = 25;
export const ICON_SIZE_MED = 20;
export const ICON_SIZE_SMALL = 16;
export const ICON_SIZE_LARGE = 30;
export const MIN_DATE = new Date("01/01/1960");
export const MAX_DATE = new Date();
export const BUTTON_SIZE = 9;
export const BUTTON_OUTER_SIZE = 18;
export const NUMERIC_INPUT_WIDTH = 80;
export const NUMERIC_INPUT_HEIGHT = 40;
export const MIN_WEIGHT = 40;
export const MAX_WEIGHT = 110;
export const MIN_HEIGHT = 140;
export const MAX_HEIGHT = 199;
