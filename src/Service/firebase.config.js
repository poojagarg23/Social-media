// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBdNkCMZ1Zld2JGOmaqRre41QPz4D7ivpw",
  authDomain: "firebse-3b55f.firebaseapp.com",
  databaseURL: "https://firebse-3b55f-default-rtdb.firebaseio.com",
  projectId: "firebse-3b55f",
  storageBucket: "firebse-3b55f.appspot.com",
  messagingSenderId: "469352137477",
  appId: "1:469352137477:web:7ba0373bedf882b6f9ad6c",
  measurementId: "G-DEWZVDPKKY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firebase = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app);
const requestToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BOxSgex6aynNBtuXuanwC4XpXmdOlHp6JWd9HNmi7kJoogtx7CSndcR9Y1sbSbgKlANcxDxyVP0KbNtH7PDdT3Y",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        console.log("current tokens and notification working");
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });

export { app, storage, firebase, auth, requestToken, onMessageListener };
