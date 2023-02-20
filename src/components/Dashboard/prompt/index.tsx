import { useCallback, useEffect, useState } from "react";
import useDataFetchingUtils from "../../../hooks/useDataFetchingUtils";
import { IPromptData, TGenericObj, UrlsList } from "../../../globals/types";
import TableWrapper from "../../shared/TableWrapper";
import { useAuth } from "../../../hooks/AuthContext";
import {
  approvePrompt,
  deletePrompt,
  getAllPromptsByApprovedStatus,
  getAllPromptsByUserId,
} from "../../../libs/firebase/db/prompt";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useRouter } from "next/router";

type adminPromptFilterType = "my" | "not-approved" | "approved";

const Prompt = () => {
  const [allPrompts, setAllPrompts] = useState<IPromptData[]>([]);
  const { errAlert, setErr, loadingAlert, trackApiCall, setIsLoading } =
    useDataFetchingUtils();

  const { userData, isAdmin } = useAuth();
  const [adminPromptFilter, setAdminPromptFilter] =
    useState<adminPromptFilterType>("my");

  const router = useRouter();

  const loadAllPromptsById = useCallback(async () => {
    trackApiCall();
    try {
      const allPromptsByUid = await getAllPromptsByUserId(userData!.id);
      setAllPrompts(allPromptsByUid);
    } catch (err) {
      setErr(String(err));
    }

    setIsLoading(false);
  }, []);

  const loadAllPromptsByApprovedStatus = useCallback(
    async (status: boolean) => {
      trackApiCall();
      try {
        const allPrompts = await getAllPromptsByApprovedStatus(status);
        setAllPrompts(allPrompts);
      } catch (err) {
        setErr(String(err));
      }

      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    loadAllPromptsById();
  }, [loadAllPromptsById]);

  const deleteData = async (id: string) => {
    trackApiCall();
    try {
      await deletePrompt(id);
      const remainingPrompts = allPrompts.filter((prompt) => prompt.id !== id);
      setAllPrompts(remainingPrompts);
    } catch (err) {
      setErr(String(err));
    }
    setIsLoading(false);
  };

  const approveBtn = async (id: string) => {
    trackApiCall();
    try {
      await approvePrompt(id);
      const updatedRecord = allPrompts.map((prompt) => {
        if (prompt.id === id) return { ...prompt, approved: true };
        return { ...prompt };
      });
      setAllPrompts(updatedRecord);
    } catch (err) {
      setErr(String(err));
    }
    setIsLoading(false);
  };

  const onChangeAdminPromptFilter = async (e: SelectChangeEvent<any>) => {
    const value = e.target.value as adminPromptFilterType;
    if (value === "my") {
      await loadAllPromptsById();
    } else if (value === "not-approved") {
      await loadAllPromptsByApprovedStatus(false); // not-approved
    } else {
      await loadAllPromptsByApprovedStatus(true); // approved
    }
    setAdminPromptFilter(value);
  };

  const visitPrompt = (id: string, row: IPromptData) => {
    router.push(UrlsList.promptInfo + `/${row.slug}`);
  };

  return (
    <div>
      {loadingAlert}
      {isAdmin && (
        <Grid container sx={{ my: 3 }}>
          <Grid xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Prompt Filter
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={adminPromptFilter}
                onChange={onChangeAdminPromptFilter}
              >
                <MenuItem value="approved"> Show Approved Prompts</MenuItem>
                <MenuItem value="not-approved">
                  Show Not Approved Prompts{" "}
                </MenuItem>
                <MenuItem value="my">Only My Prompts</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

      <TableWrapper
        columns={["id", "heading", "approved"]}
        rows={allPrompts}
        actionColumn
        role={userData?.role}
        showIndex
        actionColumnConfig={{
          actionButtons: [
            {
              type: "link",
              onClick: (id: string, row: TGenericObj) =>
                visitPrompt(id, row as IPromptData),
            },
            {
              type: "approve",
              onClick: approveBtn,
              requireAdminAccess: true,
              conditionalKey: "approved",
            },
            { type: "delete", onClick: deleteData },
          ],
        }}
      />
      {errAlert}
    </div>
  );
};

export default Prompt;
