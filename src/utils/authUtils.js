import { auth } from "./firebaseUtils";

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const register = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const logout = () => {
  return auth.signOut();
};
