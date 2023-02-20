import {
  Box,
  Typography,
  Unstable_Grid2 as Grid,
  OutlinedInput,
  SelectChangeEvent,
  Chip,
} from "@mui/material";
import HeadingText from "../shared/HeadingText";
import SelectCategory from "../shared/SelectCategory";
import SelectLanguage from "../shared/SelectLanguage";
import Router, { useRouter } from "next/router";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccordionWrapper from "../shared/AccordionWrapper";
import { ICategoryData, IPromptData } from "../../globals/types";
import { useEffect, useState } from "react";
import useSearchFilter from "./useSearchFilter";
import PromptItem from "./PromptItem";

interface IProps {
  prompts: IPromptData[];
  categories: ICategoryData[];
}

const Home = ({ prompts, categories }: IProps) => {
  const {
    selectedCategory,
    setSearch,

    onChangeCategorySelect,
    selectedLang,
    onChangeLanguageSelect,
    filteredPrompts,
    resetFilterComponent,
    search,
    debounceSearch,
  } = useSearchFilter({ prompts });

  return (
    <Box textAlign="center">
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
        direction="column"
      >
        <Grid xs={12} md={5}>
          <OutlinedInput
            startAdornment={<SearchRoundedIcon sx={{ mr: 1 }} />}
            fullWidth
            placeholder="Search prompt by heading"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              debounceSearch(e.target.value);
            }}
          />
        </Grid>
        <Grid xs={11} md={7}>
          {categories.map((category) => (
            <Chip
              label={category.name}
              key={category.id}
              color={selectedCategory === category.name ? "primary" : undefined}
              sx={{ m: 1, cursor: "pointer" }}
              onClick={() => onChangeCategorySelect(category.name)}
            />
          ))}
        </Grid>
      </Grid>
      {resetFilterComponent}

      <Box my={5}>
        <Typography variant="h4" align="center">
          All Prompts
        </Typography>
      </Box>

      <Grid container alignItems="center" spacing={4}>
        {filteredPrompts.map((prompt) => (
          <Grid sm={3} key={prompt.id}>
            <PromptItem {...prompt} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
