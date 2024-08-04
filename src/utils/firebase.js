// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQTqCd3MSqJeJySU12RPVqzdsZbAFCbsg",
  authDomain: "reactnetflexgpt.firebaseapp.com",
  projectId: "reactnetflexgpt",
  storageBucket: "reactnetflexgpt.appspot.com",
  messagingSenderId: "986821108585",
  appId: "1:986821108585:web:ed6d93bbbdce596ec193f8",
  measurementId: "G-DV6BP4YX0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();