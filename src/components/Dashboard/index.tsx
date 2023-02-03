import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import CardAnalytics from "../shared/CardAnalytics";
import AdminFrontDashboard from "./Admin";
import { useAuth } from "../../hooks/AuthContext";

const Dashboard = () => {
  const { userData } = useAuth();

  return (
    <Box>
      <AdminFrontDashboard />
    </Box>
  );
};

export default Dashboard;
