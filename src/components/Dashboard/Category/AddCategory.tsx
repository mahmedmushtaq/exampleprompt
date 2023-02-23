import { ChangeEvent, useState } from "react";
import {
  Alert,
  TextField,
  TextareaAutosize,
  Box,
  Unstable_Grid2 as Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import LoadingButton from "../../shared/LoadingButton";
import { findUndefinedKeyInObj } from "../../../globals/helpers";
import { addCategory } from "../../../libs/firebase/db/category";
import useDataFetchingUtils from "../../../hooks/useDataFetchingUtils";
import { UrlsList } from "../../../globals/types";

const AddCategory = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  const [isParentCategory, setIsParentCategory] = useState(true);
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
      await addCategory({ ...formState });
      window.location.href = UrlsList.categoryDashboard;
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

      <TextareaAutosize
        style={{
          width: "100%",
          borderRadius: 10,
          padding: 10,
          marginTop: 32,
        }}
        minRows={4}
        name="description"
        value={formState.description}
        onChange={(e) =>
          setFormState({ ...formState, description: e.target.value })
        }
        id="outlined-basic"
        placeholder="Detailed description"
      />

      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={isParentCategory}
              onChange={(e) => setIsParentCategory(e.target.checked)}
            />
          }
          label={
            isParentCategory
              ? "It is parent category"
              : "No it's not a parent category"
          }
        />
      </Box>

      <LoadingButton
        sx={{ mt: 3 }}
        loading={isLoading}
        text="Add Category"
        onClick={handleSubmit}
      />
      {errAlert}
    </Box>
  );
};

export default AddCategory;
