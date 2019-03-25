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

export const convertLevelToStarRating = level => {
  switch (level) {
    case "Advanced":
      return 5;
    case "Intermediate":
      return 3.5;
    case "Beginner":
      return 1.5;
    default:
      return 0;
  }
};

export const convertLevelToLevelColor = level => {
  switch (level) {
    case "Advanced":
      return "#FFD80A";
    case "Intermediate":
      return "#C4CACE";
    case "Beginner":
      return "#CD7F32";
    default:
      return "#00DB8D";
  }
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
export const GRADIENT_COLORS_ARRAY_INPUT = [
  "#99ffcc",
  "#bcc6c3"
  //"#ffffff"
  /*"#7fffcd",
  "#ffffff"*/
  /*"#adedd5",
  //"#c1f4e1",
  "#ffffff"*/
];
export const GRADIENT_COLORS_ARRAY_BUTTON = ["#66ff99", "#00DB8D"]; // ["#00DB8D", "#00ffa4"];
export const LEVEL_COLORS = {
  ADV: "#FFD80A",
  INT: "#C4CACE",
  BEG: "#CD7F32"
};
export const BG_IMAGE = require("../../assets/images/barbell.jpg");
export const GRADIENT_BG_IMAGE = require("../../assets/images/Gradient_Image.png");
export const NON_VEG_ICON = require("../../assets/images/non-veg.png");
export const VEG_ICON = require("../../assets/images/veg.png");
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
export const STAR_RATING_MAX = 5;
export const PROGRESS_BAR_WIDTH = 300;
export const PROGRESS_CIRCLE_RADIUS = 65;
export const PROGRESS_CIRCLE_BORDER_WIDTH = 8;
