import Language from "../../../src/components/Dashboard/Language";
import { RoleTypes, UrlsList } from "../../../src/globals/types";
import useToProtectRoute from "../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../src/layouts/DashboardLayout";

const LanguagePage = () => {
  const { LoadingComponent, showPage } = useToProtectRoute({
    role: RoleTypes.admin,
  });

  return !showPage ? (
    LoadingComponent
  ) : (
    <DashboardLayout
      childrenCardBg
      heading="Languages"
      addRecordLink={UrlsList.addLanguage}
    >
      <Language />
    </DashboardLayout>
  );
};

export default LanguagePage;
