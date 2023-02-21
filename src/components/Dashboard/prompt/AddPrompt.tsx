import { ChangeEvent, useCallback, useMemo, useState } from "react";
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

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const AddPrompt = () => {
  const [formState, setFormState] = useState({
    heading: "",
    prompt: "",
    promptExample: "",
    categoryIds: [],
    langSymbol: "en",
  });

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

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
    if (formState.heading.length > 50) {
      return setErr("Only 50 words are allowed in heading");
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
        color={formState.heading.length > 50 ? "error" : "primary"}
        value={formState.heading}
        onChange={onChange}
        sx={{ mb: 2 }}
        helperText={`Only 50 words are allowed. Remaining words:  ${
          50 - formState.heading.length
        }`}
      />

      <Box mb={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Enter your prompt here"
          variant="outlined"
          name="prompt"
          multiline
          rows={2}
          value={formState.prompt}
          onChange={onChange}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Enter your prompt example here"
          variant="outlined"
          name="promptExample"
          multiline
          rows={2}
          value={formState.promptExample}
          onChange={onChange}
        />
      </Box>

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
            value={"en"}
            disabled
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
