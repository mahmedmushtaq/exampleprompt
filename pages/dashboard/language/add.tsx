import AddLanguage from "../../../src/components/Dashboard/Language/AddLanguage";
import { RoleTypes } from "../../../src/globals/types";
import useToProtectRoute from "../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../src/layouts/DashboardLayout";

const AddLanguagePage = () => {
  const { LoadingComponent, showPage } = useToProtectRoute({
    role: RoleTypes.admin,
  });

  return !showPage ? (
    LoadingComponent
  ) : (
    <DashboardLayout childrenCardBg heading="Add Language">
      <AddLanguage />
    </DashboardLayout>
  );
};

export default AddLanguagePage;
