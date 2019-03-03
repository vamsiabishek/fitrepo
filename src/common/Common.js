export const calculateCaloriesFromProteinOrCarbs = amount => amount * 4;

export const calculateCaloriesFromFats = amount => amount * 9;

export const calculateTotalCalories = ({ protein, carbs, fat }) => {
  let totalCalories = 0;
  totalCalories = protein
    ? calculateCaloriesFromProteinOrCarbs(protein)
    : totalCalories;
  totalCalories = carbs
    ? totalCalories + calculateCaloriesFromProteinOrCarbs(carbs)
    : totalCalories;
  totalCalories = fat
    ? totalCalories + calculateCaloriesFromFats(fat)
    : totalCalories;
  return totalCalories;
};
