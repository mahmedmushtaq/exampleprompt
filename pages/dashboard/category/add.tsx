import Category from "../../../src/components/Dashboard/Category";
import AddCategory from "../../../src/components/Dashboard/Category/AddCategory";
import { RoleTypes } from "../../../src/globals/types";
import useToProtectRoute from "../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../src/layouts/DashboardLayout";

const AddCategoryPage = () => {
  const { LoadingComponent, showPage } = useToProtectRoute({
    role: RoleTypes.admin,
  });

  return !showPage ? (
    LoadingComponent
  ) : (
    <DashboardLayout childrenCardBg heading="Add Category">
      <AddCategory />
    </DashboardLayout>
  );
};

export default AddCategoryPage;
