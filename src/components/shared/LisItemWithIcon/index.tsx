import { List, ListItemIcon, ListItemText, SxProps } from "@mui/material";
import { ReactNode } from "react";
import Link from "next/link";

interface IProps {
  icon: ReactNode;
  text: string;
  url?: string;
  containerSx?: SxProps;
}

const ListItemWithIcon = ({ icon, text, url, containerSx = {} }: IProps) => {
  const optionalProps = url ? { component: Link, href: url } : {};
  return (
    <List
      disablePadding
      sx={{ textDecoration: "none", color: "primary.main", ...containerSx }}
      {...optionalProps}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
      <ListItemText primary={text} sx={{ ml: 1 }} />
    </List>
  );
};

export default ListItemWithIcon;
