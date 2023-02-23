import { useCallback, useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategories,
} from "../../../libs/firebase/db/category";
import TableWrapper from "../../shared/TableWrapper";
import { ICategoryData, UrlsList } from "../../../globals/types";
import useToLoadCategories from "../../../hooks/useToLoadCategories";
import { useRouter } from "next/router";

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

  // [TODO:- ] reactive this in future
  // const onClickEditBtn = (id: string) => {
  //   router.push(UrlsList.editCategory + "/" + id);
  // };

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
