import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "whatsapp-clone-13e3a.firebaseapp.com",
  databaseURL:
    "https://whatsapp-clone-13e3a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "whatsapp-clone-13e3a",
  storageBucket: "whatsapp-clone-13e3a.appspot.com",
  messagingSenderId: "5165191432",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-BDL4VEX27T",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const authentication = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { authentication, provider };
