import { useCallback, useEffect, useState } from "react";
import { ICategoryData } from "../globals/types";
import useDataFetchingUtils from "./useDataFetchingUtils";
import { getAllCategories } from "../libs/firebase/db/category";

const useToLoadCategories = () => {
  const [allCategories, setAllCategories] = useState<ICategoryData[]>([]);
  const {
    errAlert,
    setErr,
    isLoading,
    loadingAlert,
    trackApiCall,
    setIsLoading,
  } = useDataFetchingUtils();
  const loadAllCategories = useCallback(async () => {
    trackApiCall();
    try {
      const allCategories = await getAllCategories();
      setAllCategories(allCategories);
    } catch (err) {
      setErr(String(err));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadAllCategories();
  }, [loadAllCategories]);

  return {
    trackApiCall,
    loadAllCategories,
    setIsLoading,
    setErr,
    setAllCategories,
    allCategories,
    loadingAlert,
    isLoading,
    errAlert,
  };
};

export default useToLoadCategories;
