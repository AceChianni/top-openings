// firebaseUtils.js
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config"; // Adjust the path as necessary

export async function getAllDocuments(db, collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addDocument(db, collectionName, data) {
  await addDoc(collection(db, collectionName), data);
}

export async function updateDocument(db, collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

export async function deleteDocument(db, collectionName, id) {
  await deleteDoc(doc(db, collectionName, id));
}

// export const getAllDocuments = async (db, collection) => {
//   const snapshot = await db.collection(collection).get();
//   return snapshot.empty
//     ? []
//     : snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// export const addDocument = async (db, collection, data) => {
//   await db.collection(collection).add(data);
// };

// export const updateDocument = async (db, collection, id, data) => {
//   await db.collection(collection).doc(id).update(data);
// };

// import { db } from "/firebase.config.js";

// export const addDocument = async (db, collection, data) => {
//   try {
//     const docRef = await db.collection(collection).add(data);
//     return docRef.id; // Return the ID of the newly created document if needed
//   } catch (error) {
//     console.error("Error adding document:", error);
//   }
// };
