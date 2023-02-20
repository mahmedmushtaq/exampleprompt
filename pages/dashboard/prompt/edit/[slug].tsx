import AddPrompt from "../../../../src/components/Dashboard/prompt/AddPrompt";
import EditPrompt from "../../../../src/components/Dashboard/prompt/EditPrompt";
import useToProtectRoute from "../../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../../src/layouts/DashboardLayout";

const EditPromptPage = () => {
  const { LoadingComponent, showPage } = useToProtectRoute({});

  return !showPage ? (
    LoadingComponent
  ) : (
    <DashboardLayout childrenCardBg heading="Add Prompt">
      <EditPrompt />
    </DashboardLayout>
  );
};

export default EditPromptPage;
