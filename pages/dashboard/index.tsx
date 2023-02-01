import DashboardLayout from "../../src/layouts/DashboardLayout";
import useToProtectRoute from "../../src/hooks/useToProtectRoute";

const Dashboard = () => {
  const { LoadingComponent, userData } = useToProtectRoute();

  return LoadingComponent || !userData ? (
    LoadingComponent
  ) : (
    <DashboardLayout>Dashboard</DashboardLayout>
  );
};

export default Dashboard;
