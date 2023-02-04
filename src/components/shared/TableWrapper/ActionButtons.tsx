import { RoleTypes, TGenericObj } from "../../../globals/types";
import LoadingButton from "../LoadingButton";
import { IActionButton, actionBtnType } from "./type";

const getActionBtnColor = (type: actionBtnType) => {
  if (type === "delete") return "error"; // red color will show
  else if (type === "approve") return "primary";
  return "secondary";
};

interface IProps {
  actionButtons?: IActionButton[];
  role?: RoleTypes;
  row: TGenericObj;
}

const ActionButtons = ({ actionButtons, role, row }: IProps) => {
  return (
    <>
      {actionButtons?.map((btn) =>
        btn.requireAdminAccess ? ( // some specific buttons are only for admin
          role === "admin" ? ( // if role is not admin then no button will be show in action column
            btn.conditionalKey ? ( // conditionally show button if user wants
              !row[btn.conditionalKey] && (
                <ActionBtn key={btn.type} btn={btn} id={row.id} />
              )
            ) : (
              <ActionBtn key={btn.type} btn={btn} id={row.id} />
            )
          ) : null
        ) : (
          <ActionBtn key={btn.type} btn={btn} id={row.id} />
        )
      )}
    </>
  );
};

const ActionBtn = ({ btn, id }: { btn: IActionButton; id: string }) => (
  <LoadingButton
    size="small"
    key={btn.type}
    text={btn.type}
    sx={{ mr: 1 }}
    color={getActionBtnColor(btn.type)}
    onClick={() => btn.onClick?.(id)}
  />
);

export default ActionButtons;
