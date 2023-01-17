import { PropTypes } from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import "./index.scss";


const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Col>
      <Card className="h-100">
        <Card.Img variant="top" src={movie.imagePath} height={300} className="movieImage"/>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="movieDescription">{movie.description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)}>Read More!</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

MovieCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  onBookClick: PropTypes.func.isRequired,
};

export default MovieCard;
