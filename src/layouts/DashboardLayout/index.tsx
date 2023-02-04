import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Unstable_Grid2 as Grid } from "@mui/material";
import LinkWrapper from "../../components/shared/LinkWrapper";
import CustomCard from "../../components/shared/CustomCard";
import { dashboardNavigation } from "../../globals/constants";
import Link from "next/link";
import { useAuth } from "../../hooks/AuthContext";
import ProfileDropdown from "../../components/shared/ProfileDropdown";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  heading?: string;
  addRecordLink?: string;
  childrenCardBg?: boolean;
  window?: () => Window;
}

export default function DashboardLayout({
  window,
  children,
  heading,
  addRecordLink,
  childrenCardBg,
}: IProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { userData } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        examplePrompt
      </Typography>
      <Divider />
      <List>
        {dashboardNavigation.map((item) =>
          item.admin ? (
            userData?.role === "admin" && (
              <ListItem key={item.id} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText
                    primary={<LinkWrapper link={item.link} text={item.text} />}
                  />
                </ListItemButton>
              </ListItem>
            )
          ) : (
            <ListItem key={item.id} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText
                  primary={<LinkWrapper link={item.link} text={item.text} />}
                />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: "white",
          boxShadow: "0px 1px 10px rgba(74, 74, 74, 0.07)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            color="primary"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            examplePrompt
          </Typography>
          <Grid container alignItems="center" ml="auto">
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {dashboardNavigation.map((item) =>
                item.admin ? (
                  userData?.role === "admin" && (
                    <Button LinkComponent={Link} key={item.id} href={item.link}>
                      {item.text}
                    </Button>
                  )
                ) : (
                  <Button LinkComponent={Link} key={item.id} href={item.link}>
                    {item.text}
                  </Button>
                )
              )}
            </Box>
            <ProfileDropdown />
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Grid
        flexDirection="column"
        alignItems="center"
        sx={{ mt: 7, px: 5, py: 5, width: "100%" }}
      >
        <Box>
          {(heading || addRecordLink) && (
            <Grid container sx={{ mb: 2 }} alignItems="center">
              {heading && <Typography variant="h6">{heading}</Typography>}
              {addRecordLink && (
                <Button variant="contained" sx={{ ml: "auto" }}>
                  <LinkWrapper
                    link={addRecordLink}
                    text="Add Record"
                    sx={{ color: "white", textDecoration: "none" }}
                  />
                </Button>
              )}
            </Grid>
          )}
        </Box>
        {childrenCardBg ? <CustomCard> {children}</CustomCard> : children}
      </Grid>
    </Box>
  );
}
