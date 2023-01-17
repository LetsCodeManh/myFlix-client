import { Card } from "react-bootstrap";

const GenreList = ({ genres }) => {
  return (
    <>
      {genres.map((genre, index) => {
        return (
          <Card.Body>
            <Card.Title key={index}>{genre.name}</Card.Title>
            <Card.Text key={index}>{genre.description}</Card.Text>
          </Card.Body>
        );
      })}
    </>
  );
};

export default GenreList;
