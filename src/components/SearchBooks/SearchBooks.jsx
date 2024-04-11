import React, { useState, useEffect } from "react";
import axios from "axios";
import BookList from "../BookList/BookList";
import styles from "./SearchBooks.module.css"; // Import module CSS

const SearchBooks = () => {
  const [letter, setLetter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://d1krvzwx5oquy1.cloudfront.net/books.json"
      );
      const filteredBooks = response.data.filter(
        (book) =>
          letter === "" ||
          book.volumeInfo.authors.some((author) =>
            author.toLowerCase().startsWith(letter.toLowerCase())
          )
      );
      setSearchResults(filteredBooks);
      setLoading(false);
    } catch (error) {
      setError("Error fetching search results");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Perform initial search when component mounts
    handleSearch();
  }, [letter]);

  return (
    <div className={styles["search-container"]}>
      {" "}
      {/* Use module CSS class */}
      <h2>Search Books</h2>
      <div className={styles["search-form"]}>
        {" "}
        {/* Use module CSS class */}
        <input
          type="text"
          placeholder="Enter starting letter"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}{" "}
      {/* Use module CSS class */}
      <BookList books={searchResults} />
    </div>
  );
};

export default SearchBooks;
