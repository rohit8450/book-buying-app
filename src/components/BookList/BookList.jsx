import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BookList.module.css"; // Import module CSS

const BookList = ({ books }) => {
  const navigate = useNavigate();

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className={styles["book-list"]}>
      {" "}
      {/* Use module CSS class */}
      {books && books.length > 0 ? (
        books.map((book, index) => (
          <div
            className={styles.book}
            onClick={() => handleBookClick(book.id)}
            key={index}
          >
            <div className={styles["book-image"]}>
              <img
                src={
                  book.volumeInfo?.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/150"
                }
                alt={book.volumeInfo?.title}
                onError={(event) => {
                  event.target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
            <div className={styles["book-details"]}>
              <h2>{book.volumeInfo?.title}</h2>
              {book.volumeInfo?.authors && (
                <p>
                  Author{book.volumeInfo.authors.length > 1 ? "s" : ""}:{" "}
                  {book.volumeInfo.authors.join(", ")}
                </p>
              )}
              {book.volumeInfo?.averageRating && (
                <p>Rating: {book.volumeInfo.averageRating}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default BookList;
