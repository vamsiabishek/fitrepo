import { AsyncStorage } from 'react-native';
import { f, auth } from './FirebaseConfig'
import { WEIGHT_LOSS, WEIGHT_GAIN, BE_HEALTHY } from "./Common";

export const pluralCheck = s => {
  return s === 1 ? " ago" : "s ago";
};

export const timeConverter = timeStamp => {
  let a = new Date(timeStamp);
  let seconds = Math.floor((new Date() - a) / 1000);

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

export const setCurrentUser = (user) => {
  if (user)
    AsyncStorage.setItem("user_data", JSON.stringify(user))
}

export const removeCurrentUser = () => {
  AsyncStorage.removeItem("user_data")
}

export const getCurrentUser = async() => {
  let user = {}
  await AsyncStorage.getItem("user_data", (err, result) => {
    console.log(result)
    if(result)
      user = JSON.parse(result)
  })
  if (!user.uid)
    user = await f.auth().currentUser
  return user;
}
