import { configureStore } from "@reduxjs/toolkit";
import CategoryPageSlice from "./CategoryPageSlice";
import SearchPageSlice from "./SearchPageSlice";

const store = configureStore({
  reducer: {
    categoryPage: CategoryPageSlice,
    searchPage: SearchPageSlice,
  },
});

export default store;
