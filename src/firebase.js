import firebase from 'firebase/app';
import '@firebase/database';
// import '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmFDksTdBvyGUFnvoSMCwbW53TBuXO6K8",
  authDomain: "gopher-wood.firebaseapp.com",
  databaseURL: "https://gopher-wood.firebaseio.com",
  projectId: "gopher-wood",
  storageBucket: "gopher-wood.appspot.com",
  messagingSenderId: "714895840091",
  appId: "1:714895840091:web:12450d305166317d42007e",
  measurementId: "G-QELSE34YV5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();

const db = firebase.database();

const firestore = {
  baseUrl: 'https://firestore.googleapis.com/v1',
  ivcAppointments: 'projects/gopher-wood/databases/(default)/documents/ivc-appointments',
  apiKey: 'AIzaSyAmFDksTdBvyGUFnvoSMCwbW53TBuXO6K8'
};

export { db, firestore };
