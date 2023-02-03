import { useCallback, useEffect, useState } from "react";
import useDataFetchingUtils from "../../../hooks/useDataFetchingUtils";
import {
  deleteLanguage,
  getAllLanguages,
} from "../../../libs/firebase/db/language";
import { ILanguageData } from "../../../globals/types";
import TableWrapper from "../../shared/TableWrapper";

const Prompt = () => {
  const [allLanguages, setAllLanguages] = useState<ILanguageData[]>([]);
  const { errAlert, setErr, loadingAlert, trackApiCall, setIsLoading } =
    useDataFetchingUtils();

  const loadAllLanguages = useCallback(async () => {
    trackApiCall();
    try {
    } catch (err) {
      setErr(String(err));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadAllLanguages();
  }, [loadAllLanguages]);

  const deleteData = async (id: string) => {
    trackApiCall();
    try {
      await deleteLanguage(id);
      const remainingLang = allLanguages.filter((lang) => lang.id !== id);
      setAllLanguages(remainingLang);
    } catch (err) {
      setErr(String(err));
    }
    setIsLoading(false);
  };

  return (
    <div>
      {loadingAlert}
      <TableWrapper
        columns={["id", "name"]}
        rows={allLanguages}
        actionColumn
        onClickDeleteButton={deleteData}
      />
      {errAlert}
    </div>
  );
};

export default Prompt;
