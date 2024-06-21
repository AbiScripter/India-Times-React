import axios from "axios";
import { memo, useEffect, useState } from "react";
import Loader from "../components/Loader";
import CategoryTabs from "../components/CategoryTabs";
import ArticleCard from "../components/ArticleCard";
import {
  addCategoryArticles,
  updateCategoryPageId,
} from "../Slices/CategoryPageSlice";
import { useDispatch, useSelector } from "react-redux";
const API_KEY = "pub_44179f13e7f1d11c54f74ef34d7f2b17b6165";

//!newsdata.io
// `https://newsdata.io/api/1/news?apikey=${api_key}&language=en&country=${country}&category=${category}`;

const CategoryPage = memo(() => {
  const categoryArticles = useSelector(
    (state) => state.categoryPage.categoryArticles
  );
  const categoryPageId = useSelector(
    (state) => state.categoryPage.categoryPageId
  );

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("top");

  //function to fetcharticles, if it fetches for the first time we put pageid as 1 else put the pageid
  //this is done to change the url
  async function fetchArticles(pageId = 1) {
    let url;
    if (pageId === 1) {
      url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=en&category=${category}&country=in`;
    } else {
      url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&category=${category}&page=${pageId}&country=in`;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(url);
      console.log(response);
      if (response.statusText !== "OK") {
        throw new Error("soemething went wrong with searching ");
      }
      const result = response.data;
      console.log(result);
      //updating the ids and articles to the store
      dispatch(updateCategoryPageId(result.nextPage));
      dispatch(
        addCategoryArticles({ category: category, payload: result.results })
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLoadMore() {
    fetchArticles(categoryPageId);
  }

  function handleCategory(cat) {
    setCategory(cat);
  }

  useEffect(() => {
    //if articles in that category already exists dont fetch when category changes
    if (categoryArticles[category].length === 0) {
      fetchArticles();
    }
  }, [category]);

  //boundary cases
  if (error) {
    return <h2>{error.message}</h2>;
  } else if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-5 dark:text-beige">
      {/* Category Tabs */}
      <CategoryTabs category={category} handleCategory={handleCategory} />

      {/* Article Cards */}
      <div className="mt-10 bg-beige dark:bg-dark-brown p-5 min-h-[90vh] shadow-2xl rounded-lg grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {categoryArticles[category]?.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>

      {/* Load more */}
      <div className="mt-10 w-full bg-burgundy flex justify-center py-2 rounded-lg">
        <button
          className="text-dark-brown hover:text-beige border px-2 rounded-lg"
          onClick={handleLoadMore}
        >
          Load More Articles
        </button>
      </div>
    </div>
  );
});

export default CategoryPage;
