import { TGenericObj } from "./types";
import slugify from "slugify";

export const findUndefinedKeyInObj = (
  obj: TGenericObj,
  excludeKeys: string[] = []
) => {
  return Object.keys(obj).find(
    (key) => !obj[key] && !excludeKeys.includes(key)
  );
};

export const generateSlug = (text: string) =>
  slugify(text, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    trim: true,
  });

export const removeUndefinedKeyFromObj = (obj: TGenericObj) => {
  console.log("obj is ", obj);
  const newObj: TGenericObj = {};
  Object.keys(obj).map((k) => {
    if (obj[k]) newObj[k] = obj[k];
  });
  return newObj;
};

export const sortArrayObj = (
  obj: TGenericObj[],
  sortingKey: string,
  order: "asc" | "desc"
) => {
  return obj.sort((a: TGenericObj, b: TGenericObj) => {
    if (order === "asc") {
      console.log("a[sortingKey] ", a[sortingKey]);
      return parseInt(a[sortingKey]) - parseInt(b[sortingKey]);
    }
    return b[sortingKey] - a[sortingKey];
  });
};
