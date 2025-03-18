import React, { useState, useEffect } from "react";
import './style.css'

function BookForm({ addBook, updateBook, editingBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
      setError("");
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !year) {
      setError("Pls fully type infomation.");
      return;
    }
    setError("");

    if (editingBook) {
      updateBook({ id: editingBook.id, title, author, year: parseInt(year) });
    } else {
      addBook({ title, author, year: parseInt(year) });
    }

    setTitle("");
    setAuthor("");
    setYear("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
      <button type="submit">{editingBook ? "Cập nhật" : "Thêm"}</button>
    </form>
  );
}

export default BookForm;
