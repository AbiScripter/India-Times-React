import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryArticles: {
    top: [],
    world: [],
    business: [],
    politics: [],
    technology: [],
    entertainment: [],
    sports: [],
    science: [],
    health: [],
  },
  categoryPageId: "",
};

const CategoryPage = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    addCategoryArticles: (state, action) => {
      const { category, fetchedArticles } = action.payload;
      state.categoryArticles[category] = [
        ...state.categoryArticles[category],
        ...fetchedArticles,
      ];
    },
    updateCategoryPageId: (state, action) => {
      state.categoryPageId = action.payload;
    },
  },
});

export const { addCategoryArticles, updateCategoryPageId } =
  CategoryPage.actions;
export default CategoryPage.reducer;
