import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { favoriteAdded, favoriteRemoved } from "../../redux/reducers/user";

const FavoriteButtonIcon = ({ movie }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(
    user.favoriteMovies.includes(movie._id)
  );

  const toogleFavorite = async () => {
    // Delete
    if (isFavorite === true) {
      try {
        setIsFavorite((prev) => !prev);
        dispatch(favoriteRemoved(movie._id));
        await axios.delete(
          `https://young-journey-11100.herokuapp.com/users/${user.username}/movies/${movie._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error(error, "Could not remove movie from favorites.");
      }
    }

    // Adding
    if (isFavorite === false) {
      try {
        setIsFavorite((prev) => !prev);
        dispatch(favoriteAdded(movie._id));
        await axios.put(
          `https://young-journey-11100.herokuapp.com/users/${user.username}/movies/${movie._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error(error, "Could not add movie from favorites.");
      }
    }
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faHeart}
        className={`${isFavorite ? "text-danger" : "text-secondary"} fa-2x`}
        onClick={() => toogleFavorite()}
      />
    </div>
  );
};

export default FavoriteButtonIcon;
