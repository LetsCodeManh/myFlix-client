import { PropTypes } from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.scss";

const MovieCard = ({ movie }) => {
  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={movie.imagePath}
          height={300}
          className="movieImage"
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="movieDescription">
            {movie.description}
          </Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button type="submit" variant="primary">
              Read More!
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    imagePath: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
