import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import CategoryTabs from "./components/CategoryTabs";
import ArticleCard from "./components/ArticleCard";
import darkIcon from "./assets/9104269_night_night mode_moon_crescent_dark mode_icon.svg";
import lightIcon from "./assets/9104141_sun_bright_brightness_light mode_icon.svg";

//!newsdata.io
const api_key = "pub_44179f13e7f1d11c54f74ef34d7f2b17b6165";
const country = "in"; //INDIA
// `https://newsdata.io/api/1/news?apikey=${api_key}&language=en&country=${country}&category=${category}`

function App() {
  const [data, setData] = useState({});
  const [category, setCategory] = useState("top");
  const [dark, setDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const handleLoadMore = () => {
    data[category].pageNumber = data[category].pageNumber + 1;
    loadMore();
  };

  const handleCategory = (cat) => {
    setCategory(cat);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // const response = await axios.get(`http://localhost:8000/articles`);
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${api_key}&language=en&country=${country}&category=${category}`
      );
      console.log(response);
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

  console.log(data);

  return (
    <div className="App  p-10 bg-beige dark:bg-dark-brown dark:text-beige">
      {/* dark light mode */}
      <div
        onClick={darkModeHandler}
        className={`w-6 md:w-8 absolute right-5 top-5`}
      >
        {dark ? (
          <img src={lightIcon} alt="icon" className="dark:text-beige" />
        ) : (
          <img src={darkIcon} alt="icon" />
        )}
      </div>

      <div className="text-4xl sm:text-6xl md:text-8xl text-center">
        India Times
      </div>

      {/* <div className="text-4xl">Latest News</div> */}
      <CategoryTabs category={category} handleCategory={handleCategory} />

      {/*! Articles */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-10 min-h-[90vh] shadow-2xl rounded-xl dark:bg-slate-700 grid sm:grid-cols-2 lg:grid-cols-12 gap-1">
          {data[category]?.articles.map((article, index) => (
            <ArticleCard
              key={index}
              index={index}
              article={article}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}

      {/* Load more button */}
      {/* <div className="mt-10 w-full bg-burgundy flex justify-center py-2  ">
        {!data[category]?.isCompleted ? (
          <button
            className="hover:text-beige border px-2 rounded-full"
            onClick={handleLoadMore}
          >
            Load More Articles
          </button>
        ) : (
          <p className="p-2">
            You have reached the end of the available {category} articles for
            now. Please check back after a while for new content
          </p>
        )}
      </div> */}

      <div className="mt-10 w-full bg-burgundy flex justify-center py-2  ">
        <button
          className="hover:text-beige border px-2 rounded-full"
          onClick={handleLoadMore}
        >
          Load More Articles
        </button>
      </div>
    </div>
  );
}

export default App;
