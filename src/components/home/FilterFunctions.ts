import { IPromptData } from "../../globals/types";

class FilterFunctions {
  constructor(private _promptsData: IPromptData[]) {}

  applyCategoryLangAndSearchFilter({
    search,
    category,
    lang,
  }: {
    search: string;
    category: string;
    lang: string;
  }) {
    return this._promptsData.filter((prompt) => {
      const searchCategory = prompt.categories.find(
        (categoryItem) => categoryItem.name === category
      );
      if (!searchCategory) return false;

      return (
        prompt.langSymbol === lang &&
        (prompt.heading.includes(search) || prompt.text.includes(search))
      );
    });
  }

  applyCategoryAndLangFilter({
    category,
    lang,
  }: {
    category: string;
    lang: string;
  }) {
    return this._promptsData.filter((prompt) => {
      const searchCategory = prompt.categories.find(
        (categoryItem) => categoryItem.name === category
      );
      if (!searchCategory) return false;

      return prompt.langSymbol === lang;
    });
  }

  applyCategoryAndSearchFilter({
    category,
    search,
  }: {
    search: string;
    category: string;
  }) {
    return this._promptsData.filter((prompt) => {
      const searchCategory = prompt.categories.find(
        (categoryItem) => categoryItem.name === category
      );
      if (!searchCategory) return false;

      return prompt.heading.includes(search) || prompt.text.includes(search);
    });
  }

  applyLangAndSearchFilter({ search, lang }: { search: string; lang: string }) {
    return this._promptsData.filter(
      (prompt) =>
        prompt.langSymbol === lang &&
        (prompt.heading.includes(search) || prompt.text.includes(search))
    );
  }

  applyOnlyCategoryFilter(category: string) {
    return this._promptsData.filter((prompt) => {
      const searchCategory = prompt.categories.find(
        (categoryItem) => categoryItem.name === String(category)
      );
      return !!searchCategory;
    });
  }

  applyOnlyLangFilter(lang: string) {
    return this._promptsData.filter(
      (prompt) => prompt.langSymbol === String(lang)
    );
  }

  applyOnlySearchFilter(search: string) {
    return this._promptsData.filter(
      (prompt) =>
        prompt.heading.includes(search) || prompt.text.includes(search)
    );
  }
}

export default FilterFunctions;
