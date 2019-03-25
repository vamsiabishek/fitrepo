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

export const createKeyAndValuesFromResult = result => {
  return Object.keys(result).map(key => {
    return {
      key,
      value: result[key],
    };
  });
};

export const createKeyAndNameFromResult = result => {
  return Object.keys(result).map(key => {
    const { name } = result[key];
    return {
      key,
      name,
    };
  });
};
