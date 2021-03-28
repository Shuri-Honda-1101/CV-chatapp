import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9K0e88zJkPexZtsdaG3GMt9CQTUkdI0A",
  authDomain: "cv-chat-c4387.firebaseapp.com",
  projectId: "cv-chat-c4387",
  storageBucket: "cv-chat-c4387.appspot.com",
  messagingSenderId: "757455520592",
  appId: "1:757455520592:web:08e67e64a63d40b176e255",
  measurementId: "G-8G85MSD74J",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
