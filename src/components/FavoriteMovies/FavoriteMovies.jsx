import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import FavoriteButtonIcon from "../FavoriteButtonIcon/FavoriteButtonIcon";

const FavoriteMovies = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const favoriteMoviesList = movies.filter((movie) =>
    user.favoriteMovies.includes(movie._id)
  );

  return (
    <div>
      <h4 className="my-4">Favorite Movies</h4>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {favoriteMoviesList.map((movie) => (
          <Col key={movie._id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={movie.imagePath}
                height={200}
                className="movieImage"
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <FavoriteButtonIcon movie={movie} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FavoriteMovies;
