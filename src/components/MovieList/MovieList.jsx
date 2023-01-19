import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import LoadingPage from "../LoadingPage/LoadingPage";
import MovieCard from "../MovieCard/MovieCard";
import MoviesFilter from "../MoviesFilter/MoviesFilter";

const MovieList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter)
  );

  const [isFetched, setIsFetched] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const getMovies = (token) => {
    axios
      .get("https://young-journey-11100.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setIsFetched(true);
        dispatch(setMovies(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token !== null && !isFetched) {
      console.log("Token", token)
      getMovies(token);
    }
  }, [token, isFetched]);

  return (
    <>
      <MoviesFilter />

      <Row xs={1} sm={2} md={3} lg={4} className="g-4 m-4">
        {filteredMovies.length === 0 ? (
          <LoadingPage />
        ) : (
          filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        )}
      </Row>
    </>
  );
};

export default MovieList;
