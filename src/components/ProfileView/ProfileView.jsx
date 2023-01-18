import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileView = () => {
  const [editing, setEditing] = useState(false);
  const user = useSelector((state) => state.user);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://young-journey-11100.herokuapp.com/user/${user.username}`,
        updatedUser
      );
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
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
            Email:
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>Username: {user.username}</p>
          <p>Password: {user.password}</p>
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
