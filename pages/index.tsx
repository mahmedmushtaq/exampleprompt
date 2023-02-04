import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import FrontLayout from "../src/layouts/FrontLayout";
import HeadingText from "../src/components/shared/HeadingText";
import { useEffect } from "react";
import { getAllUsers } from "../src/libs/firebase/db/user";
import SelectCategory from "../src/components/shared/SelectCategory";
import SelectLanguage from "../src/components/shared/SelectLanguage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    (async () => {
      const allUsersData = await getAllUsers();
      console.log("allUsersData ", allUsersData);
    })();
  }, []);

  return (
    <FrontLayout
      pageDescription="Get Help From Other People Command"
      pageTitle="Chatgpt prompt ideas"
    >
      <Box>
        <HeadingText
          sx={{ mt: 5 }}
          align="center"
          text1="Free"
          secondaryText="ChatGpt Prompt"
          text2="Ideas"
          variant="h3"
        />

        <Typography align="center" my={2}>
          Share your outstanding prompts with the world and help the community
        </Typography>

        <Grid
          container
          mt={5}
          justifyContent="center"
          spacing={2}
          alignItems="center"
        >
          <Grid xs={5} md={3}>
            <SelectCategory />
          </Grid>
          <Grid xs={5} md={3}>
            <SelectLanguage />
          </Grid>
        </Grid>
      </Box>
    </FrontLayout>
  );
}
