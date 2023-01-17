import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import LoginView from "../LoginView/LoginView";
import SignupView from "../SignupView/SignupView";
import { Row } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://young-journey-11100.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });

    fetch("https://young-journey-11100.herokuapp.com/login", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie}/>
  }

  return (
    <Routes>
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <SignupView />}
      />

      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/" />
          ) : (
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          )
        }
      />

      <Route
        path="/movies/:movieId"
        element={!user ? <Navigate to="/login" replace /> : <MovieView />}
      />

      <Route
        path="/"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : (
            <>
              <Row xs={1} sm={2} md={3} lg={4} className="g-4 m-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                ))}
              </Row>
              <button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </button>
            </>
          )
        }
      />
    </Routes>
  );
};

export default MainView;
