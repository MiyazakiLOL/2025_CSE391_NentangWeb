import React from "react";
import { redirect } from "react-router-dom";
import './style.css'

function BookList({ books, editBook , deleteBook}) {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <strong>{book.title}</strong> - {book.author} ({book.year})
          <button onClick={() => editBook(book)}>Sửa</button>
          <button style={{backgroundColor: "red"}} onClick={() => deleteBook(book.id)}>Xóa</button>  
        </li>
      ))}
    </ul>
  );
}

export default BookList;