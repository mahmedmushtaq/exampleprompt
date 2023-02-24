import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Alert,
  TextField,
  TextareaAutosize,
  Box,
  Unstable_Grid2 as Grid,
  FormControlLabel,
  Switch,
  SelectChangeEvent,
} from "@mui/material";
import LoadingButton from "../../shared/LoadingButton";
import { findUndefinedKeyInObj } from "../../../globals/helpers";
import {
  addCategory,
  editCategory,
  getCategoryById,
} from "../../../libs/firebase/db/category";
import useDataFetchingUtils from "../../../hooks/useDataFetchingUtils";
import { UrlsList } from "../../../globals/types";
import { useRouter } from "next/router";
import SelectCategory from "../../shared/SelectCategory";

const EditCategory = () => {
  const [categoryInfo, setCategoryInfo] = useState({
    name: "",
    description: "",
    incrementalId: 0,
  });

  const { errAlert, setErr, isLoading, setIsLoading, trackApiCall } =
    useDataFetchingUtils();

  const router = useRouter();

  const { id } = router.query;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryInfo({ ...categoryInfo, [e.target.name]: e.target.value });
  };

  const loadCategory = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getCategoryById(id as string);
      setCategoryInfo({
        ...categoryInfo,
        name: res.name,
        description: res.description,
        incrementalId: +res.incrementalId,
      });
    } catch (err) {
      console.log("error in loading category info");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  const handleSubmit = async () => {
    if (findUndefinedKeyInObj(categoryInfo, ["parentCategoryId"])) {
      return setErr("All fields are required ");
    }

    trackApiCall();
    try {
      await editCategory(id as string, { ...categoryInfo });
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
            value={categoryInfo.name}
            onChange={onChange}
          />
        </Grid>
      </Grid>

      <TextField
        fullWidth
        id="outlined-basic"
        label="AutoIncrement Id"
        variant="outlined"
        name="incrementalId"
        value={categoryInfo.incrementalId}
        onChange={onChange}
        sx={{ mt: 5 }}
      />

      <TextareaAutosize
        style={{
          width: "100%",
          borderRadius: 10,
          padding: 10,
          marginTop: 32,
        }}
        minRows={4}
        name="description"
        value={categoryInfo.description}
        onChange={(e) =>
          setCategoryInfo({ ...categoryInfo, description: e.target.value })
        }
        id="outlined-basic"
        placeholder="Detailed description"
      />

      <LoadingButton
        sx={{ mt: 3 }}
        loading={isLoading}
        text="Update Category"
        onClick={handleSubmit}
      />
      {errAlert}
    </Box>
  );
};

export default EditCategory;
