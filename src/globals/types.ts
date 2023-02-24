export enum RoleTypes {
  user = "user",
  admin = "admin",
}

export type TGenericObj = { [key: string]: any };

export enum CollectionTypes {
  users = "users",
  categories = "categories",
  languages = "languages",
  prompts = "prompts",
}

export enum UrlsList {
  dashboard = "/dashboard",
  categoryDashboard = "/dashboard/category",
  addCategory = "/dashboard/category/add",
  languageDashboard = "/dashboard/language",
  addLanguage = "/dashboard/language/add",
  promptDashboard = "/dashboard/prompt",
  addPrompt = "/dashboard/prompt/add",
  dashboardSettings = "/dashboard/settings",
  registration = "/registration",
  promptInfo = "/prompt",
  editPrompt = "/dashboard/prompt/edit",
  editCategory = "/dashboard/category/edit",
}

export interface IUserData {
  id: string;
  email: string;
  role: RoleTypes;
}

export interface ICategoryData {
  id: string;
  name: string;
  description: string;
  incrementalId: string;
  // TODO:- reactive parentCategory if requiuired
  //parentCategory?: ICategoryData;
}

export interface ICategoryWithPrompts {
  category: ICategoryData;
  prompts: IPromptData[];
}

export interface ILanguageData {
  id: string;
  name: string;
}

export interface IPromptData {
  id: string;
  categories: ICategoryData[];
  heading: string;
  slug: string;
  langSymbol: string;
  user: IUserData;
  approved: boolean;
  prompt: string;
  promptExample: string;
}
