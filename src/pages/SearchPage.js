import React, { useState, memo, useRef } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";
import {
  addSearchArticles,
  getNewSearchArticles,
  updateSearchPageId,
  updateSearchQuery,
} from "../Slices/SearchPageSlice";
import { useDispatch, useSelector } from "react-redux";
// https://newsdata.io/api/1/latest?apikey=pub_44179f13e7f1d11c54f74ef34d7f2b17b6165&q=YOUR_QUERY
const API_KEY = "pub_44179f13e7f1d11c54f74ef34d7f2b17b6165";

const SearchPage = memo(() => {
  const queryRef = useRef();
  const searchArticles = useSelector(
    (state) => state.searchPage.searchArticles
  );
  const searchPageId = useSelector((state) => state.searchPage.searchPageId);
  const searchQuery = useSelector((state) => state.searchPage.searchQuery);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //to get the results when clicked load more
  function getNextPageResults() {
    let url = `https://newsdata.io/api/1/latest?&language=en&apikey=${API_KEY}&q=${searchQuery}&page=${searchPageId}`;
    fetchData(url, "nextPage");
  }

  //to get initial search results
  function getSearchResults() {
    if (queryRef.current.value.trim() === "") {
      alert("Type something to search");
      return;
    }
    console.log(queryRef.current.value);
    dispatch(updateSearchQuery(queryRef.current.value));
    let url = `https://newsdata.io/api/1/latest?&language=en&apikey=${API_KEY}&q=${queryRef.current.value}`;
    fetchData(url, "firsttime");
  }

  async function fetchData(url, type) {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      if (response.statusText !== "OK") {
        throw new Error("soemething went wrong with searching ");
      }
      const result = response.data;
      dispatch(updateSearchPageId(result.nextPage));

      //if data fetched for  first time it updates the state of articles
      //else ,if load more clicked it add the results to the previously stored article in the state
      if (type === "firsttime") {
        dispatch(getNewSearchArticles(result.results));
      } else {
        dispatch(addSearchArticles(result.results));
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  //edge cases
  if (error) {
    return <h2>{error.message}</h2>;
  } else if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-10 dark:text-beige">
      {/* Serach Form */}
      <div className="flex justify-center my-5 text-sm sm:text-lg">
        <input
          className="w-96 mr-5 px-2 dark:text-black border focus:outline-burgundy rounded-lg"
          type="text"
          ref={queryRef}
          placeholder="Search articles"
        />
        <button
          type="submit"
          className="rounded-lg hover:text-burgundy border px-4"
          onClick={() => getSearchResults()}
        >
          Search
        </button>
      </div>

      {/* display the searched query */}
      {searchQuery && (
        <p className="text-xl" style={{ textAlign: "center" }}>
          Showing Results for {searchQuery}
        </p>
      )}

      {/* Articles */}
      <div className="mt-10 bg-beige dark:bg-dark-brown p-5 min-h-[90vh] shadow-2xl rounded-lg grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {searchArticles?.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>

      {/* Load more */}
      <div className="mt-10 w-full bg-burgundy flex justify-center py-2  ">
        {searchArticles.length > 0 && (
          <button
            className="text-dark-brown hover:text-beige border px-2 rounded-lg"
            onClick={getNextPageResults}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchPage;
