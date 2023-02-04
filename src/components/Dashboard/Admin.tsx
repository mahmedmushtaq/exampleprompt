import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import CardAnalytics from "../shared/CardAnalytics";

const AdminFrontDashboard = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid xs={12} sm={6} md={4} lg={3}>
        <CardAnalytics title="Add New Prompt" link="/dashboard/language" />
      </Grid>
    </Grid>
  );
};

export default AdminFrontDashboard;
