/* eslint-disable no-useless-escape */
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../assets/style/stylesCommonValues';

export const LEVELS_OPTIONS = [
  {label: 'Beginner', value: 'Beginner'},
  {label: 'Intermediate', value: 'Intermediate'},
  {label: 'Advanced', value: 'Advanced'},
];

export const FOOD_PREFERENCES_OPTIONS = [
  {label: 'Vegetarian', value: 'Vegetarian'},
  {label: 'Non-Vegetarian', value: 'Non-Vegetarian'},
];

export const MALE = 1;
export const FEMALE = 0;

export const WEIGHT_LOSS = 'loss';
export const WEIGHT_GAIN = 'gain';
export const BE_HEALTHY = 'healthy';

export const WEIGHT_LOSS_DESC = 'Fat-loss';
export const WEIGHT_GAIN_DESC = 'Weight-gain';
export const BE_HEALTHY_DESC = 'Be-healthy';

export const PROVIDER_GOOGLE = 'google.com';
export const PROVIDER_FACEBOOK = 'facebook.com';

export const source1 = require('../../assets/images/SlideShowImages/FoodPage_1_Color.svg');
export const source2 = require('../../assets/images/SlideShowImages/FoodPage_2_Color.svg');
export const source3 = require('../../assets/images/SlideShowImages/FoodPage_3_Color.svg');
export const source4 = require('../../assets/images/SlideShowImages/FoodPage_4_Color.svg');
export const source5 = require('../../assets/images/SlideShowImages/FoodPage_5_Color.svg');
export const source6 = require('../../assets/images/SlideShowImages/FoodPage_6_Color.svg');
export const source7 = require('../../assets/images/SlideShowImages/FoodPage_7_Color.svg');
export const source8 = require('../../assets/images/SlideShowImages/FoodPage_8_Color.svg');
export const source9 = require('../../assets/images/SlideShowImages/FoodPage_8_Color.svg');

export const calculateCalFromProteinOrCarbs = (amount) => amount * 4;

export const calculateCalFromFats = (amount) => amount * 9;

