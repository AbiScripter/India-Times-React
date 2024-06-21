import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuspenseLoader from "./components/SuspenseLoader";
import Layout from "./pages/Layout";

// import CategoryPage from "./pages/CategoryPage";
// import SearchPage from "./pages/SearchPage";
//!Lazy loading
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchPage = lazy(() => import("./pages//SearchPage"));

const App = () => {
  return (
    <div className=" bg-beige dark:bg-dark-brown">
      <Router>
        <Suspense fallback={<SuspenseLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
