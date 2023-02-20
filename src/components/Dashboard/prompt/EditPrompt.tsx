import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
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
import {
  addPrompt,
  getPromptBySlug,
  updatePrompt,
} from "../../../libs/firebase/db/prompt";
import { useAuth } from "../../../hooks/AuthContext";
import { UrlsList } from "../../../globals/types";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const EditPrompt = () => {
  const [formState, setFormState] = useState<{
    heading: string;
    categoryIds: string[];
    langSymbol: string;
    promptId: string;
  }>({
    heading: "",
    categoryIds: [],
    langSymbol: "en",
    promptId: "",
  });

  const { userData } = useAuth();

  const [quillEditorState, setQuillEditorState] = useState("");

  const router = useRouter();

  const { slug } = router.query;

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const { errAlert, setErr, isLoading, setIsLoading, trackApiCall } =
    useDataFetchingUtils();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const loadPrompt = useCallback(async () => {
    setIsLoading(true);
    if (!slug) return setErr("slug is required");
    try {
      const promptInfo = await getPromptBySlug(slug as string);

      const categoryIds = promptInfo.categories.map(
        (cat) => cat.id
      ) as string[];

      setFormState({
        heading: promptInfo.heading,
        categoryIds: categoryIds as any,
        langSymbol: "en",
        promptId: promptInfo.id,
      });

      setQuillEditorState(promptInfo.text);
    } catch (err) {
      console.log(
        " ====== err in loading prompt info in edit page ===== ",
        err
      );
      setErr("Err in loading prompt info");
    }
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    loadPrompt();
  }, [loadPrompt]);

  const handleSubmit = async () => {
    if (findUndefinedKeyInObj(formState)) {
      return setErr("All fields are required");
    }
    if (formState.heading.length > 50) {
      return setErr("Only 50 words are allowed in heading");
    }
    trackApiCall();
    try {
      await updatePrompt(formState.promptId, {
        heading: formState.heading,
        categoryIds: formState.categoryIds,
        langSymbol: formState.langSymbol,
        text: quillEditorState,
        userId: userData!.id,
      });

      router.push(UrlsList.promptInfo + "/" + slug);
    } catch (err) {
      setErr(String(err));
    }

    setIsLoading(false);
  };

  const onChangeSelect = (e: SelectChangeEvent<any>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onChangeQuillEditState = (val: string) => {
    setQuillEditorState(val);
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
        <ReactQuill
          theme="snow"
          value={quillEditorState}
          onChange={onChangeQuillEditState}
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
        text="Update Prompt"
        onClick={handleSubmit}
      />
      {errAlert}
    </Box>
  );
};

export default EditPrompt;
