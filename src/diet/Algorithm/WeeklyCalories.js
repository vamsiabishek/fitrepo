import {WEIGHT_LOSS, WEIGHT_GAIN, BE_HEALTHY} from '../../common/Common';
export const getCalPerWeek = (totalCalIntake, selectedProgram, goal) => {
  const calPerWeek = [];
  if (selectedProgram === 4) {
    if (goal === WEIGHT_LOSS) {
      calPerWeek.push(totalCalIntake - 50);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 250);
      calPerWeek.push(totalCalIntake - 300);
    } else if (goal === BE_HEALTHY) {
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 150);
    } else if (goal === WEIGHT_GAIN) {
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake + 150);
      calPerWeek.push(totalCalIntake + 200);
    }
  } else if (selectedProgram === 8) {
    if (goal === WEIGHT_LOSS) {
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 200);
      calPerWeek.push(totalCalIntake - 250);
      calPerWeek.push(totalCalIntake - 350);
      calPerWeek.push(totalCalIntake - 350);
      calPerWeek.push(totalCalIntake - 400);
    } else if (goal === BE_HEALTHY) {
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 50);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 150);
    } else if (goal === WEIGHT_GAIN) {
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake + 150);
      calPerWeek.push(totalCalIntake + 200);
      calPerWeek.push(totalCalIntake + 250);
      calPerWeek.push(totalCalIntake + 300);
      calPerWeek.push(totalCalIntake + 300);
    }
  } else if (selectedProgram === 12) {
    if (goal === WEIGHT_LOSS) {
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 250);
      calPerWeek.push(totalCalIntake - 250);
      calPerWeek.push(totalCalIntake - 300);
      calPerWeek.push(totalCalIntake - 300);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 350);
      calPerWeek.push(totalCalIntake - 200);
      calPerWeek.push(totalCalIntake - 350);
    } else if (goal === BE_HEALTHY) {
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
    } else if (goal === WEIGHT_GAIN) {
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake + 150);
      calPerWeek.push(totalCalIntake + 150);
      calPerWeek.push(totalCalIntake + 200);
      calPerWeek.push(totalCalIntake + 250);
      calPerWeek.push(totalCalIntake + 300);
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake + 300);
      calPerWeek.push(totalCalIntake + 200);
      calPerWeek.push(totalCalIntake + 300);
    }
  } else if (selectedProgram === 16) {
    if (goal === WEIGHT_LOSS) {
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 200);
      calPerWeek.push(totalCalIntake - 250);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 250);
      calPerWeek.push(totalCalIntake - 300);
      calPerWeek.push(totalCalIntake - 350);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 250);
      calPerWeek.push(totalCalIntake - 300);
      calPerWeek.push(totalCalIntake - 350);
      calPerWeek.push(totalCalIntake - 250);
      calPerWeek.push(totalCalIntake - 350);
      calPerWeek.push(totalCalIntake - 350);
    } else if (goal === BE_HEALTHY) {
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 100);
      calPerWeek.push(totalCalIntake - 150);
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake - 100);
    } else if (goal === WEIGHT_GAIN) {
      calPerWeek.push(totalCalIntake);
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake + 150);
      calPerWeek.push(totalCalIntake + 200);
      calPerWeek.push(totalCalIntake + 200);
      calPerWeek.push(totalCalIntake + 250);
      calPerWeek.push(totalCalIntake + 300);
      calPerWeek.push(totalCalIntake + 300);
      calPerWeek.push(totalCalIntake + 100);
      calPerWeek.push(totalCalIntake + 350);
      calPerWeek.push(totalCalIntake + 350);
      calPerWeek.push(totalCalIntake + 200);
      calPerWeek.push(totalCalIntake + 250);
      calPerWeek.push(totalCalIntake + 350);
      calPerWeek.push(totalCalIntake + 350);
    }
  }
  return calPerWeek;
};
