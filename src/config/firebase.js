// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoyynVhwQ7-sGl3kauiowCLIfKYlTlzJw",
  authDomain: "hiringapp-3f68a.firebaseapp.com",
  projectId: "hiringapp-3f68a",
  storageBucket: "hiringapp-3f68a.firebasestorage.app",
  messagingSenderId: "754694744987",
  appId: "1:754694744987:web:48728d13f10a9075774f3e",
  measurementId: "G-TLJ7M4GJ3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
// const analytics = getAnalytics(app);

