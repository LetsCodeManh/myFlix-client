const BookCard = ({ book }) => {
  return <div key={book.id}>{book.title}</div>;
};

export default BookCard;
