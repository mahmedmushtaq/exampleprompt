import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  text: string;
}

const ListItemWithIcon = ({ icon, text }: IProps) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
      <ListItemText primary={text} sx={{ ml: 1 }} />
    </ListItem>
  );
};

export default ListItemWithIcon;
