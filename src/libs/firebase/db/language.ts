import { db } from "../../../config/firebase";
import { collection } from "firebase/firestore";
import { CollectionTypes, ILanguageData } from "../../../globals/types";
import { appendNewRecord, deleteData, getAllData } from ".";

const categoriesCollectionRef = collection(db, "languages");

export const addLanguage = async (data: Omit<ILanguageData, "id">) => {
  await appendNewRecord(categoriesCollectionRef, data);
};

export const getAllLanguages = async () => {
  const allLanguages = (await getAllData(
    categoriesCollectionRef
  )) as ILanguageData[];

  return allLanguages;
};

export const deleteLanguage = async (id: string) => {
  await deleteData(CollectionTypes.languages, id);
};
