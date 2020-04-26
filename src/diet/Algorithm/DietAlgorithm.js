import {WEIGHT_LOSS, WEIGHT_GAIN, BE_HEALTHY} from '../../common/Common';
import {convertGoal} from '../../common/Util';

const CALORIE_PERCENTS = [
  {goal: WEIGHT_LOSS, weight: 0.25, level: 1, percent: 88},
  {goal: WEIGHT_LOSS, weight: 0.5, level: 1, percent: 75},
  {goal: WEIGHT_LOSS, weight: 1, level: 1, percent: 50},
  {goal: WEIGHT_LOSS, weight: 0.25, level: 2, percent: 90},
  {goal: WEIGHT_LOSS, weight: 0.5, level: 2, percent: 80},
  {goal: WEIGHT_LOSS, weight: 1, level: 2, percent: 59},
  {goal: WEIGHT_LOSS, weight: 0.25, level: 3, percent: 91},
  {goal: WEIGHT_LOSS, weight: 0.5, level: 3, percent: 83},
  {goal: WEIGHT_LOSS, weight: 1, level: 3, percent: 65},

  {goal: BE_HEALTHY, weight: 0, level: 1, percent: 90},
  {goal: BE_HEALTHY, weight: 0.25, level: 1, percent: 84},
  {goal: BE_HEALTHY, weight: 0.5, level: 1, percent: 70},
  {goal: BE_HEALTHY, weight: 0, level: 2, percent: 92},
  {goal: BE_HEALTHY, weight: 0.25, level: 2, percent: 86},
  {goal: BE_HEALTHY, weight: 0.5, level: 2, percent: 75},
  {goal: BE_HEALTHY, weight: 0, level: 3, percent: 92},
  {goal: BE_HEALTHY, weight: 0.25, level: 3, percent: 88},
  {goal: BE_HEALTHY, weight: 0.5, level: 3, percent: 80},

  {goal: WEIGHT_GAIN, weight: 0.25, level: 1, percent: 112},
  {goal: WEIGHT_GAIN, weight: 0.5, level: 1, percent: 125},
  {goal: WEIGHT_GAIN, weight: 1, level: 1, percent: 150},
  {goal: WEIGHT_GAIN, weight: 0.25, level: 2, percent: 110},
  {goal: WEIGHT_GAIN, weight: 0.5, level: 2, percent: 120},
  {goal: WEIGHT_GAIN, weight: 1, level: 2, percent: 141},
  {goal: WEIGHT_GAIN, weight: 0.25, level: 3, percent: 109},
  {goal: WEIGHT_GAIN, weight: 0.5, level: 3, percent: 117},
  {goal: WEIGHT_GAIN, weight: 1, level: 3, percent: 135},
];

export const getPossibleTargetWeights = (
  goal,
  program,
  currentWeight,
  fitnessLevel,
) => {
  const targetWeights = [];
  goal = convertGoal(goal);
  CALORIE_PERCENTS.map((data) => {
    if (
      program > 0 &&
      goal.length > 0 &&
      goal === data.goal &&
      fitnessLevel === data.level
    ) {
      if (goal === WEIGHT_GAIN) {
        targetWeights.push(currentWeight + data.weight * program);
      } else if (goal === WEIGHT_LOSS || goal === BE_HEALTHY) {
        targetWeights.push(currentWeight - data.weight * program);
      }
    }
  });
  return targetWeights;
};
