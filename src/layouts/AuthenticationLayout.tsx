import React, { ReactNode, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../components/shared/Navbar";

interface IProps {
  children: ReactNode | ReactNode[];
  heading: string;
  handleSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const AuthenticationLayout = ({ children, heading, handleSubmit }: IProps) => {
  return (
    <Container component="main" maxWidth="xs">
      <Navbar />
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {heading}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default AuthenticationLayout;
