import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchArticles: [],
  searchPageId: "",
  searchQuery: "",
};

const searchArticlesSlice = createSlice({
  name: "searchPage",
  initialState: initialState,
  reducers: {
    addSearchArticles: (state, action) => {
      console.log(action.payload);
      state.searchArticles = [...state.searchArticles, ...action.payload];
    },
    getNewSearchArticles: (state, action) => {
      console.log(action.payload);
      state.searchArticles = action.payload;
    },
    updateSearchPageId: (state, action) => {
      state.searchPageId = action.payload;
    },
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addSearchArticles,
  getNewSearchArticles,
  updateSearchPageId,
  updateSearchQuery,
} = searchArticlesSlice.actions;
export default searchArticlesSlice.reducer;
