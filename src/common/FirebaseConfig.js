import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCHl_s2SDimMCxcvbXBJzjVoN_UOPmdnpM',
  authDomain: 'fitness-feaa5.firebaseapp.com',
  databaseURL: 'https://fitness-feaa5.firebaseio.com',
  projectId: 'fitness-feaa5',
  storageBucket: 'fitness-feaa5.appspot.com',
  messagingSenderId: '784097360045',
};
firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();
