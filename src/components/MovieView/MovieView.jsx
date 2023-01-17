import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import DirectorsList from "../DirectorList/DirectorList";
import GenreList from "../GenreList/GenreList";
import "./index.scss";

const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie.id === movie.movieId);

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
            <Link to="/">
              <Button type="submit" variant="primary">
                Back
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MovieView;
