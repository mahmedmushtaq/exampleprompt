import { deleteCategory } from "../../../libs/firebase/db/category";
import TableWrapper from "../../shared/TableWrapper";
import useToLoadCategories from "../../../hooks/useToLoadCategories";
import { useRouter } from "next/router";
import { UrlsList } from "../../../globals/types";

const Category = () => {
  const {
    allCategories,
    loadingAlert,
    errAlert,
    setAllCategories,
    trackApiCall,
    setIsLoading,
    setErr,
  } = useToLoadCategories();

  const router = useRouter();

  const deleteData = async (id: string) => {
    trackApiCall();
    try {
      await deleteCategory(id);
      const remainingCategories = allCategories.filter(
        (item) => item.id !== id
      );
      setAllCategories(remainingCategories);
    } catch (err) {
      setErr(String(err));
    }
    setIsLoading(false);
  };

  const onClickEditBtn = (id: string) => {
    router.push(UrlsList.editCategory + "/" + id);
  };

  return (
    <div>
      {loadingAlert}
      <TableWrapper
        columns={["id", "name"]}
        rows={allCategories}
        actionColumn
        showIndex
        actionColumnConfig={{
          actionButtons: [
            { type: "delete", onClick: deleteData },
            { type: "edit", onClick: onClickEditBtn },
          ],
        }}
      />
      {errAlert}
    </div>
  );
};

export default Category;
