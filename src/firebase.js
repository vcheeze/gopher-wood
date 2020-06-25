import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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
// firebase.auth().signInAnonymously().catch(function(err) {
//   var errCode = err.code;
//   var errorMessage = err.message;
// });
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//   } else {
//     // user is signed out
//   }
// });

const auth = firebase.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();

const db = firebase.database();

export { auth, db };
