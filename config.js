import firebase from 'firebase';
require ('@firebase.firestore')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDQlkAA_jtU25_SCinodwMb1Pb-A40jhQM",
  authDomain: "barter-system-app-c051d.firebaseapp.com",
  databaseURL: "https://barter-system-app-c051d.firebaseio.com",
  projectId: "barter-system-app-c051d",
  storageBucket: "barter-system-app-c051d.appspot.com",
  messagingSenderId: "392352049956",
  appId: "1:392352049956:web:271435aa4a6ab3d8d761b1"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();