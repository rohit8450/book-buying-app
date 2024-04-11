import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BOOK_DETAILS_URL } from "../API";
import styles from "./BookDetails.module.css"; // Import CSS module

const BookDetails = () => {
  const [books, setBooks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BOOK_DETAILS_URL}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredBooks = books.filter((book) => book.id === Number(id));

  return (
    <div className={styles["book-details-container"]}>
      {filteredBooks.map((book) => (
        <div key={book.id} className={styles["book-details-card"]}>
          <div className={styles["book-details-header"]}>
            <h2>{book.volumeInfo.title}</h2>
            {book.volumeInfo.authors && (
              <p>
                Author{book.volumeInfo.authors.length > 1 ? "s" : ""}:{" "}
                {book.volumeInfo.authors.join(", ")}
              </p>
            )}
          </div>
          <div className={styles["book-details-content"]}>
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
            <div className={styles["book-description"]}>
              <p>Description: {book.volumeInfo.description}</p>
              {book.volumeInfo?.averageRating && (
                <p>Rating: {book.volumeInfo.averageRating}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookDetails;
