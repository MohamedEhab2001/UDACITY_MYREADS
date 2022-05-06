import React, { useContext } from "react";
import Menu from "./Menu";
import propTypes from "prop-types";
import { MyBooksContext } from "../App";
const Book = ({ book }) => {
  // invokes my context
  const myBooks = useContext(MyBooksContext).myBooks;
  // check if this book is in my shelves or not
  const isUsed = myBooks.filter((Fbook) => Fbook.id === book.id);
  // initialize Menue options
  const MenueOption1 = [
    {
      id: 1,
      value: "currentlyReading",
      text: "Currently reading",
    },
    {
      id: 2,
      value: "wantToRead",
      text: "Want to Read",
    },
    {
      id: 3,
      value: "read",
      text: "Read",
    },
    {
      id: 4,
      value: "None",
      text: "None",
    },
  ];
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks?.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            {/* MENU COMPONENT and in title prop i check if this book in my shelves or not because MENU TITLE depend on this condition */}
            <Menu
              title={Boolean(isUsed.length) ? "Move to ..." : "Add to ..."}
              options={MenueOption1}
              book={book}
            />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {/* some books does not have author property */}
          {book.authors ? book.authors.join(",") : "Unknown"}
        </div>
      </div>
    </li>
  );
};
Book.prototype = {
  book: propTypes.object.isRequired,
};
export default Book;
