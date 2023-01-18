import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import MoviesFilter from "../MoviesFilter/MoviesFilter";

const MovieList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );

  return (
    <>
      <Row>
        <MoviesFilter />
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 m-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Row>
    </>
  );
};

export default MovieList;
