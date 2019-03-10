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
