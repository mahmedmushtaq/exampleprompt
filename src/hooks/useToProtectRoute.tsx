import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import LoadingScreen from "../components/shared/LoadingScreen";
import { RoleTypes, UrlsList } from "../globals/types";

const useToProtectRoute = ({ role }: { role?: RoleTypes }) => {
  const { userData, currentUser, loading } = useAuth();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (!loading && !userData) {
      window.location.href = "/registration";
      return;
    }
    // if (role && userData?.role !== role) {
    //   window.location.href = UrlsList.promptDashboard;
    //   return;
    // }
    if (userData && !loading) {
      setShowPage(true);
    }
  }, [loading, userData]);

  return {
    showPage,
    currentUser,
    LoadingComponent: loading ? <LoadingScreen /> : undefined,
  };
};

export default useToProtectRoute;
