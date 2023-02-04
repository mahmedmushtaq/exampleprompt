import DashboardLayout from "../../src/layouts/DashboardLayout";
import useToProtectRoute from "../../src/hooks/useToProtectRoute";
import Dashboard from "../../src/components/Dashboard";
import { RoleTypes } from "../../src/globals/types";

const DashboardPage = () => {
  const { LoadingComponent, showPage } = useToProtectRoute({
    role: RoleTypes.admin,
  });

  return !showPage ? (
    LoadingComponent
  ) : (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
