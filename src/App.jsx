import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './components/BookList'
import BookForm from './components/BookForm'


function App() {
  const [books, setBooks] = useState(() => {
  const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
      { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
      { id: 3, title: "1984", author: "George Orwell", year: 1949 },
    ];
  });
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (newBook) => {
    if (!newBook.title || !newBook.author || !newBook.year) {
      setError("Vui lòng nhập đầy đủ thông tin sách.");
      return;
    }
    setError("");
    setBooks([...books, { id: Date.now(), ...newBook }]);
  };
  const updateBook = (updatedBook) => {
    if (!updatedBook.title || !updatedBook.author || !updatedBook.year) {
      setError("Vui lòng nhập đầy đủ thông tin sách.");
      return;
    }
    setError("");
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
    setEditingBook(null);
  };
  const editBook = (book) => {
    setEditingBook(book);
  };
  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className='main'>  
      <div className='booklist'>
        <h1>Book List</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <BookForm addBook={addBook} updateBook={updateBook} editingBook={editingBook}/>
        <BookList books={books} editBook={editBook} deleteBook={deleteBook}/>
      </div>
    </div>
  );
}

export default App
