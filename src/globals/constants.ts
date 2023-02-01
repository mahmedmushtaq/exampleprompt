import {
  ViewComfy as ViewComfyIcon,
  Abc as AbcIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Category as CategoryIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

export const drawerNavigation = [
  { id: 1, Icon: HomeIcon, text: "Home", link: "/" },
  { id: 1, Icon: ViewComfyIcon, text: "Dashboard", link: "/dashboard" },
  { id: 2, Icon: AbcIcon, text: "Universities", link: "/university" },
  { id: 3, Icon: SchoolIcon, text: "Courses", link: "/course" },
  { id: 4, Icon: CategoryIcon, text: "Categories", link: "/category" },
  { id: 6, Icon: SettingsIcon, text: "Setting", link: "/setting" },
];
