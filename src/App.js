import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuspenseLoader from "./components/SuspenseLoader";

// import CategoryPage from "./pages/CategoryPage";
// import SearchPage from "./pages/SearchPage";
//!Lazy loading
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchPage = lazy(() => import("./pages//SearchPage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
