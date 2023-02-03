import { Alert } from "@mui/material";
import { useState } from "react";

const useDataFetchingUtils = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const trackApiCall = () => {
    setIsLoading(true);
    setErr("");
  };

  return {
    trackApiCall,
    setIsLoading,
    isLoading,
    setErr,
    loadingAlert: isLoading && <Alert severity="info">Please wait</Alert>,
    errAlert: !!err && <Alert severity="error">{err}</Alert>,
  };
};

export default useDataFetchingUtils;
