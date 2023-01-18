import { Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/reducers/movies";

const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form className="m-4">
      <Form.Control
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
    </Form>
  );
};

export default MoviesFilter;
