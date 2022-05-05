import React, { useContext } from "react";
import Book from "../Book";
import propTypes from "prop-types";
import { MyBooksContext } from "../../App";
const SearchBooks = ({ books }) => {
  // invokes my context
  const myBooks = useContext(MyBooksContext).myBooks;
  // the book object that i got from the SEARCH API ha no shelf attribute so i add one for it by this method
  const newBookArray = books.map((book) => {
    const withShelf = myBooks.filter((bk) => bk.id === book.id);
    return withShelf.length > 0 ? withShelf[0] : book;
  });
  return (
    <ol className="books-grid">
      {newBookArray.map((book) => {
        //  BOOK COMPONENT
        return <Book key={book.id} book={book} />;
      })}
    </ol>
  );
};

SearchBooks.prototype = {
  books: propTypes.array.isRequired,
};

export default SearchBooks;