export const calculateTotalCalories = ({protein, carbs, fat}) => {
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

export const convertLevelToStarRating = (level) => {
  switch (level) {
    case 'Advanced':
      return 5;
    case 'Intermediate':
      return 3.5;
    case 'Beginner':
      return 1.5;
    default:
      return 0;
  }
};

export const convertLevelToLevelColor = (level) => {
  switch (level) {
    case 'Advanced':
      return '#FFD80A';
    case 'Intermediate':
      return '#C4CACE';
    case 'Beginner':
      return '#CD7F32';
    default:
      return '#00DB8D';
  }
};

export const convertProgramToWeeks = (program) => {
  switch (program) {
    case '4 Week Program':
      return 4;
    case '8 Week Program':
      return 8;
    case '12 Week Program':
      return 12;
    default:
      return 0;
  }
};

export const convertProductIdentifierToPrograms = (productIdentifier) => {
  switch (productIdentifier) {
    case 'four_week_plans':
      return '4 Week Program';
    case 'eight_week_plans':
      return '8 Week Program';
    case 'twelve_week_plans':
      return '12 Week Program';
    case 'sixteen_week_plans':
      return '16 Week Program';
    default:
      return 'Invalid String';
  }
};

export const GRADIENT_COLORS_ARRAY = ['#00DB8D', '#3B876C', '#28292B'];
export const GRADIENT_COLORS_ARRAY_INPUT = ['#99ffcc', '#bcc6c3'];
export const GRADIENT_COLORS_ARRAY_BUTTON = ['#66ff99', '#00DB8D'];
export const LEVEL_COLORS = {
  ADV: '#FFD80A',
  INT: '#C4CACE',
  BEG: '#CD7F32',
};
export const MEALS_ICON = require('../../assets/images/extras/meals_icon.svg');
export const VITRUVIAN_MAN = require('../../assets/images/extras/vitruvian_man.svg');
//export const GRADIENT_BG_IMAGE = require('../../assets/images/Gradient_Image.svg');
//export const GRADIENT_BG_BANNER_IMAGE = require('../../assets/images/gradient_image_banner.png');
//export const NON_VEG_ICON = require('../../assets/images/non-veg.svg');
//export const VEG_ICON = require('../../assets/images/veg.svg');
export const MALE_BEGINNER_ICON = require('../../assets/images/beginner_1.svg');
export const MALE_INTERMEDIATE_ICON = require('../../assets/images/intermediate_1.svg');
export const MALE_ADVANCED_ICON = require('../../assets/images/advanced_1.svg');
export const FEMALE_BEGINNER_ICON = require('../../assets/images/beginner_0.svg');
export const FEMALE_INTERMEDIATE_ICON = require('../../assets/images/intermediate_0.svg');
export const FEMALE_ADVANCED_ICON = require('../../assets/images/advanced_0.svg');
export const FEMALE_FATLOSS_ICON = require('../../assets/images/female_fatloss.svg');
export const FEMALE_GAIN_ICON = require('../../assets/images/female_gain_weight.svg');
export const MALE_FATLOSS_ICON = require('../../assets/images/male_fatloss.svg');
export const MALE_GAIN_ICON = require('../../assets/images/male_gain_weight.svg');
export const HEALTHY_ICON = require('../../assets/images/healthy.svg');
export const BIRTHDAY_ICON = require('../../assets/images/cake.svg');
export const WEIGHT_ICON = require('../../assets/images/weighing_scale.svg');
export const HEIGHT_ICON = require('../../assets/images/scale.svg');
export const TARGET_ICON = require('../../assets/images/target.svg');
export const FOOD_SOURCES_PERSON_ICON = require('../../assets/images/shopping_cart.svg');
export const FOOD_SOURCES_MARKET_ICON = require('../../assets/images/market.svg');
export const SMS_ICON = require('../../assets/images/sms.svg');
export const LOGIN_ICON = require('../../assets/images/login.svg');
export const LOGIN_ICON_1 = require('../../assets/images/login_blue.svg');
export const CONTACT_US_ICON = require('../../assets/images/contact_us.svg');
export const GMAIL_ICON = require('../../assets/images/gmail.svg');
export const FACEBOOK_ICON = require('../../assets/images/facebook.svg');
export const INSTAGRAM_ICON = require('../../assets/images/instagram.svg');
export const PURCHASES_ICON = require('../../assets/images/purchases.svg');
export const EDIT_PROFILE_ICON = require('../../assets/images/edit_profile.svg');
export const BEGINNER_LABEL = 'Beginner';
export const INTERMEDIATE_LABEL = 'Intermediate';
export const ADVANCED_LABEL = 'Advanced';
export const BEGINNER_DESC =
  'Less or no physical activity, mostly occupied with work or studies.';
export const INTERMEDIATE_DESC =
  'Exercises 3 to 4 times a week, manages to make time for fitness.';
export const ADVANCED_DESC =
  'Exercises 5 to 6 times a week, highly dedicated towards fitness.';
export const EMAIL_VERIFICATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_LENGTH_MINIMUM = 8;
export const MIN_DATE = new Date('01/01/1960');
export const MAX_DATE = new Date();
export const BUTTON_SIZE = 9;
export const BUTTON_OUTER_SIZE = 18;
export const NUMERIC_INPUT_WIDTH = 80;
export const NUMERIC_INPUT_HEIGHT = 40;
export const MIN_WEIGHT = 40;
export const MAX_WEIGHT = 110;
export const MIN_HEIGHT = 140;
export const MAX_HEIGHT = 199;
let WEIGHT_RANGE = [];
for (let x = MIN_WEIGHT; x <= MAX_WEIGHT; x++) {
  WEIGHT_RANGE.push(x);
  WEIGHT_RANGE.push(x + 0.5);
}
export const WEIGHT_RANGE_FINAL = [...WEIGHT_RANGE];
let HEIGHT_RANGE = [];
for (let x = MIN_HEIGHT; x <= MAX_HEIGHT; x++) {
  HEIGHT_RANGE.push(x);
}
export const HEIGHT_RANGE_FINAL = [...HEIGHT_RANGE];
export const STAR_RATING_MAX = 5;
export const PROGRESS_BAR_WIDTH = SCREEN_WIDTH * 0.8;
export const PROGRESS_CIRCLE_RADIUS = SCREEN_HEIGHT * 0.08;
export const PROGRESS_CIRCLE_BORDER_WIDTH = 6;
