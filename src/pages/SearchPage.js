import React, { useState, memo } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
// https://newsdata.io/api/1/latest?apikey=pub_44179f13e7f1d11c54f74ef34d7f2b17b6165&q=YOUR_QUERY
const api_key = "pub_44179f13e7f1d11c54f74ef34d7f2b17b6165";

const SearchPage = memo(({ currTab, setCurrTab }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [nextPageId, setNextPageId] = useState("");
  const handleSearch = async () => {
    setCurrTab("search");
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://newsdata.io/api/1/latest?apikey=${api_key}&language=en&q=${query}`
      );
      console.log(response);
      const filtered = response.data.results.filter(
        (article) => article.image_url !== null
      );
      setNextPageId(response.data.nextPage);
      setSearchData(filtered);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(nextPageId);

  //!to load more articles
  const loadMore = async () => {
    try {
      console.log("ommala");
      setIsLoading(true);
      const response = await axios.get(
        `https://newsdata.io/api/1/latest?apikey=${api_key}&language=en&q=${query}&page=${nextPageId}`
      );

      console.log(response);
      const filtered = response.data.results.filter(
        (article) => article.image_url !== null
      );

      // console.log(filtered);

      setSearchData((prevData) => [...prevData, ...filtered]);
      setNextPageId(response.data.nextPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(searchData);
  return (
    <div>
      {/* <Navbar /> */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {currTab === "search" && searchData.length > 0 && (
        <>
          <div className="mt-10 min-h-[90vh] shadow-2xl rounded-xl dark:bg-slate-700 grid sm:grid-cols-2 lg:grid-cols-12 gap-1">
            {searchData.map((article, index) => (
              <ArticleCard key={index} index={index} article={article} />
            ))}
          </div>
          <div className="mt-10 w-full bg-burgundy flex justify-center py-2  ">
            <button
              className="hover:text-beige border px-2 rounded-full"
              onClick={loadMore}
            >
              Load More Articles
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default SearchPage;
