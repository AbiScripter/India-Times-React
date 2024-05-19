import axios from "axios";
import { memo, useEffect, useState } from "react";
import Loader from "../components/Loader";
import CategoryTabs from "../components/CategoryTabs";
import ArticleCard from "../components/ArticleCard";
import Navbar from "../components/Navbar";
import SearchPage from "./SearchPage";

//!newsdata.io
const api_key = "pub_44179f13e7f1d11c54f74ef34d7f2b17b6165";
const country = "in"; //INDIA
// `https://newsdata.io/api/1/news?apikey=${api_key}&language=en&country=${country}&category=${category}`;

const CategoryPage = memo(() => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("top");

  const handleLoadMore = () => {
    console.log("ommala dei");
    // data[category].pageNumber = data[category].pageNumber + 1;
    loadMore();
  };

  const handleCategory = (cat) => {
    setCategory(cat);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${api_key}&language=en&country=${country}&category=${category}`
      );
      const filtered = response.data.results.filter(
        (article) => article.image_url !== null
      );

      // console.log(filtered);

      setData((prevData) => ({
        ...prevData,
        [category]: {
          articles: filtered,
          nextPageId: response.data.nextPage,
        },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //!fetch data when category changes
  useEffect(() => {
    //if data in that category already exists don't fetch, use the previous data store in data state
    if (!data[category]) {
      fetchData();
    }
  }, [category]);

  //!to load more articles
  const loadMore = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${api_key}&language=en&country=${country}&category=${category}&page=${`${data[category]?.nextPageId}`}`
      );
      console.log(response);
      const filtered = response.data.results.filter(
        (article) => article.image_url !== null
      );

      // console.log(filtered);

      setData((prevData) => ({
        ...prevData,
        [category]: {
          articles: [...prevData[category]?.articles, ...filtered],
          nextPageId: response.data.nextPage,
        },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //
  console.log(data);

  return (
    <div className="p-10 bg-beige dark:bg-dark-brown dark:text-beige">
      <Navbar />

      <div className="text-4xl sm:text-6xl md:text-8xl text-center">
        India Times
      </div>

      {/* <div className="text-4xl">Latest News</div> */}
      <CategoryTabs category={category} handleCategory={handleCategory} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-10 min-h-[90vh] shadow-2xl rounded-xl dark:bg-slate-700 grid sm:grid-cols-2 lg:grid-cols-12 gap-1">
            {data[category]?.articles.map((article, index) => (
              <ArticleCard key={index} index={index} article={article} />
            ))}
          </div>

          <div className="mt-10 w-full bg-burgundy flex justify-center py-2  ">
            <button
              className="hover:text-beige border px-2 rounded-full"
              onClick={handleLoadMore}
            >
              Load More Articles
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default CategoryPage;
