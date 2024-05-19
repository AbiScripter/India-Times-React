import React, { useState, memo, useEffect, useCallback } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
// https://newsdata.io/api/1/latest?apikey=pub_44179f13e7f1d11c54f74ef34d7f2b17b6165&q=YOUR_QUERY
const api_key = "pub_44179f13e7f1d11c54f74ef34d7f2b17b6165";

const SearchPage = memo(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [nextPageId, setNextPageId] = useState("");

  //!debounce fetching
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const fetchSearchResults = async (term) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://newsdata.io/api/1/latest?apikey=${api_key}&language=en&q=${term}`
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

  const debouncedFetch = useCallback(debounce(fetchSearchResults, 1000), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedFetch(searchTerm);
    }
  }, [searchTerm, debouncedFetch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
    <div className="p-10 bg-beige dark:bg-dark-brown dark:text-beige">
      <Navbar />
      <div className="text-4xl sm:text-6xl md:text-8xl text-center">
        India Times
      </div>

      <form className="flex justify-center my-5 text-sm sm:text-lg">
        <input
          className="w-96 mr-5 px-2  focus:outline-burgundy"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search Articles"
        />
      </form>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-10 min-h-[90vh] shadow-2xl rounded-xl dark:bg-slate-700 grid sm:grid-cols-2 lg:grid-cols-12 gap-1">
            {searchData?.map((article, index) => (
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
