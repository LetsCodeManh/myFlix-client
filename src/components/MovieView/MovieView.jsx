import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DirectorsList from "../DirectorList/DirectorList";
import FavoriteButtonIcon from "../FavoriteButtonIcon/FavoriteButtonIcon";
import GenreList from "../GenreList/GenreList";

const MovieView = () => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.list);
  let { movieId } = useParams();
  let movie = movies.find((movie) => movie._id === movieId);

  return (
    <Row xs={1} md={2} className="g-4 m-4">
      <Col className="w-100">
        <Card className="overflow-hidden">
          <Card.Img
            variant="top"
            src={movie.imagePath}
            className="movieImage"
          />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
          </Card.Body>
          <Card.Header>Genre</Card.Header>
          <GenreList genres={movie.genre} />
          <Card.Header>Director</Card.Header>
          <DirectorsList director={movie.director} />
          <Card.Header>Actors</Card.Header>
          <Card.Body>
            <Card.Text>{movie.actors.join(", ")}</Card.Text>

            <div className="d-flex gap-3">
              <Button
                type="submit"
                variant="primary"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <FavoriteButtonIcon movie={movie} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MovieView;
