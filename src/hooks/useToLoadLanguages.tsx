import { useCallback, useEffect, useState } from "react";
import { ILanguageData } from "../globals/types";
import useDataFetchingUtils from "./useDataFetchingUtils";
import { getAllLanguages } from "../libs/firebase/db/language";

const useToLoadLanguages = () => {
  const [allLanguages, setAllLanguages] = useState<ILanguageData[]>([]);
  const { errAlert, setErr, loadingAlert, trackApiCall, setIsLoading } =
    useDataFetchingUtils();

  const loadAllLanguages = useCallback(async () => {
    trackApiCall();
    try {
      const allLanguages = await getAllLanguages();
      setAllLanguages(allLanguages);
    } catch (err) {
      setErr(String(err));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadAllLanguages();
  }, [loadAllLanguages]);

  return {
    allLanguages,
    setAllLanguages,
    errAlert,
    setErr,
    loadingAlert,
    trackApiCall,
    setIsLoading,
  };
};

export default useToLoadLanguages;
