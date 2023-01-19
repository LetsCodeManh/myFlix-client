import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileView = () => {
  const [editing, setEditing] = useState(false);
  const user = useSelector((state) => state.user);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://young-journey-11100.herokuapp.com/users/${user.username}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      setSuccess("User updated successfully.");
      setEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdatedUser({ ...user });
  };

  const handleChange = (event) => {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>Profile</h1>
      {editing ? (
        <>
          <label>
            Name:
            <input
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={updatedUser.password}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>Username: {user.username}</p>
          <p>Password: *****</p>
          <p>Email: {user.email}</p>
          <p>Birthday: {user.birthday}</p>
          <p>FavoriteMovies: {user.favoriteMovies}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default ProfileView;
