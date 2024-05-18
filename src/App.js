import React, { lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import SuspenseLoader from "./components/SuspenseLoader";

// import CategoryPage from "./pages/CategoryPage";
// import SearchPage from "./pages/SearchPage";
//!Lazy loading
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchPage = lazy(() => import("./pages//SearchPage"));

const App = () => {
  const [currTab, setCurrTab] = useState("category");
  return (
    // <Router>
    //   <Suspense fallback={<SuspenseLoader />}>
    //     <Routes>
    //       <Route path="/" element={<CategoryPage />} />
    //       <Route path="/search" element={<SearchPage />} />
    //     </Routes>
    //   </Suspense>
    // </Router>
    <div>
      <CategoryPage currTab={currTab} setCurrTab={setCurrTab} />
    </div>
  );
};

export default App;
