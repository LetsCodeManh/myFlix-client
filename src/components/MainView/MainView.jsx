import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import LoginView from "../LoginView/LoginView";
import SignupView from "../SignupView/SignupView";
import ErrorPage from "../ErrorPage/ErrorPage";

import { Row } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import ProfileView from "../ProfileView/ProfileView";

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import axios from "axios";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();

  const getMovies = (token) => {
    axios
      .get("https://young-journey-11100.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(setMovies(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoggedIn = (authData) => {
    localStorage.setItem("token", authData.token);
    dispatch(setUser(authData.user));
  };

  useEffect(() => {
    if (token !== null) {
      getMovies(token)
    }
  }, [token]) 

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} />;
  }

  return (
    <>
      <Navigation
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
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

        <Route path="/profile" element={<ProfileView user={user} />} />

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
              </>
            )
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default MainView;
