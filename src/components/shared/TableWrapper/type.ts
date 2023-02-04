export type actionBtnType = "more" | "approve" | "delete";
export interface IActionButton {
  type: actionBtnType;
  onClick?: (id: string) => void;
  requireAdminAccess?: boolean; // particular action button will only be visible for admin only
  conditionalKey?: string; // if particular key is present in data then particular action btn will show otherwise not
}
