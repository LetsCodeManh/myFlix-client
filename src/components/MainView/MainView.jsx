import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import BookView from "../BookView/BookView";
import LoginView from "../LoginView/LoginView";
import SignupView from "../SignupView/SignupView";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch("https://young-journey-11100.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {});
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://young-journey-11100.herokuapp.com/login", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedBook) {
    return (
      <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default MainView;
