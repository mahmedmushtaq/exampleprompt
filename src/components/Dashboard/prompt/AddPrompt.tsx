import { ChangeEvent, useCallback, useState } from "react";
import {
  Alert,
  TextField,
  TextareaAutosize,
  Box,
  Unstable_Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import LoadingButton from "../../shared/LoadingButton";
import { findUndefinedKeyInObj } from "../../../globals/helpers";
import useDataFetchingUtils from "../../../hooks/useDataFetchingUtils";
import {
  ICategoryData,
  ILanguageData,
  IPromptData,
  UrlsList,
} from "../../../globals/types";
import {
  addLanguage,
  getAllLanguages,
} from "../../../libs/firebase/db/language";
import { getAllCategories } from "../../../libs/firebase/db/category";
import SelectLanguage from "../../shared/SelectLanguage";
import SelectCategory from "../../shared/SelectCategory";

const AddPrompt = () => {
  const [formState, setFormState] = useState({
    name: "",
    category: "",
    language: "en",
  });

  const [allCategories, setAllCategories] = useState<ICategoryData[]>([]);
  const [allLanguages, setAllLanguages] = useState<ILanguageData[]>([]);

  const { errAlert, setErr, isLoading, setIsLoading, trackApiCall } =
    useDataFetchingUtils();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const loadCategoriesAndLanguages = useCallback(async () => {
    trackApiCall();
    let allCategories: ICategoryData[] = [],
      allLanguages: ILanguageData[] = [];
    try {
      allCategories = await getAllCategories();
    } catch (err) {
      setErr(String(err));
    }

    try {
      allLanguages = await getAllLanguages();
    } catch (err) {
      setErr(String(err));
    }

    setAllCategories(allCategories);
    setAllLanguages(allLanguages);
    setIsLoading(false);
  }, []);

  const handleSubmit = async () => {
    if (findUndefinedKeyInObj(formState)) {
      return setErr("All fields are required");
    }
    trackApiCall();
    try {
      //   await addLanguage({ ...formState });
      //   window.location.href = UrlsList.languageDashboard;
    } catch (err) {
      setErr(String(err));
    }

    setIsLoading(false);
  };

  const onChangeSelect = (e: SelectChangeEvent<any>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Box py={3} px={1}>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={formState.name}
            onChange={onChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        <Grid xs={12} md={6}>
          <SelectCategory
            name="category"
            value={formState.category}
            onChange={onChangeSelect}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <SelectLanguage
            name="language"
            value={formState.language}
            onChange={onChangeSelect}
          />
        </Grid>
      </Grid>

      <LoadingButton
        sx={{ mt: 3 }}
        loading={isLoading}
        text="Add Language"
        onClick={handleSubmit}
      />
      {errAlert}
    </Box>
  );
};

export default AddPrompt;
