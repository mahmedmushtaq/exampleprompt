import { TGenericObj } from "./types";

export const findUndefinedKeyInObj = (obj: TGenericObj) => {
  return Object.keys(obj).find((key) => !obj[key]);
};
