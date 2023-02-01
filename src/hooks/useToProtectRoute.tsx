import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import LoadingScreen from "../components/shared/LoadingScreen";

const useToProtectRoute = () => {
  const { userData, currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && !userData) {
      window.location.href = "/registration";
    }
  }, [loading, userData]);

  return {
    userData,
    currentUser,
    LoadingComponent: loading ? <LoadingScreen /> : undefined,
  };
};

export default useToProtectRoute;
