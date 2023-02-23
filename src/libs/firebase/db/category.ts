import { db } from "../../../config/firebase";
import { collection } from "firebase/firestore";
import { CollectionTypes, ICategoryData } from "../../../globals/types";
import {
  appendNewRecord,
  deleteData,
  getAllData,
  getDataById,
  getDataByKeyField,
  updateData,
} from ".";

const categoriesCollectionRef = collection(db, "categories");

interface IAddCategory extends Omit<ICategoryData, "id"> {
  parentCategoryId?: string;
}

export const addCategory = async (data: IAddCategory) => {
  await appendNewRecord(categoriesCollectionRef, data);
};

export const editCategory = async (id: string, data: IAddCategory) => {
  await updateData(CollectionTypes.categories, id, { ...data });
};

export const getAllCategories = async () => {
  const allCategories = await getAllData(categoriesCollectionRef);

  const allRecordsWithParentCategoryIdsMap = allCategories.map(
    async (category: any) => {
      if (!category.parentCategoryId) {
        return {
          ...category,
        };
      }

      const parentCategoryRecord = await fetchParentCategoryInfo(category);

      return {
        ...category,
        parentCategory: parentCategoryRecord,
      };
    }
  );

  const allRecords = await Promise.all(allRecordsWithParentCategoryIdsMap);
  return allRecords as ICategoryData[];
};

export const deleteCategory = async (id: string) => {
  await deleteData(CollectionTypes.categories, id);
};

export const getCategoryById = async (id: string) => {
  const result = await getDataById(CollectionTypes.categories, id);
  const finalCategoryWithParentCategory = result
    ? await fetchParentCategoryInfo(result as ICategoryData)
    : result;
  return finalCategoryWithParentCategory;
};

export const getCategoryByName = async (val: string) => {
  const result = await getDataByKeyField(
    CollectionTypes.categories,
    "name",
    val
  );
  const finalCategoryWithParentCategory = result
    ? await fetchParentCategoryInfo(result as ICategoryData)
    : result;
  return finalCategoryWithParentCategory;
};

// ===== UTILS function

const fetchParentCategoryInfo = async (category: IAddCategory) => {
  if (!category.parentCategoryId) return { ...category };

  const parentCategoryInfo = await getDataById(
    CollectionTypes.categories,
    category.parentCategoryId
  );

  return {
    ...category,
    parentCategory: parentCategoryInfo,
  };
};
