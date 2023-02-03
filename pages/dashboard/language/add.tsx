import AddLanguage from "../../../src/components/Dashboard/Language/AddLanguage";
import useToProtectRoute from "../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../src/layouts/DashboardLayout";

const AddLanguagePage = () => {
  const { LoadingComponent, userData } = useToProtectRoute();

  return LoadingComponent || !userData ? (
    LoadingComponent
  ) : (
    <DashboardLayout childrenCardBg heading="Add Language">
      <AddLanguage />
    </DashboardLayout>
  );
};

export default AddLanguagePage;
