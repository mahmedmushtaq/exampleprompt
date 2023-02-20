import { TGenericObj } from "./types";
import slugify from "slugify";

export const findUndefinedKeyInObj = (obj: TGenericObj) => {
  return Object.keys(obj).find((key) => !obj[key]);
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
