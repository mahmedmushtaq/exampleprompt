import Prompt from "../../../src/components/Dashboard/prompt";
import { UrlsList } from "../../../src/globals/types";
import useToProtectRoute from "../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../src/layouts/DashboardLayout";

const PromptPage = () => {
  const { LoadingComponent, userData } = useToProtectRoute();

  return LoadingComponent || !userData ? (
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
