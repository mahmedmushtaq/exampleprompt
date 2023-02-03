import Category from "../../../src/components/Dashboard/Category";
import AddCategory from "../../../src/components/Dashboard/Category/AddCategory";
import useToProtectRoute from "../../../src/hooks/useToProtectRoute";
import DashboardLayout from "../../../src/layouts/DashboardLayout";

const AddCategoryPage = () => {
  const { LoadingComponent, userData } = useToProtectRoute();

  return LoadingComponent || !userData ? (
    LoadingComponent
  ) : (
    <DashboardLayout childrenCardBg heading="Add Category">
      <AddCategory />
    </DashboardLayout>
  );
};

export default AddCategoryPage;
