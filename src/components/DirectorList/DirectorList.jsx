import { Card } from "react-bootstrap";

const DirectorsList = ({ director }) => {
  return (
    <Card.Body>
      <Card.Title>{director.name}</Card.Title>
      <Card.Text>{director.bio}</Card.Text>
    </Card.Body>
  );
};

export default DirectorsList;
