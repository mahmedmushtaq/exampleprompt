import { db } from "../../../config/firebase";
import { collection } from "firebase/firestore";
import { CollectionTypes, ICategoryData } from "../../../globals/types";
import { appendNewRecord, deleteData, getAllData } from ".";

const categoriesCollectionRef = collection(db, "categories");

export const addCategory = async (data: Omit<ICategoryData, "id">) => {
  await appendNewRecord(categoriesCollectionRef, data);
};

export const getAllCategories = async () => {
  const allCategories = (await getAllData(
    categoriesCollectionRef
  )) as ICategoryData[];

  return allCategories;
};

export const deleteCategory = async (id: string) => {
  await deleteData(CollectionTypes.categories, id);
};
