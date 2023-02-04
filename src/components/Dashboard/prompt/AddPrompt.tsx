import { ChangeEvent, useCallback, useState } from "react";
import {
  TextField,
  Box,
  Unstable_Grid2 as Grid,
  SelectChangeEvent,
} from "@mui/material";
import LoadingButton from "../../shared/LoadingButton";
import { findUndefinedKeyInObj } from "../../../globals/helpers";
import useDataFetchingUtils from "../../../hooks/useDataFetchingUtils";
import SelectLanguage from "../../shared/SelectLanguage";
import SelectCategory from "../../shared/SelectCategory";
import { addPrompt } from "../../../libs/firebase/db/prompt";
import { useAuth } from "../../../hooks/AuthContext";
import { UrlsList } from "../../../globals/types";

const AddPrompt = () => {
  const [formState, setFormState] = useState({
    text: "",
    heading: "",
    categoryIds: [],
    langSymbol: "en",
  });

  const { userData } = useAuth();
  const { errAlert, setErr, isLoading, setIsLoading, trackApiCall } =
    useDataFetchingUtils();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (findUndefinedKeyInObj(formState)) {
      return setErr("All fields are required");
    }
    trackApiCall();
    try {
      await addPrompt({ ...formState, userId: userData!.id });
      window.location.href = UrlsList.promptDashboard;
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
      <TextField
        fullWidth
        id="outlined-basic"
        label="Prompt Heading"
        variant="outlined"
        name="heading"
        value={formState.heading}
        onChange={onChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        id="outlined-basic"
        label="Detail prompt with example like ( write an essay related to AI )"
        variant="outlined"
        name="text"
        multiline
        rows={4}
        value={formState.text}
        onChange={onChange}
        sx={{ mb: 2 }}
      />

      <Grid container spacing={5}>
        <Grid xs={12} md={6}>
          <SelectCategory
            name="categoryIds"
            value={formState.categoryIds}
            onChange={onChangeSelect}
            multiple
          />
        </Grid>
        <Grid xs={12} md={6}>
          <SelectLanguage
            name="langSymbol"
            value={formState.langSymbol}
            onChange={onChangeSelect}
          />
        </Grid>
      </Grid>

      <LoadingButton
        sx={{ mt: 3 }}
        loading={isLoading}
        text="Submit Prompt"
        onClick={handleSubmit}
      />
      {errAlert}
    </Box>
  );
};

export default AddPrompt;
