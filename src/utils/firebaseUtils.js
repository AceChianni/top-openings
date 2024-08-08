import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firestore, auth };

export const addAnimeOpening = async (opening) => {
  await firestore.collection("openings").add(opening);
};

export const getAnimeOpenings = async (userId) => {
  const snapshot = await firestore
    .collection("openings")
    .where("userId", "==", userId)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteAnimeOpening = async (id) => {
  await firestore.collection("openings").doc(id).delete();
};
