import EditCategory from "../../../../src/components/Dashboard/Category/EditCategory";
import { RoleTypes } from "../../../../src/globals/types";
import useToProtectRoute from "../../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../../src/layouts/DashboardLayout";

// [TOOD:- ] reactive this in future

const EditCategoryPage = () => {
  const { LoadingComponent, showPage } = useToProtectRoute({
    role: RoleTypes.admin,
  });

  return !showPage ? (
    LoadingComponent
  ) : (
    <DashboardLayout childrenCardBg heading="Edit Category">
      <EditCategory />
    </DashboardLayout>
  );
};

export default EditCategoryPage;
