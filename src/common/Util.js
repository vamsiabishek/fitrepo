import { AsyncStorage } from "react-native";
import { f, database } from "./FirebaseConfig";
import { WEIGHT_LOSS, WEIGHT_GAIN, BE_HEALTHY } from "./Common";

export const pluralCheck = s => {
  return s === 1 ? " ago" : "s ago";
};

export const getSeconds = timeStamp => {
  let timeStampDate = new Date(timeStamp);
  return Math.floor(timeStampDate / 1000);
};

export const getProgramEndDate = (createdTimestamp, programDuration) => {
  const programDurationInMS = programDuration * 7 * 24 * 3600000;
  const programEndDate = new Date(createdTimestamp + programDurationInMS);
  return programEndDate;
};

export const getDifferenceInSeconds = (timeStamp1, timeStamp2 = new Date()) => {
  return getSeconds(timeStamp2) - getSeconds(timeStamp1);
};

export const timeConverter = timeStamp => {
  let a = new Date(timeStamp);
  let seconds = getSeconds(new Date()) - getSeconds(a); // Math.floor((new Date() - a) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + " year" + pluralCheck(interval);
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " month" + pluralCheck(interval);
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " day" + pluralCheck(interval);
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hour" + pluralCheck(interval);
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " min" + pluralCheck(interval);
  }
  return seconds + " sec" + pluralCheck(seconds);
};

export const convertGoal = goal =>
  goal === 0 ? WEIGHT_LOSS : goal === 1 ? BE_HEALTHY : WEIGHT_GAIN;

export const getGoalString = goal =>
  goal === 0 ? "Fat-loss" : goal === 1 ? "Be healthy" : "Weight-gain";

export const getFitnessLevelString = fitnessLevel =>
  fitnessLevel === 1
    ? "Beginner"
    : fitnessLevel === 2
    ? "Intermediate"
    : "Advanced";
export const convertGender = gender => (gender === 0 ? "Female" : "Male");

export const createKeyAndValuesFromResult = result => {
  return Object.keys(result).map(key => {
    return {
      key,
      value: result[key]
    };
  });
};

export const createKeyAndNameFromResult = result => {
  return Object.keys(result).map(key => {
    const { name } = result[key];
    return {
      key,
      name
    };
  });
};

export const createRefBySourceType = type => {
  let sourceRef = "";
  if (type === "protein") sourceRef = "protein-sources";
  else if (type === "carb") sourceRef = "carb-sources";
  else if (type === "fat") sourceRef = "fat-sources";
  return sourceRef;
};

export const setCurrentUser = user => {
  if (user) AsyncStorage.setItem("user_data", JSON.stringify(user));
};

export const removeCurrentUser = async () => {
  await AsyncStorage.removeItem("user_data");
};

export const getCurrentUser = async () => {
  let user = {};
  /*await AsyncStorage.getItem("user_data", (err, result) => {
    console.log(result)
    if(result)
      user = JSON.parse(result)
  })*/
  if (!user.uid) user = await f.auth().currentUser;
  return user;
};

export const signOutUser = async () => {
  const user = await f.auth().currentUser;
  await removeCurrentUser();
  if (user) {
    await f
      .auth()
      .signOut()
      .then(() => {
        return true;
      });
  }

  return true;
};

let IS_FIRST_TIME_USER = true;

export const setFirstTimeUser = async () => {
  if (IS_FIRST_TIME_USER) {
    IS_FIRST_TIME_USER = await isNewUser();
  }
};

export const getFirstTimeUser = () => IS_FIRST_TIME_USER;

const isNewUser = async () => {
  const { uid } = await getCurrentUser();
  let firstDiet = {};
  await database
    .ref(`diets/${uid}`)
    .orderByChild("createdDate")
    .limitToFirst(1)
    .once("value")
    .then(snap => {
      const results = snap.val();
      firstDiet = createKeyAndValuesFromResult(results)[0];
    })
    .catch(error => {
      // console.log(error);
    });
  const { createdDate } = firstDiet.value;
  const fromDate = new Date(createdDate);
  const diffInMilliSecs = new Date().getTime() - fromDate.getTime();
  const total_seconds = parseInt(Math.floor(diffInMilliSecs / 1000));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));
  const total_hours = parseInt(Math.floor(total_minutes / 60));
  const days = parseInt(Math.floor(total_hours / 24));
  if (days <= 7) return true;
  else return false;
};
