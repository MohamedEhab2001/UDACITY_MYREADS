import React, { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import SearchBooks from "./SearchBooks";
// controlled component
const Search = () => {
  // state that holds my search quety
  const [query, setQuery] = useState("");
  // state that holds books returned from the API
  const [books, setBooks] = useState([]);
  // using a callbackHook so that my async function does need to reintialize with every render #### that a soultion for react warning
  const searchBooksAPI = useCallback(async () => {
    if (query !== "") {
      const res = await BooksAPI.search(query);
      // handle API errors
      if (!res.error) {
        setBooks(res);
      } else {
        setBooks([]);
      }
    }
  }, [query]);
  // Function that handels the change
  const onHandleChange = (e) => {
    setQuery(e.target.value);
  };
  // Debounce the onHandleChange function to improve the performance and minimize the API requests
  const debouncedResults = useMemo(() => {
    return debounce(onHandleChange, 500);
  }, []);
  // with every letter or any change in the search input i requsting the server
  useEffect(() => {
    console.log("a time");
    searchBooksAPI();
    if (query === "") {
      setBooks([]);
    }
    return () => {
      // clean up any side effects from debounce
      debouncedResults.cancel();
    };
  }, [searchBooksAPI, debouncedResults, query]);
  return (
    <div className="search-books">
      <div className="search-books-bar">
        {/* navigate to home */}
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={debouncedResults}
          />
        </div>
      </div>
      <div className="search-books-results">
        {/* check if there is books or not */}
        {books.length > 0 && query !== "" ? (
          // SEARCHBOOK COMPONENT
          <SearchBooks books={books.length > 0 ? books : []} />
        ) : (
          <h1 style={{ textAlign: "center", margin: "20px auto" }}>
            No books found
          </h1>
        )}
      </div>
    </div>
  );
};

export default Search;
