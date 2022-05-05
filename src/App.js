import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import Home from "./components/HomeView/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/SearchView/Search";
import * as BooksAPI from "./BooksAPI";

// creating a context to provide a glopal state that can be accessed from any component in the application
export const MyBooksContext = createContext();
function App() {
  // state that handels the books in my shelves
  const [myBooks, setMyBooks] = useState([]);
  // state to let the user know that his request is in progress
  const [Loading, setLoading] = useState(false);

  // function that send a request to the server to get my books and update the state
  const getMyBooks = async () => {
    setLoading(true);
    const res = await BooksAPI.getAll();
    setMyBooks(res);
    setLoading(false);
  };
  // i put the function i useEffect so that with every render the books shlef updated
  useEffect(() => {
    getMyBooks();
  }, []);
  return (
    <BrowserRouter>
      {/* here i wrapped my whole application with my CONTEXT */}
      <MyBooksContext.Provider
        value={{
          myBooks,
          getBooks: () => {
            getMyBooks();
          },
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home Loading={Loading} />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </MyBooksContext.Provider>
    </BrowserRouter>
  );
}

export default App;
