import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "whatsapp-clone-13e3a.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "whatsapp-clone-13e3a",
  storageBucket: "whatsapp-clone-13e3a.appspot.com",
  messagingSenderId: "5165191432",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-BDL4VEX27T",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const authentication = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

export { authentication, provider, database };
