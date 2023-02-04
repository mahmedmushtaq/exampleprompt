import { db } from "../../../config/firebase";
import {
  collection,
  getDocs,
  where,
  query,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { CollectionTypes, IPromptData } from "../../../globals/types";
import { appendNewRecord, deleteData, updateData } from ".";
import { generateSlug } from "../../../globals/helpers";
import { getCategoryById } from "./category";
import { getUserById } from "./user";

const promptCollectionRef = collection(db, "prompts");

interface IAddPrompt
  extends Pick<IPromptData, "text" | "langSymbol" | "heading"> {
  categoryIds: string[];
  userId: string;
}

export const addPrompt = async ({
  text,
  langSymbol,
  categoryIds,
  userId,
  heading,
}: IAddPrompt) => {
  const data = {
    text,
    langSymbol,
    heading,
    slug: generateSlug(heading),
    categoryIds,
    userId,
    approved: false,
  };
  await appendNewRecord(promptCollectionRef, data);
};

export const getAllPromptsByUserId = async (uid: string) => {
  const q = query(promptCollectionRef, where("userId", "==", uid));
  const result = await getDocs(q);
  return allPrompts(result);
};

export const getAllPromptsByApprovedStatus = async (status: boolean) => {
  const q = query(promptCollectionRef, where("approved", "==", status));
  const result = await getDocs(q);
  return allPrompts(result);
};

export const allPrompts = async (result: QuerySnapshot<DocumentData>) => {
  const returnDataMap = result.docs.map(async (doc) => {
    const data = doc.data();
    // get categoryDetails
    const categoriesMap = data.categoryIds.map(async (id: string) => {
      const categoryData = await getCategoryById(id);
      return categoryData;
    });
    const categories = await Promise.all(categoriesMap);

    const user = await getUserById(data.userId);
    delete data.categoryIds;
    delete data.userId;
    return {
      id: doc.id,
      categories,
      user,
      ...data,
    };
  });

  const returnData = await Promise.all(returnDataMap);
  return returnData as IPromptData[];
};

export const deletePrompt = async (id: string) => {
  await deleteData(CollectionTypes.prompts, id);
};

export const approvePrompt = async (id: string) => {
  await updateData(CollectionTypes.prompts, id, { approved: true });
};
