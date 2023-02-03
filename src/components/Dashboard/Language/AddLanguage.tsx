import { ChangeEvent, useState } from "react";
import {
  Alert,
  TextField,
  TextareaAutosize,
  Box,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import LoadingButton from "../../shared/LoadingButton";
import { findUndefinedKeyInObj } from "../../../globals/helpers"; 
import useDataFetchingUtils from "../../../hooks/useDataFetchingUtils";
import { UrlsList } from "../../../globals/types";
import { addLanguage } from "../../../libs/firebase/db/language";

const AddLanguage = () => {
  const [formState, setFormState] = useState({
    name: "",
  });
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
      await addLanguage({ ...formState });
      window.location.href = UrlsList.languageDashboard;
    } catch (err) {
      setErr(String(err));
    }

    setIsLoading(false);
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

export default AddLanguage;
