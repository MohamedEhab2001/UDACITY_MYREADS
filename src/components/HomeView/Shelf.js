import React, { useContext } from "react";
import Book from "../Book";
import propTypes from "prop-types";
import { MyBooksContext } from "../../App";
const Shelf = ({ title, shelfID }) => {
  // invoking my context
  const allBooks = useContext(MyBooksContext).myBooks;
  // filter book according to its shelf
  const books = allBooks.filter((book) => book.shelf === shelfID);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return <Book key={book.id} book={book} />;
          })}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  title: propTypes.string.isRequired,
  shelfID: propTypes.string.isRequired,
};

export default Shelf;
