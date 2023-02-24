import { db } from "../../../config/firebase";
import { collection } from "firebase/firestore";
import {
  CollectionTypes,
  ICategoryData,
  ICategoryWithPrompts,
} from "../../../globals/types";
import {
  appendNewRecord,
  deleteData,
  getAllData,
  getDataById,
  getDataByKeyField,
  updateData,
} from ".";
import {
  getAllPromptsByCategoryId,
  getAllPromptsByCategoryName,
} from "./prompt";
import { sortArrayObj } from "../../../globals/helpers";

const categoriesCollectionRef = collection(db, "categories");

interface IAddCategory extends Omit<ICategoryData, "id" | "incrementalId"> {
  // TODO:- reactive this in future if we want parentCategorySupport
  // parentCategoryId?: string;
}

export const addCategory = async (data: IAddCategory) => {
  await appendNewRecord(categoriesCollectionRef, data);
};

export const editCategory = async (id: string, data: IAddCategory) => {
  await updateData(CollectionTypes.categories, id, { ...data });
};

export const getAllCategories = async () => {
  const allCategories = (await getAllData(
    categoriesCollectionRef
  )) as ICategoryData[];
  return allCategories;

  // TODO:- reactive this in future if we want parentCategorySupport
  // const allRecordsWithParentCategoryIdsMap = allCategories.map(
  //   async (category: any) => {
  //     if (!category.parentCategoryId) {
  //       return {
  //         ...category,
  //       };
  //     }

  //     const parentCategoryRecord = await fetchParentCategoryInfo(category);

  //     return {
  //       ...category,
  //       parentCategory: parentCategoryRecord,
  //     };
  //   }
  // );

  // const allRecords = await Promise.all(allRecordsWithParentCategoryIdsMap);
  // return allRecords as ICategoryData[];
};

export const deleteCategory = async (id: string) => {
  await deleteData(CollectionTypes.categories, id);
};

export const getCategoryById = async (id: string) => {
  const result = (await getDataById(
    CollectionTypes.categories,
    id
  )) as ICategoryData;

  return result;

  // TODO:- reactive this in future if we want parentCategorySupport
  // const finalCategoryWithParentCategory = result
  //   ? await fetchParentCategoryInfo(result as ICategoryData)
  //   : result;
  // return finalCategoryWithParentCategory;
};

export const getCategoryByName = async (val: string) => {
  const result = await getDataByKeyField(
    CollectionTypes.categories,
    "name",
    val
  );

  return result as ICategoryData | undefined;
  // TODO:- reactive this in future if we want parentCategorySupport
  // const finalCategoryWithParentCategory = result
  //   ? await fetchParentCategoryInfo(result as ICategoryData)
  //   : result;
  // return finalCategoryWithParentCategory;
};

export const getAllCategoriesWithPrompts = async () => {
  const allCategories = await getAllData(categoriesCollectionRef);

  const asyncMap = allCategories.map(async (category) => {
    // fetch prompts
    const prompts = await getAllPromptsByCategoryId(category.id);

    return {
      category,
      prompts,
    };
  });

  const allData = (await Promise.all(asyncMap)) as ICategoryWithPrompts[];

  const data = allData.sort(
    (a: ICategoryWithPrompts, b: ICategoryWithPrompts) => {
      return +a.category.incrementalId - +b.category.incrementalId;
    }
  );

  return data;
};

// ===== UTILS function

// TODO:- reactive this in future if we want parentCategorySupport
// const fetchParentCategoryInfo = async (category: IAddCategory) => {
//   if (!category.parentCategoryId) return { ...category };

//   const parentCategoryInfo = await getDataById(
//     CollectionTypes.categories,
//     category.parentCategoryId
//   );

//   return {
//     ...category,
//     parentCategory: parentCategoryInfo,
//   };
// };
