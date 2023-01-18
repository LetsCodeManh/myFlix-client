import { useEffect } from "react";
import axios from "axios";

import { Navigate, Route, Routes } from "react-router-dom";

import ErrorPage from "../ErrorPage/ErrorPage";
import Navigation from "../Navigation/Navigation";
import LoginView from "../LoginView/LoginView";
import SignupView from "../SignupView/SignupView";
import ProfileView from "../ProfileView/ProfileView";
import MovieList from "../MovieList/MovieList";
import MovieView from "../MovieView/MovieView";

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user";

const MainView = () => {
  const movies = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

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
      getMovies(token);
    }
  }, [token]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={!user ? <Navigate to="/login" replace /> : <MovieList />}
        />
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
                onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
              />
            )
          }
        />

        <Route path="/users/:username" element={<ProfileView />} />

        <Route
          path="/movies/:movieId"
          element={!user ? <Navigate to="/login" replace /> : <MovieView />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default MainView;
