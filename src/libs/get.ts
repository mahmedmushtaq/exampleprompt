import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { IUserData } from "../globals/type";

const usersCollectionRef = collection(db, "users");

export const getAllUsers = async () => {
  const result = await getDocs(usersCollectionRef);
  const data = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

export const getUserById = async (id: string) => {
  const userDoc = doc(db, "users", id);
  const result = await getDoc(userDoc);
  const data = result.data();
  return data ? ({ id: result.id, ...result.data() } as IUserData) : undefined;
};

export const addUser = async (payload: {
  id: string;
  email: string;
  role: "user" | "admin";
}) => {
  const id = payload.id;
  //@ts-ignore
  delete payload.id;
  await setDoc(doc(db, "users", id), { ...payload });
};

export const updateUser = async (id: string, age: number) => {
  const userDoc = doc(db, "users", id);
  const newField = { age: age + 1 };
  await updateDoc(userDoc, newField);
};

export const deleteUser = async (id: string) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
