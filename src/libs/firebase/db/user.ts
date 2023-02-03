import { db } from "../../../config/firebase";
import { collection } from "firebase/firestore";
import { CollectionTypes, IUserData } from "../../../globals/types";
import { addData, deleteData, getAllData, getDataById, updateData } from ".";

const usersCollectionRef = collection(db, "users");

export const getAllUsers = async () => {
  const allUsers = (await getAllData(usersCollectionRef)) as IUserData[];
  return allUsers;
};

export const getUserById = async (id: string) => {
  const data = (await getDataById(CollectionTypes.users, id)) as
    | IUserData
    | undefined;
  return data;
};

export const addUser = async (payload: {
  id: string;
  email: string;
  role: "user" | "admin";
}) => {
  const id = payload.id;
  //@ts-ignore
  delete payload.id;
  await addData(CollectionTypes.users, id, payload);
};

export const updateUser = async (id: string, age: number) => {
  await updateData(CollectionTypes.users, id, { age: age + 1 });
};

export const deleteUser = async (id: string) => {
  await deleteData(CollectionTypes.users, id);
};
