import auth from '@react-native-firebase/auth';

let apiUrl = 'http://localhost:5000/dietrepo-develop/asia-east2/api';
//const apiUrl = 'http://localhost:5000/dietrepo-prod/asia-east2/api';
//const apiUrl = 'https://asia-east2-dietrepo-prod.cloudfunctions.net/api';
if (__DEV__) {
  apiUrl = 'https://asia-east2-dietrepo-develop.cloudfunctions.net/api';
} else {
  apiUrl = 'https://asia-east2-dietrepo-prod.cloudfunctions.net/api';
}

const getIdToken = async () => {
  if (auth().currentUser) {
    return await auth()
      .currentUser.getIdToken(true)
      .then((token) => token);
  }
  return null;
};

const get = async (path) => {
  const idToken = await getIdToken();
  if (idToken) {
    try {
      const resp = await fetch(`${apiUrl}${path}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await resp.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  } else {
    return {isUserLoggedIn: false};
  }
};

const post = async (path, data) => {
  const idToken = await getIdToken();
  if (idToken) {
    try {
      const resp = await fetch(`${apiUrl}${path}`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await resp.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  }
};

export default {
  get,
  post,
};
