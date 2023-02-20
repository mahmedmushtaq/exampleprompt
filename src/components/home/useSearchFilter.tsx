import { SelectChangeEvent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IPromptData, TGenericObj } from "../../globals/types";
import _debounce from "lodash/debounce";
import FilterFunctions from "./FilterFunctions";
import { removeUndefinedKeyFromObj } from "../../globals/helpers";

interface IProps {
  prompts: IPromptData[];
}

const useSearchFilter = ({ prompts }: IProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedLang, setSelectedLang] = useState<string | undefined>(
    undefined
  );
  const [filteredPrompts, setFilteredPrompts] =
    useState<IPromptData[]>(prompts);
  const [showResetFilter, setShowResetFilter] = useState(false);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const router = useRouter();
  const { query } = router;

  const routerPush = useCallback(
    (obj: TGenericObj) => {
      let queryObj = {
        ...query,
        ...obj,
      };
      if (obj.reset) {
        queryObj = {};
      }
      router.push(
        {
          pathname: "/",
          query: {
            ...queryObj,
          },
        },
        undefined,
        { shallow: true }
      );
    },
    [query]
  );

  const headingSearchFilter = (val: string) => {
    routerPush({ search: val });
  };

  const debounceSearch = useCallback(_debounce(headingSearchFilter, 1000), [
    query,
  ]);

  const onChangeCategorySelect = (val: string) => {
    routerPush({ category: val });
  };

  const onChangeLanguageSelect = (e: SelectChangeEvent<any>) => {
    routerPush({ lang: e.target.value });
  };

  const resetState = () => {
    setShowResetFilter(false);
    setSelectedCategory(undefined);
    setSelectedLang(undefined);
    setFilteredPrompts(prompts);
    setSearch("");
  };

  useEffect(() => {
    const { category, lang, search } = query;

    // no filtered is applied return all prompts
    if (!lang && !category && !search) {
      resetState();
      return;
    }

    const filterFunction = new FilterFunctions(prompts);

    let remainingPrompts: IPromptData[] = [];
    let categoryValue = category ? String(category) : "";

    let langValue = lang ? String(lang) : "";
    let searchValue = search ? String(search) : "";
    // category and lang filter is applied
    if (category && lang && search) {
      remainingPrompts = filterFunction.applyCategoryLangAndSearchFilter({
        search: searchValue,
        category: categoryValue,
        lang: langValue,
      });
    } else if (category && lang) {
      remainingPrompts = filterFunction.applyCategoryAndLangFilter({
        category: categoryValue,
        lang: langValue,
      });
    } else if (category && search) {
      remainingPrompts = filterFunction.applyCategoryAndSearchFilter({
        category: categoryValue,
        search: searchValue,
      });
    } else if (search && lang) {
      remainingPrompts = filterFunction.applyLangAndSearchFilter({
        lang: langValue,
        search: searchValue,
      });
    } else if (category) {
      remainingPrompts = filterFunction.applyOnlyCategoryFilter(categoryValue);
    } else if (lang) {
      // select only those prompt which contains specific  lang
      remainingPrompts = filterFunction.applyOnlyLangFilter(langValue);
    } else if (search) {
      remainingPrompts = filterFunction.applyOnlySearchFilter(searchValue);
    }

    setShowResetFilter(true);
    setSelectedCategory(categoryValue);
    setSelectedLang(langValue);
    setSearch(searchValue);
    setFilteredPrompts(remainingPrompts);
  }, [query]);

  const resetFilterComponent = showResetFilter && (
    <Typography
      my={1}
      onClick={() => {
        routerPush({ reset: true });
      }}
    >
      Reset Filter
    </Typography>
  );

  return {
    onChangeCategorySelect,
    onChangeLanguageSelect,
    debounceSearch,
    resetFilterComponent,
    showResetFilter,
    selectedLang,
    selectedCategory,
    filteredPrompts,
    search,
    setSearch,
  };
};

export default useSearchFilter;
