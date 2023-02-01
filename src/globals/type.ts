export interface IUserData {
  id: string;
  email: string;
  role: RoleTypes;
}

export enum RoleTypes {
  user = "user",
  admin = "admin",
}
