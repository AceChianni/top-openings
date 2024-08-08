// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh38shhncQs7RD8Eqd9hbrNhTCiSZiztQ",
  authDomain: "my-top-openings.firebaseapp.com",
  projectId: "my-top-openings",
  storageBucket: "my-top-openings.appspot.com",
  messagingSenderId: "776531608476",
  appId: "1:776531608476:web:7fcdb0bc5235c71d9a7e59",
  measurementId: "G-9SWKBD48WP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
