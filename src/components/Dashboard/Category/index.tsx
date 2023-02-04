import { useCallback, useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategories,
} from "../../../libs/firebase/db/category";
import TableWrapper from "../../shared/TableWrapper";
import { ICategoryData } from "../../../globals/types";
import useToLoadCategories from "../../../hooks/useToLoadCategories";

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

  return (
    <div>
      {loadingAlert}
      <TableWrapper
        columns={["id", "name"]}
        rows={allCategories}
        actionColumn
        actionColumnConfig={{
          actionButtons: [{ type: "delete", onClick: deleteData }],
        }}
      />
      {errAlert}
    </div>
  );
};

export default Category;
