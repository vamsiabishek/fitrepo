import auth from '@react-native-firebase/auth';

const apiUrl = 'http://localhost:5000/dietrepo-develop/asia-east2/api';

const getIdToken = async () => {
  if (auth().currentUser) {
    return await auth()
      .currentUser.getIdToken()
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
