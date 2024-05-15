import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import CategoryTabs from "./components/CategoryTabs";
import ArticleCard from "./components/ArticleCard";
import darkIcon from "./assets/9104269_night_night mode_moon_crescent_dark mode_icon.svg";
import lightIcon from "./assets/9104141_sun_bright_brightness_light mode_icon.svg";
const API_KEY = `0ab57087d92b4d4292af2bb48b47bf60`;
const API_KEY_2 = `03d9bb4ae18c4c6aa9c39114cc4ed93e`;
const country = "in"; //INDIA

function App() {
  const [data, setData] = useState({});
  const [category, setCategory] = useState("general");
  const [page, setPage] = useState(1);
  const [dark, setDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const handleLoadMore = () => {
    setPage(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(data);
      if (!data[category] || (data[category] && page === 2)) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${API_KEY_2}`
          );
          const filtered = response.data.articles.filter(
            (article) => article.urlToImage !== null
          );

          console.log(filtered);

          setData((prevData) => ({
            ...prevData,
            [category]: {
              articles:
                page === 2
                  ? [...prevData[category]?.articles, ...filtered]
                  : filtered,
              isCompleted: page === 2 ? true : false,
            },
          }));
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          setPage(1);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category, data, page]);

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
      <CategoryTabs category={category} setCategory={setCategory} />

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
      <div className="mt-10 w-full bg-burgundy flex justify-center py-2  ">
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
      </div>
    </div>
  );
}

export default App;
