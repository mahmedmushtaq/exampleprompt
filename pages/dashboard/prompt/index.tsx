import Prompt from "../../../src/components/Dashboard/Prompt";
import { UrlsList } from "../../../src/globals/types";
import useToProtectRoute from "../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../src/layouts/DashboardLayout";

const PromptPage = () => {
  const { LoadingComponent, showPage } = useToProtectRoute({});

  return !showPage ? (
    LoadingComponent
  ) : (
    <DashboardLayout
      childrenCardBg
      heading="Prompts"
      addRecordLink={UrlsList.addPrompt}
    >
      <Prompt />
    </DashboardLayout>
  );
};

export default PromptPage;
