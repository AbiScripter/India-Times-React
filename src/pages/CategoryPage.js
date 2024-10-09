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
  const [activeCategory, setActiveCategory] = useState("top");

  // Initially, we fetch articles for a category without a pageId, since it's the first time fetching for that category.
  // Once articles are fetched, we get a nextPageId for pagination.
  // When the user clicks 'Load More,' we use that nextPageId to fetch the subsequent set of articles for the same category.

  async function fetchArticles(url) {
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
      dispatch(updateCategoryPageId(result.nextPage)); //result.nextPage holds the id for the next page
      dispatch(
        addCategoryArticles({
          category: activeCategory,
          fetchedArticles: result.results, //result.results hold articles data
        })
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLoadMore() {
    let url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&category=${activeCategory}&page=${categoryPageId}&country=in`;
    fetchArticles(url); //passing the url with pageId coz that category already have articles(fetched when we switch between category...useEffect block takes care of that)
  }

  function handleCategory(cat) {
    setActiveCategory(cat);
  }

  useEffect(() => {
    //when switching between categories,if articles in that category already exists dont fetch (this reduces unnecessary fetch calls)
    //only fetch in that category if user clicks load more (which is handled by handleMore function)
    if (categoryArticles[activeCategory].length === 0) {
      let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=en&category=${activeCategory}&country=in`;
      fetchArticles(url); //intial fetch for that category when that category not fetched before(passing the url without pageId)
    }
  }, [activeCategory]);

  //boundary cases
  if (error) {
    return <h2>{error.message}</h2>;
  } else if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-5 dark:text-beige">
      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        handleCategory={handleCategory}
      />

      {/* Article Cards */}
      <div className="mt-10 bg-beige dark:bg-dark-brown p-5 min-h-[90vh] shadow-2xl rounded-lg grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {categoryArticles[activeCategory]?.map((article, index) => (
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
