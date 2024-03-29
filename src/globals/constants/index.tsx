import {
  ViewComfy as ViewComfyIcon,
  Abc as AbcIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Category as CategoryIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { UrlsList } from "../types";

export const dashboardNavigation = [
  { id: 1, Icon: HomeIcon, text: "Home", link: "/" },
  {
    id: 2,
    Icon: ViewComfyIcon,
    text: "Category",
    link: UrlsList.categoryDashboard,
    admin: true,
  },
  //   {
  //     id: 3,
  //     Icon: AbcIcon,
  //     text: "Language",
  //     link: UrlsList.languageDashboard,
  //     admin: true,
  //   },
  {
    id: 4,
    Icon: SchoolIcon,
    admin: true,
    text: "Prompt",
    link: "/dashboard/prompt",
  },
];

export enum MESSAGE_KEYS {
  RECEIVED_MSG_EXAMPLE_PROMPT_EXTENSION = "RECEIVED_MSG_EXAMPLE_PROMPT_EXTENSION",
  SEND_MSG_EXAMPLE_PROMPT_EXTENSION = "SEND_MSG_EXAMPLE_PROMPT_EXTENSION",
}
