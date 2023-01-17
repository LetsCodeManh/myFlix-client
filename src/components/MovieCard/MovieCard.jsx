import { PropTypes } from "prop-types";

const MovieCard = ({ book, onBookClick }) => {
  return <div onClick={() => onBookClick(book)}>{book.title}</div>;
};

MovieCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  onBookClick: PropTypes.func.isRequired,
};

export default MovieCard;
