import AddPrompt from "../../../src/components/Dashboard/prompt/AddPrompt";
import useToProtectRoute from "../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../src/layouts/DashboardLayout";

const AddPromptPage = () => {
  const { LoadingComponent, userData } = useToProtectRoute();

  return LoadingComponent || !userData ? (
    LoadingComponent
  ) : (
    <DashboardLayout childrenCardBg heading="Add Prompt">
      <AddPrompt />
    </DashboardLayout>
  );
};

export default AddPromptPage;
