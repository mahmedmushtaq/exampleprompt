import {
  CollectionReference,
  DocumentData,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { CollectionTypes } from "../../../globals/types";

/**
 *it will add new data with new uuid
 * @param ref
 * @param data
 */
export const appendNewRecord = async (
  ref: CollectionReference<DocumentData>,
  data: unknown
) => {
  await addDoc(ref, data);
};

export const getAllData = async (ref: CollectionReference<DocumentData>) => {
  const result = await getDocs(ref);
  const data = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

export const getDataById = async (
  collectionName: CollectionTypes,
  id: string
) => {
  const dataDoc = doc(db, collectionName, id);
  const result = await getDoc(dataDoc);
  const data = result.data();
  return data ? { id: result.id, ...result.data() } : undefined;
};

export const getDataByKeyField = async (
  collectionName: CollectionTypes,
  ...args: string[]
) => {
  const dataDoc = doc(db, collectionName, ...args);
  const result = await getDoc(dataDoc);
  const data = result.data();
  return data ? { id: result.id, ...result.data() } : undefined;
};

/**
 * it will add new data according to your uuid
 * @param collectionName
 * @param id
 * @param data
 */
export const addData = async (
  collectionName: CollectionTypes,
  id: string,
  data: unknown
) => {
  await setDoc(doc(db, collectionName, id), data);
};

export const updateData = async (
  collectionName: CollectionTypes,
  id: string,
  newFieldRecord: Partial<unknown>
) => {
  const userDoc = doc(db, collectionName, id);

  await updateDoc(userDoc, newFieldRecord);
};

export const deleteData = async (
  collectionName: CollectionTypes,
  id: string
) => {
  const userDoc = doc(db, collectionName, id);
  await deleteDoc(userDoc);
};
