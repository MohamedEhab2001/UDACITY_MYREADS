import React, { useContext } from "react";
import { MyBooksContext } from "../App";
import propTypes from "prop-types";
import * as BooksAPI from "./../BooksAPI";
const Menu = ({ title, options, book }) => {
  // invokes the set function from my context to give this component the ability of re-render the HOME component
  const getBooks = useContext(MyBooksContext).getBooks;
  // update the book shelf with the value that user select
  const UpdateBookShelf = async (value) => {
    await BooksAPI.update(book, value);
  };
  // this function get invoked when user change the book shelf
  const onHandleChange = async (e) => {
    await UpdateBookShelf(e.target.value);
    // after update the book re-render HOME component
    getBooks();
  };
  return (
    <select onChange={onHandleChange} defaultValue={book.shelf}>
      <option value="none" disabled>
        {title}
      </option>
      {options.map((option) => {
        return (
          <option key={option.id} value={option["value"]}>
            {option["text"]}
          </option>
        );
      })}
    </select>
  );
};
Menu.propTypes = {
  title: propTypes.string.isRequired,
  options: propTypes.object.isRequired,
  book: propTypes.object.isRequired,
};
export default Menu;
