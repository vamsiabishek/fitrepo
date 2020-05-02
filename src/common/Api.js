import auth from '@react-native-firebase/auth';

let apiUrl = 'http://localhost:5000/dietrepo-develop/asia-east2/api';
let clientIdGoogleSignIn =
  '916988589640-tdg7sc9ilil84u1lctp9p5me4h4qb2qi.apps.googleusercontent.com';
//const apiUrl = 'http://localhost:5000/dietrepo-prod/asia-east2/api';
//const apiUrl = 'https://asia-east2-dietrepo-prod.cloudfunctions.net/api';
if (__DEV__) {
  apiUrl = 'https://asia-east2-dietrepo-develop.cloudfunctions.net/api';
  clientIdGoogleSignIn =
    '916988589640-tdg7sc9ilil84u1lctp9p5me4h4qb2qi.apps.googleusercontent.com';
} else {
  apiUrl = 'https://asia-east2-dietrepo-prod.cloudfunctions.net/api';
  clientIdGoogleSignIn =
    '68334156939-6qndil80q7qed7ul6k15qc5nho9960uo.apps.googleusercontent.com';
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
  clientIdGoogleSignIn,
};
