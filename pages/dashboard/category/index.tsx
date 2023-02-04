import Category from "../../../src/components/Dashboard/Category";
import { RoleTypes, UrlsList } from "../../../src/globals/types";
import useToProtectRoute from "../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../src/layouts/DashboardLayout";

const CategoryPage = () => {
  const { LoadingComponent, showPage } = useToProtectRoute({
    role: RoleTypes.admin,
  });

  return !showPage ? (
    LoadingComponent
  ) : (
    <DashboardLayout
      childrenCardBg
      heading="Categories"
      addRecordLink={UrlsList.addCategory}
    >
      <Category />
    </DashboardLayout>
  );
};

export default CategoryPage;
