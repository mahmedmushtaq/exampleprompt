import FrontLayout from "../src/layouts/FrontLayout";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import type { GetStaticProps } from "next";
import { getAllPromptsByApprovedStatus } from "../src/libs/firebase/db/prompt";
import { ICategoryData, IPromptData } from "../src/globals/types";
import { getAllCategories } from "../src/libs/firebase/db/category";
import {
  Box,
  Divider,
  Unstable_Grid2 as Grid,
  ListItemIcon,
  OutlinedInput,
  Typography,
} from "@mui/material";
import HeadingText from "../src/components/shared/HeadingText";
import ListItemWithIcon from "../src/components/shared/LisItemWithIcon";
import RewriterSvg from "../src/components/shared/Svgs/RewriterSvg";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import SummarizeIcon from "@mui/icons-material/Summarize";

interface IProps {
  prompts: IPromptData[];
  categories: ICategoryData[];
}

const topCategories = [
  { id: 1, heading: "For Students" },
  { id: 2, heading: "For Copywriters" },
  { id: 3, heading: "For Email Marketing Strategist" },
  { id: 4, heading: "For Marketers" },
  { id: 5, heading: "For Social Media Organic growth strategy" },
  { id: 6, heading: "For Developers" },
  { id: 7, heading: "For Businesses" },
];

export default function NewHome(props: IProps) {
  return (
    <FrontLayout
      pageDescription="Get Help From Other People Command"
      pageTitle="Chatgpt prompt ideas"
      maxWidth="lg"
    >
      <Box>
        <HeadingText
          sx={{ mt: 5 }}
          align="center"
          text1="ChatGpt"
          secondaryText="Prompt"
          text2="Ideas"
          variant="h3"
        />

        <Box>
          <Box mt={5}>
            <Grid container justifyContent="center">
              <Grid xs={12} md={5}>
                <OutlinedInput
                  startAdornment={<SearchRoundedIcon sx={{ mr: 1 }} />}
                  fullWidth
                  placeholder="Search prompt by heading"
                  //   value={search}
                  //   onChange={(e) => {
                  //     setSearch(e.target.value);
                  //     debounceSearch(e.target.value);
                  //   }}
                />
              </Grid>
            </Grid>
          </Box>

          {topCategories.map((category) => (
            <Box key={category.id}>
              <Grid container alignItems="center" mt={10}>
                <Grid>
                  <Typography variant="h4">{category.heading}</Typography>
                  <Divider
                    sx={{
                      bgcolor: "primary.main",
                      height: 2,
                      width: 400,

                      mt: 2,
                    }}
                  />
                </Grid>
              </Grid>

              <Box mt={7}>
                <Box my={4}>
                  <Grid container sx={{ px: 5 }} justifyContent="center">
                    <Grid xs={12} sm={4} textAlign="center">
                      <ListItemWithIcon
                        icon={
                          <AutoModeIcon fontSize="large" color="secondary" />
                        }
                        text="Rewrite Text Prompt"
                      />
                    </Grid>
                    <Grid xs={12} sm={4} textAlign="end">
                      <ListItemWithIcon
                        icon={<SummarizeIcon fontSize="large" color="error" />}
                        text="Research Paper Summary Prompt"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </FrontLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  // This is where the error occurs
  const prompts = await getAllPromptsByApprovedStatus(true);
  const categories = await getAllCategories();

  return {
    props: {
      prompts,
      categories,
    },
    revalidate: 1,
  };
};
