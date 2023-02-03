import DashboardLayout from "../../src/layouts/DashboardLayout";
import useToProtectRoute from "../../src/hooks/useToProtectRoute";
import Dashboard from "../../src/components/Dashboard";

const DashboardPage = () => {
  const { LoadingComponent, userData } = useToProtectRoute();

  return LoadingComponent || !userData ? (
    LoadingComponent
  ) : (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
