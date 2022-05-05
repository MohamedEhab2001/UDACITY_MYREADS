import React from "react";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const Home = ({ Loading }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {/* check if the request is in progress or not */}
      {Loading ? (
        <h1 style={{ textAlign: "center", margin: "15px auto" }}>
          Loading . . .
        </h1>
      ) : (
        <div className="list-books-content">
          <div>
            {/* SHELF COMPONENT */}
            <Shelf title="Currently Reading" shelfID="currentlyReading" />
            <Shelf title="Read" shelfID="read" />
            <Shelf title="Want to read" shelfID="wantToRead" />
          </div>
          <div className="open-search">
            {/* navigate to /search */}
            <Link to="search">Add a book</Link>
          </div>
        </div>
      )}
    </div>
  );
};
Home.prototype = {
  Loading: propTypes.bool.isRequired,
};
export default Home;
