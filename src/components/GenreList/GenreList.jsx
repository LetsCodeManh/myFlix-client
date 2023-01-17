import { Card } from "react-bootstrap";

const GenreList = ({ genres }) => {
  return (
    <>
      {genres.map((genre, index) => {
        return (
          <Card.Body key={index}>
            <Card.Title>{genre.name}</Card.Title>
            <Card.Text>{genre.description}</Card.Text>
          </Card.Body>
        );
      })}
    </>
  );
};

export default GenreList;
