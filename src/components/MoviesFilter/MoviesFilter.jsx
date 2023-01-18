import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { setFilter } from "../../redux/reducers/movies";

const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form.Control
      size="sm"
      type="text"
      placeholder="Search..."
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};

export default MoviesFilter;
